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

### Computer Summer Program 

web_url = 'https://artofproblemsolving.com/wiki/index.php/Computer_summer_programs'
page = uReq(web_url, timeout = 50)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
grade_available = containers.findAll('h3')
#print(len(ultags))
for i in range(2,5):
    ultag = ultags[i]
    current_grade = grade_available[i-2]
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
        info_link = links[0]
        append_link = link.get('href')
        if append_link[0] == '/':
            append_link = 'https://artofproblemsolving.com' + append_link
        url.append(append_link)
        title.append(info_link.text)
        location.append('national')
        description.append(li.text.replace(' Website', ''))
        grade.append(current_grade)
        competition_type.append('Computer')
        
### Engineering Summer Program

web_url = 'https://artofproblemsolving.com/wiki/index.php/Engineering_summer_programs'
page = uReq(web_url, timeout = 50)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
grade_available = containers.findAll('h3')
#print(len(ultags))
for i in range(2,5):
    ultag = ultags[i]
    current_grade = grade_available[i-2]
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
        info_link = links[0]
        append_link = link.get('href')
        if append_link[0] == '/':
            append_link = 'https://artofproblemsolving.com' + append_link
        url.append(append_link)
        title.append(info_link.text)
        location.append('national')
        description.append(li.text.replace(' Website', ''))
        grade.append(current_grade)
        competition_type.append('Engineering')
        
### Math Summer Program

web_url = 'https://artofproblemsolving.com/wiki/index.php/Mathematics_summer_program'
page = uReq(web_url, timeout = 50)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
grade_available = containers.findAll('h3')
#print(len(ultags))
for i in range(2,6):
    ultag = ultags[i]
    if i-2 > len(grade_available)-1:
        current_grade = grade_available[i-3]
        #print(current_grade)
    else:    
        current_grade = grade_available[i-2]
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
        location.append('national')
        description.append(li.text.replace(' Website', ''))
        grade.append(append_grade)
        competition_type.append('Math')
        
### Science Summer Program


web_url = 'https://artofproblemsolving.com/wiki/index.php/Science_summer_programs'
page = uReq(web_url, timeout = 50)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
grade_available = containers.findAll('h3')
#print(len(ultags))
for i in range(2,5):
    ultag = ultags[i]
    if i-2 > len(grade_available)-1:
        current_grade = grade_available[i-3]
        #print(current_grade)
    else:    
        current_grade = grade_available[i-2]
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
        location.append('national')
        description.append(li.text.replace(' Website', ''))
        grade.append(append_grade)
        competition_type.append('Science')



### Physics Summer Program


web_url = 'https://artofproblemsolving.com/wiki/index.php/Physics_summer_programs'
page = uReq(web_url, timeout = 50)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
grade_available = containers.findAll('h3')
#print(len(ultags))
for i in range(3,7):
    ultag = ultags[i]
    current_grade = grade_available[i-3]
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
        location.append('national')
        description.append(li.text.replace(' Website', ''))
        grade.append(append_grade)
        competition_type.append('Physics')


### Technology Summer Program


web_url = 'https://artofproblemsolving.com/wiki/index.php/Technology_summer_programs'
page = uReq(web_url, timeout = 50)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
grade_available = containers.findAll('h3')
#print(len(ultags))
for i in range(2,5):
    ultag = ultags[i]
    current_grade = grade_available[i-2]
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
        location.append('national')
        description.append(li.text.replace(' Website', ''))
        grade.append(append_grade)
        competition_type.append('Technology')



output_dict = {'Competition Title': title, 'Url': url, 'Location':location, 'Grade':grade, 'Description':description, 'Type': competition_type}
df = pd.DataFrame(output_dict)
df.to_csv('summer_program.csv', index = False, header = True)