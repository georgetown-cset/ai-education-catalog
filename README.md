# AI Education Catalog

This repository contains the code that generates the AI Education Catalog.

### Preprocessing

To prepare the data for the catalog, we need to take the contents of the [xlsx version of the catalog](https://docs.google.com/spreadsheets/d/1y-Ez9NY1nhSyewMOqbosGueSqieiFinj/edit#gid=2077629231),
clean and reformat them, and write them to a javascript object. To do this, change directory to `preprocessing`,
create a new virtualenv (`virtualenv venv`), activate it (`.venv/bin/activate`), and install dependencies
(`pip install -r requirements.txt`). Then you can run the reformatting script with `python3 reformat_data.py`. 


### Developing the app

Change directory to `ai-education-catalog`, then run `npm install` to install dependencies. 

Run `gatsby develop` to see the current version of the app. When you are done developing, 
run `gatsby clean` and then `gatsby build`. The output application will be written to the `public` directory.
You can copy the contents of this directory to the location the app is hosted from.
