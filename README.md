# AI Education Catalog

This repository contains the code that generates the AI Education Catalog.

### Preprocessing

To prepare the data for the catalog, we need to take the contents of the [google sheet version of the catalog](https://docs.google.com/spreadsheets/d/1y-Ez9NY1nhSyewMOqbosGueSqieiFinj/edit#gid=2077629231),
clean and reformat them, and write them to a javascript object. To do this, change directory to `preprocessing`,
create a new virtualenv (`virtualenv venv`), activate it (`.venv/bin/activate`), and install dependencies
(`pip install -r requirements.txt`). Download a copy of the google sheet as xlsx and put it in the `raw_data` directory. Then you can run the reformatting script with `python3 reformat_data.py`. 


### Developing the app

Change directory to `ai-education-catalog`, then run `npm install` to install dependencies. 

Run `gatsby develop` to see the current version of the app. When you are done developing, 
run `gatsby clean` and then `gatsby build`. The output application will be written to the `public` directory.
You can copy the contents of this directory to the location the app is hosted from.


### Running tests

To run python tests, from the `preprocessing` directory run `python3 -m pytest tests`. To run jest test, from the `ai-education-catalog` directory run `npm test`.


### Contributing

We welcome your help improving the AI Education Catalog! Please see our [contributing guidelines](CONTRIBUTING.md).
