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





# Grabbing national elementary competition Data
web_url = 'https://artofproblemsolving.com/wiki/index.php/List_of_United_States_elementary_school_mathematics_competitions'
page = uReq(web_url, timeout = 5)
web = page.read()
soup = BeautifulSoup(web,'html.parser')
containers = soup.find('div', {'class':'mw-parser-output'})
ultags = containers.findAll('ul')
ultag = ultags[0]
ultag_state = ultags[1]
for li in ultag.findAll('li'):
    link = li.find('a')
    append_link = link.get('href')
    if append_link[0] == '/':
        append_link = 'https://artofproblemsolving.com' + append_link
    url.append(append_link)
    title.append(link.text)
    grade.append('elementary')
    location.append('national')
    description.append(li.text)


# Grabbing national middle school competition Data
web_url_middle = 'https://artofproblemsolving.com/wiki/index.php/List_of_United_States_middle_school_mathematics_competitions'
page_middle = uReq(web_url_middle, timeout = 5)
web_middle = page_middle.read()
soup_middle = BeautifulSoup(web_middle,'html.parser')
containers_middle = soup_middle.find('div', {'class':'mw-parser-output'})
ultags_middle = containers_middle.findAll('ul')
ultag_middle = ultags_middle[2]
for li in ultag_middle.findAll('li'):
    link = li.find('a')
    append_link = link.get('href')
    if append_link[0] == '/':
        append_link = 'https://artofproblemsolving.com' + append_link
    url.append(append_link)
    title.append(link.text)
    grade.append('middle school')
    location.append('national')
    description.append(li.text)


# Grabbing national high school competition Data
web_url_high = 'https://artofproblemsolving.com/wiki/index.php/List_of_United_States_high_school_mathematics_competitions'
page_high = uReq(web_url_high, timeout = 5)
web_high = page_high.read()
soup_high = BeautifulSoup(web_high,'html.parser')
containers_high = soup_high.find('div', {'class':'mw-parser-output'})
ultags_high = containers_high.findAll('ul')
ultag_high = ultags_high[0]
for li in ultag_high.findAll('li'):
    link = li.find('a')
    append_link = link.get('href')
    if append_link[0] == '/':
        append_link = 'https://artofproblemsolving.com' + append_link
    url.append(append_link)
    title.append(link.text)
    grade.append('high school')
    location.append('national')
    description.append(li.text)
    
    
# Grabbing national college competition Data    
web_url_college = 'https://artofproblemsolving.com/wiki/index.php/List_of_United_States_college_mathematics_competitions'
page_college = uReq(web_url_college, timeout = 5)
web_college = page_college.read()
soup_college = BeautifulSoup(web_college,'html.parser')
containers_college = soup_college.find('div', {'class':'mw-parser-output'})
ultags_college = containers_college.findAll('ul')
ultag_college = ultags_college[0]
for li in ultag_college.findAll('li'):
    link = li.find('a')
    append_link = link.get('href')
    if append_link[0] == '/':
        append_link = 'https://artofproblemsolving.com' + append_link
    url.append(append_link)
    title.append(link.text)
    grade.append('elementary')
    location.append('national')
    description.append(li.text)



# go to each state-sublink grabbing all the state-wise competition data 
for li in ultag_state.findAll('li'):
    link = li.find('a')
    state_info = link.get('title')
    link_info = link.get('href')
    link_info = 'https://artofproblemsolving.com' + link_info
    state_info = state_info.replace(' mathematics competitions', '')
    temp_url = link_info
    temp_page = uReq(link_info, timeout = 500)
    sample_web = temp_page.read()
    sample_soup = BeautifulSoup(sample_web, 'html.parser')   
    containers_sample = sample_soup.find('div', {'class':'mw-parser-output'})
    ultags_sample = containers_sample.findAll('ul')
    ultags_length = len(ultags_sample)
    grade_sample = containers_sample.findAll('h2')
    # getting grade available as some state may lack competition for certain grade levels 
    for i in range(len(grade_sample)):
        current_h2 = grade_sample[i]
        span = current_h2.find('span')
        if span is not None:
            id_str = span.get('id')
            if 'elementary' in id_str:
                temp_grade.append('elementary')
            elif 'middle' in id_str:
                temp_grade.append('middle school')
            elif 'high' in id_str:
                temp_grade.append('high school')
            elif 'colleg' in id_str:
                temp_grade.append('college')
    for i in range(ultags_length):
        if i > 0 and i < ultags_length-2:
            current_ul = ultags_sample[i]
            for li in current_ul.findAll('li'):
                link = li.find('a')
                if link is not None:
                    append_link = link.get('href')
                    if append_link[0] == '/':
                        append_link = 'https://artofproblemsolving.com' + append_link
                    url.append(append_link)
                    title.append(link.text)
                    grade.append(temp_grade[i-1])
                    description.append(li.text)
                    location.append(state_info)
                
output_dict = {'Competition Title': title, 'Url': url, 'Location':location, 'Grade':grade, 'Description':description}
df = pd.DataFrame(output_dict)
df.to_csv('sample_output.csv', index = False, header = True)
    





