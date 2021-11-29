# AI Education Catalog

This repository contains the code that generates the [AI Education Catalog](https://aieducatalog.cset.tech/).

### Preprocessing

To prepare the data for the catalog, we downloaded the contents of the 
[google sheet version of the catalog](https://docs.google.com/spreadsheets/d/1y-Ez9NY1nhSyewMOqbosGueSqieiFinj/edit#gid=2077629231),
as an xlsx, reformatted this into `preprocessing/raw_data/ai_education_catalog.csv` using 
`preprocessing/sheets_to_csv.py`, and then ran `preprocessing/reformat_data.py` to reformat the resulting
csv as a javascript object.

Going forward, we will be updating the csv so will only need to run `preprocessing/reformat_data.py`. 
To do this, change directory to `preprocessing`,
create a new virtualenv (`virtualenv venv`), activate it (`. venv/bin/activate`), and install dependencies
(`pip install -r requirements.txt`). Then, you can run the reformatting script with `python3 reformat_data.py`. 
If you want to check that program links are still valid, you can add the `--check_links` parameter to 
`reformat_data.py`, but note that this will greatly increase the time the script takes to run. Each flagged link
should be manually checked (the link checker sometimes false alarms) and corrected. 


### Developing the app

Change directory to `ai-education-catalog`, then run `npm install` to install dependencies. 

Run `gatsby develop` to see the current version of the app. When you are done developing, 
run `gatsby clean` and then `gatsby build`. The output application will be written to the `public` directory.
You can copy the contents of this directory to the location the app is hosted from.


### Running tests

To run python tests, from the `preprocessing` directory run `python3 -m pytest tests`. To run jest tests, 
from the `ai-education-catalog` directory run `npm test`.


### Contributing

We welcome your help improving the AI Education Catalog! Please see our [contributing guidelines](CONTRIBUTING.md).
