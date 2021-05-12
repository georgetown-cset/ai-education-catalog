import requests
from bs4 import BeautifulSoup 
import pandas as pd 
import re 
import numpy as np
from pandas import Series, DataFrame
import bs4
from urllib.request import urlopen as uReq


        
# =============================================================================
# Function Instruction 
# This scraping function works for most of the scraping work with in the artofproblesolving.com framework
# Ideally, if we enter the correct variables, it should return a dictionary with 
# information about competition title, url, grade, location, description and type.
# Variable Explaination:
# web_url: website's url as a string
# ul_lower: the lower range of the unorder list we want to select
# ul_upper: the upper range of the unorder list we want to select    
# append_type: the competition type we are looking for e.g. physic, math, etc.
# append_location: the location where the competition is hold e.g. national, georgia, etc.
# title, url, location, grade, description, competition_type: the initialized list use for the returning dictionary
# =============================================================================

def scrape_competition(web_url, ul_lower, ul_upper, append_type, append_location, title = [], url = [], location = [], grade = [], description = [], competition_type = []):
    page = uReq(web_url, timeout = 50)
    web = page.read()
    soup = BeautifulSoup(web,'html.parser')
    containers = soup.find('div', {'class':'mw-parser-output'})
    ultags = containers.findAll('ul')
    grade_available = containers.findAll('h3')
    for i in range(ul_lower,ul_upper):
        ultag = ultags[i]
        if i-ul_lower > len(grade_available)-1:
            current_grade = grade_available[i-ul_lower-1]
        else:    
            current_grade = grade_available[i-ul_lower]
        current_span = current_grade.find('span')
        append_grade = None 
        if current_span is not None:
            id_str = current_span.get('id')
            if 'Elementary' in id_str or 'elementary' in id_str:
                append_grade = 'elementary'
            elif 'Middle' in id_str or 'middle' in id_str:
                append_grade = 'middle school'
            elif 'High' in id_str or 'high' in id_str:
                append_grade = 'high school'
            elif 'Colleg' in id_str or 'colleg' in id_str:
                append_grade = 'college'
            elif 'Olympiad' in id_str or 'olympiad' in id_str:
                append_grade = 'olympiad'
        for li in ultag.findAll('li'):
            links = li.findAll('a')
            link = links[len(links)-1]
            info_link = links[0]
            append_link = link.get('href')
            if append_link[0] == '/':
                append_link = 'https://artofproblemsolving.com' + append_link
            url.append(append_link)
            title.append(info_link.text)
            location.append(append_location)
            description.append(li.text.replace(' Website', ''))
            grade.append(append_grade)
            competition_type.append(append_type)
            
    return_dict = {'Competition Title': title, 'Url': url, 'Location':location, 'Grade':grade, 'Description':description, 'Type': competition_type}
    return return_dict

    


### Some Simple Testing code
web_url = 'https://artofproblemsolving.com/wiki/index.php/Science_summer_programs'  
dict_1 = scrape_competition(web_url, 2, 5, 'Science', 'National')
print(dict_1['Url'])
print(dict_1['Grade'])