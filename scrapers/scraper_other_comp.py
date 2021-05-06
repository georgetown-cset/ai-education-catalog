import requests
from bs4 import BeautifulSoup 
import pandas as pd 
import re 
import numpy as np
from pandas import Series, DataFrame
import bs4
from urllib.request import urlopen as uReq


# initialize list to store the value 

title = list()
url = list()
location  = list()
grade = list()
description = list()
temp_grade = list()
competition_type = list()

### Grabbing Engineering Data From the Website 

web_url = 'https://artofproblemsolving.com/wiki/index.php/Engineering_competitions'
page = uReq(web_url, timeout = 5)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
grade_available = containers.findAll('h3')
print(len(ultags))
for i in range(7,11):
    ultag = ultags[i]
    current_grade = grade_available[i-3]
    current_span = current_grade.find('span')
    current_grade = None 
    if current_span is not None:
        id_str = current_span.get('id')
        if 'Elementary' in id_str:
            current_grade = 'elementary'
        elif 'Middle' in id_str:
            current_grade = 'middle school'
        elif 'High' in id_str:
            current_grade = 'high school'
        elif 'Colleg' in id_str:
            current_grade = 'college'
        elif 'Olympiad' in id_str:
            current_grade = 'olympiad'
    for li in ultag.findAll('li'):
        links = li.findAll('a')
        link = links[1]
        append_link = link.get('href')
        if append_link[0] == '/':
            append_link = 'https://artofproblemsolving.com' + append_link
        url.append(append_link)
        title.append(link.text)
        location.append('national')
        description.append(li.text.replace(' Website', ''))
        grade.append(current_grade)
        competition_type.append('engineering')
        
        


web_url = 'https://artofproblemsolving.com/wiki/index.php/Informatics_competitions'
page = uReq(web_url, timeout = 5)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
grade_available = containers.findAll('h3')
print(len(ultags))
for i in range(8,10):
    ultag = ultags[i]
    current_grade = grade_available[i-4]
    current_span = current_grade.find('span')
    current_grade = None 
    if current_span is not None:
        id_str = current_span.get('id')
        if 'Elementary' in id_str:
            current_grade = 'elementary'
        elif 'Middle' in id_str:
            current_grade = 'middle school'
        elif 'High' in id_str:
            current_grade = 'high school'
        elif 'Colleg' in id_str:
            current_grade = 'college'
        elif 'Olympiad' in id_str:
            current_grade = 'olympiad'
    for li in ultag.findAll('li'):
        links = li.findAll('a')
        link = links[1]
        append_link = link.get('href')
        if append_link[0] == '/':
            append_link = 'https://artofproblemsolving.com' + append_link
        url.append(append_link)
        title.append(link.text)
        location.append('national')
        grade.append(current_grade)
        description.append(li.text.replace(' Website', ''))
        competition_type.append('informatics')
  





web_url = 'https://artofproblemsolving.com/wiki/index.php/Technology_competitions'
page = uReq(web_url, timeout = 5)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
grade_available = containers.findAll('h3')
for i in range(7,11):
    ultag = ultags[i]
    current_grade = grade_available[i-3]
    current_span = current_grade.find('span')
    current_grade = None 
    if current_span is not None:
        id_str = current_span.get('id')
        if 'Elementary' in id_str:
            current_grade = 'elementary'
        elif 'Middle' in id_str:
            current_grade = 'middle school'
        elif 'High' in id_str:
            current_grade = 'high school'
        elif 'Colleg' in id_str:
            current_grade = 'college'
        elif 'Olympiad' in id_str:
            current_grade = 'olympiad'
    for li in ultag.findAll('li'):
        links = li.findAll('a')
        link = links[1]
        append_link = link.get('href')
        if append_link[0] == '/':
            append_link = 'https://artofproblemsolving.com' + append_link
        url.append(append_link)
        title.append(link.text)
        location.append('national')
        grade.append(current_grade)
        description.append(li.text.replace(' Website', ''))
        competition_type.append('techonology')
        


                
output_dict = {'Competition Title': title, 'Url': url, 'Location':location, 'Grade':grade, 'Description':description, 'Type': competition_type}
df = pd.DataFrame(output_dict)
df.to_csv('other_competitions.csv', index = False, header = True)
    



