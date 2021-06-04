import argparse
import csv
import json
import os
import us


def reformat_data(raw_data_dir: str, output_dir: str) -> None:
    cleaned_data = []
    counter = 0
    for fi in os.listdir(raw_data_dir):
        row_gen = get_non_comment_rows(os.path.join(raw_data_dir, fi))
        for line in csv.DictReader(row_gen):
            locations = clean_locations(line.get("Location"))
            special_focus = get_special_focus(line)
            targets = get_targets(line.get("Target"))
            pre_reqs = [pr.strip() for pr in line.get("Pre-recs", "").split(",") if len(pr.strip()) > 0]
            short_obj = get_short_objective(line.get("Objective"))
            level = get_level(line.get("Level"))
            # TODO: add urls after updating google sheet
            row = {
                "id": counter,
                "name": line["Program"],
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
                    if k not in {"name", "objective", "short_objective", "level"}:
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
        if key in line and len(line[key].strip()) > 0:
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


def get_non_comment_rows(filename: str) -> iter:
    name_to_comment_rows = {
        "after_school_programs.csv": 4,
        "conferences_challenges.csv": 2,
        "curriculum.csv": 3,
        "federal_initiatives.csv": 2,
        "scholarships.csv": 2,
        "summer_camps.csv": 3
    }
    num_commment_rows = name_to_comment_rows[os.path.basename(filename)]
    num_seen_rows = 0
    with open(filename) as f:
        for line in f:
            num_seen_rows += 1
            if num_commment_rows >= num_seen_rows:
                continue
            if num_seen_rows == num_commment_rows + 1:
                # this is the csv header and we want to strip all whitespace around column names
                yield ",".join([e.strip() for e in line.strip().split(",")])+"\n"
            else:
                yield line


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--raw_data_dir", default="raw_data")
    parser.add_argument("--output_dir", default="../ai-education-programs/src/data")
    args = parser.parse_args()

    reformat_data(args.raw_data_dir, args.output_dir)
