import argparse
import csv
import json
import os
import us


def reformat_data(raw_data_dir: str, output_dir: str) -> None:
    cleaned_data = []
    for fi in os.listdir(raw_data_dir):
        row_gen = get_non_comment_rows(os.path.join(raw_data_dir, fi))
        for line in csv.DictReader(row_gen):
            locations = clean_locations(line.get("Location"))
            special_focus = get_special_focus(line)
            targets = [t.strip() for t in line.get("Target", "").split(",")]
            # TODO: add urls after updating google sheet
            row = {
                "name": line["Program"],
                "type": line["Type"],
                "organization": line.get("Organization"),
                "target": targets,
                "is_free": line.get("Cost", "").strip().lower() == "free",
                "location": locations,
                "underrep": special_focus,
                "objective": line.get("Objective"),
                "level": line.get("Level"),
                "cost": line.get("Cost")
            }
            cleaned_data.append({k: v if not type(v) == str else v.strip() for k, v in row.items()})
    with open(os.path.join(output_dir, "data.js"), mode="w") as f:
        f.write("const data = "+json.dumps(cleaned_data)+"\n\n\nexport {data};")


def get_special_focus(line: dict) -> list:
    foci = []
    for key in ["Underrepresented", "Community", "Gender"]:
        if key in line and len(line[key].strip()) > 0:
            foci.append(line[key])
    return foci


def clean_locations(location: str) -> list:
    if location is None:
        return []
    clean_locations = []
    for loc in location.strip().split(","):
        if len(loc) == 2:
            loc = us.states.lookup(loc).name
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
    with open(filename) as f:
        for line in f:
            if num_commment_rows > 0:
                num_commment_rows -= 1
                continue
            yield line


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--raw_data_dir", default="raw_data")
    parser.add_argument("--output_dir", default="../ai-education-programs/src/data")
    args = parser.parse_args()

    reformat_data(args.raw_data_dir, args.output_dir)
