import argparse
import json
import os
import us

from openpyxl import load_workbook


def reformat_data(input_fi: str, output_dir: str) -> None:
    cleaned_data = []
    counter = 0
    for line in get_rows(input_fi):
        locations = clean_locations(line.get("Location"))
        special_focus = get_special_focus(line)
        targets = get_targets(line.get("Target"))
        pre_reqs = [pr.strip() for pr in line.get("Pre-recs", "").split(",") if len(pr.strip()) > 0]
        short_obj = get_short_objective(line.get("Objective"))
        level = get_level(line.get("Level"))
        row = {
            "id": counter,
            "name": line["Program"],
            "url": line["URL"],
            # TODO: temporary hack to fix spelling issues
            "type": "Curriculum" if line["Type"].startswith("Curri") else line["Type"],
            "organization": line.get("Organization Type"),
            "target": targets,
            "is_free": line.get("Cost", "").strip().lower() == "free",
            "location": locations,
            "underrep": special_focus,
            "objective": line.get("Objective"),
            "short_objective": short_obj,
            "level": level,
            "cost": line.get("Cost"),
            "pre_reqs": pre_reqs
        }
        clean_row = {}
        for k, v in row.items():
            if type(v) == str:
                v = v.strip()
                if k not in {"name", "objective", "short_objective", "level", "url"}:
                    v = v.title()
            elif type(v) == list:
                v = [elt.strip() for elt in v if len(elt.strip()) > 0]
            if v == "":
                v = None
            clean_row[k] = v
        cleaned_data.append(clean_row)
        counter += 1
    cleaned_data.sort(key=lambda r: r["name"])
    with open(os.path.join(output_dir, "data.js"), mode="w") as f:
        f.write("const data = "+json.dumps(cleaned_data)+"\n\n\nexport {data};")


def get_level(level: str) -> str:
    if not level:
        return None
    return level.lower().strip()


def get_short_objective(objective: str) -> str:
    if objective is None:
        return objective
    soft_char_limit = 140
    words = objective.split()
    short_objective = ""
    for idx, word in enumerate(words):
        if len(short_objective) >= soft_char_limit:
            break
        short_objective += word + " "
    return short_objective


def get_targets(raw_targets: str) -> list:
    targets = [t.strip().title() for t in raw_targets.replace(".", ",").split(",")]
    clean_targets = []
    for t in targets:
        if t in {"Elementary", "Middle", "High"}:
            clean_targets.append(t+" school students")
        elif t == "Postsecondary":
            clean_targets.append(t+" students")
        else:
            clean_targets.append(t)
    return clean_targets


def get_special_focus(line: dict) -> list:
    foci = []
    for key in ["Underrepresented", "Community", "Gender"]:
        if key in line and line[key] and len(line[key].strip()) > 0:
            foci.extend([elt.strip().title() for elt in line[key].split(",")])
    return foci


def clean_locations(location: str) -> list:
    if location is None:
        return []
    clean_locations = []
    for loc in location.strip().split(","):
        if len(loc.strip()) == 2:
            loc_obj = us.states.lookup(loc.strip())
            if loc_obj is None:
                print("Could not convert location for "+loc)
            else:
                loc = loc_obj.name
        clean_locations.append(loc)
    return clean_locations


def get_rows(filename: str) -> iter:
    name_to_comment_rows = {
        "After School Programs": 4,
        "Conferences Challenges": 2,
        "Curriculum": 3,
        "Federal Initiatives": 2,
        "Scholarships": 2,
        "Summer Camps": 3
    }
    wb = load_workbook(filename)
    for sheet in wb:
        if sheet.title not in name_to_comment_rows:
            print("Skipping "+sheet.title)
            continue
        num_commment_rows = name_to_comment_rows[sheet.title]
        col_names = None
        for row in sheet.iter_rows(min_row=num_commment_rows+1):
            if col_names is None:
                col_names = [c.value.strip() for c in row if c.value is not None]
            else:
                clean_row = {key: "" if row[idx].value is None else str(row[idx].value)
                             for idx, key in enumerate(col_names)}
                if not clean_row["Program"]:
                    continue
                clean_row["URL"] = row[0].hyperlink.target
                yield clean_row


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--raw_data", default="raw_data/AI Education Catalog.xlsx")
    parser.add_argument("--output_dir", default="../ai-education-programs/src/data")
    args = parser.parse_args()

    reformat_data(args.raw_data, args.output_dir)
