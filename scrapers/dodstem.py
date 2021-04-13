import csv
import json
import requests


def run_scrape():
    r = requests.get("https://www.dodstem.us/page-data/sq/d/3837326984.json")
    js = json.loads(r.text)
    with open("dodstem.csv", mode="w") as f:
        out = csv.DictWriter(f, fieldnames=["title", "website", "description", "type", "state", "grade", "audience"])
        out.writeheader()
        for elt in js["data"]["allOpportunitiesTsv"]["nodes"]:
            elt.pop("id")
            out.writerow(elt)


if __name__ == "__main__":
    run_scrape()
