import React from "react"
import { render, getByText } from "@testing-library/react"
import ProgramCard from "../program_card"

/**
 * @jest-environment jsdom
 */

jest.mock("../../images/After\ School\ Program.svg", () => {
  after_school_program: () => null
});

function check_program_card(program){
  test(program["name"], () => {
    const { container } = render(<ProgramCard program={program} simplify={false} />);
    expect(container).toMatchSnapshot("Closed, wide-screen view renders correctly");
    getByText(container, "Show Details").dispatchEvent(new MouseEvent("click", {bubbles: true}));
    expect(container).toMatchSnapshot("Open wide-screen view renders correctly");
    getByText(container, "Hide Details").dispatchEvent(new MouseEvent("click", {bubbles: true}));
    expect(container).toMatchSnapshot("Open -> close wide-screen view renders correctly");
  });
  test(program["name"]+"-mobile", () => {
    const { container } = render(<ProgramCard program={program} simplify={true} />);
    expect(container).toMatchSnapshot("Narrow-screen view renders correctly");
  });
}

// long after-school
check_program_card({"id": 382, "name": "ID Tech: Roblox Game Design: Coding and Monetization", "url": "https://www.idtech.com/courses/virtual-roblox-game-design-coding-and-monetization", "type": "After-School Program", "organization": "Private", "target": ["Elementary school students", "Middle school students"], "is_free": false, "location": ["Virtual"], "is_not_virtual": false, "is_not_national": true, "location_details": null, "is_underrep": false, "gender": [], "race_ethnicity": [], "is_community_program": false, "objective": "Roblox is one of the fastest-growing game creation platforms on the planet, with more than 100 million players per month and top developers making over $1 million a year. With Roblox\u2019s built-in editor you'll create your own 3D worlds. Publish, share, and immediately play with friends on any platform from console to mobile. Check out games that have been runaway hits and learn how to implement some of the same gameplay and monetization strategies in your own creations.", "short_objective": "Roblox is one of the fastest-growing game creation platforms on the planet, with more than 100 million players per month and top developers making over $1 million a year. With Roblox\u2019s built-in editor you'll create your own 3D worlds. Publish, share, and immediately play with friends on any platform from console to mobile. Check out games that have been runaway hits and learn how to implement some of the same gameplay and monetization strategies...", "level": "Ages 10-12", "cost": "$449", "pre_reqs": [], "duration": "1 Week"});
// long apprenticeship
check_program_card({"id": 594, "name": "NIST NRC Postdoctoral Research Apprenticeship Program", "url": "https://www.nist.gov/iaao/academic-affairs-office/nist-nrc-postdoctoral-research-associateships-program", "type": "Apprenticeship", "organization": "Government", "target": ["Professionals"], "is_free": true, "location": ["National"], "is_not_virtual": true, "is_not_national": false, "location_details": null, "is_underrep": false, "gender": [], "race_ethnicity": [], "is_community_program": false, "objective": "The NIST NRC Postdoctoral Program supports a nationwide competitive postdoctoral program administered in cooperation with the National Academies/National Research Council (NRC). The postdoctoral program brings research scientists and engineers of unusual promise and ability to perform advanced research related to the NIST mission, introduces the latest university research results and techniques to NIST scientific programs, strengthens mutual communication with university researchers, shares NIST unique research facilities with the U.S. scientific and engineering communities, and provides a valuable mechanism for the transfer of research results from NIST to the scientific and engineering communities.", "short_objective": "The NIST NRC Postdoctoral Program supports a nationwide competitive postdoctoral program administered in cooperation with the National Academies/National Research Council (NRC). The postdoctoral program brings research scientists and engineers of unusual promise and ability to perform advanced research related to the NIST mission, introduces the latest university research results and techniques to NIST scientific programs, strengthens mutual...", "level": "New Postdoctoral", "cost": "Free", "pre_reqs": ["U.S. Citizen", "Recieved a PhD within the past 5 years"], "duration": "2 Years"});
// long challenge
check_program_card({"id": 512, "name": "eCYBERMISSION", "url": "https://www.ecybermission.com/About", "type": "Challenge", "organization": "Private", "target": ["Middle school students", "High school students"], "is_free": true, "location": ["National"], "is_not_virtual": true, "is_not_national": false, "location_details": null, "is_underrep": false, "gender": [], "race_ethnicity": [], "is_community_program": false, "objective": "eCYBERMISSION is a web-based science, technology, engineering, and mathematics (STEM) competition for students in grades six through nine. Students are challenged to explore how STEM works in their world while working as a team to solve problems in their community. Teams compete virtually in state and regional competitions and in-person through the National Judging & Educational Event (NJ&EE) in June 2021. Student prizes are awarded at the state, regional, and national levels by grade level.", "short_objective": "eCYBERMISSION is a web-based science, technology, engineering, and mathematics (STEM) competition for students in grades six through nine. Students are challenged to explore how STEM works in their world while working as a team to solve problems in their community. Teams compete virtually in state and regional competitions and in-person through the National Judging & Educational Event (NJ&EE) in June 2021. Student prizes are awarded at...", "level": "Grades 6-9", "cost": "Free", "pre_reqs": ["Faculty Advisor"], "duration": null});
// long conference
check_program_card({"id": 304, "name": "Teensinai", "url": "https://www.teensinai.com/", "type": "Conference", "organization": "Private", "target": ["Middle school students", "High school students"], "is_free": false, "location": ["Virtual"], "is_not_virtual": false, "is_not_national": true, "location_details": null, "is_underrep": true, "gender": [], "race_ethnicity": [], "is_community_program": false, "objective": "The Teens In AI initiative, launched at the AI for Good Global Summit at the UN in May 2018, exists to inspire the next generation of ethical AI researchers, entrepreneurs and leaders who will shape the world of tomorrow. It aims to give young people early exposure to AI being developed and deployed for social good. Through a combination of teensinai\u2019s own hackathons, accelerators, and bootcamps together with expert mentoring, talks, company tours, workshops, and networking opportunities the program creates the platform for young people aged 12-18 to explore AI, machine learning, and data science.", "short_objective": "The Teens In AI initiative, launched at the AI for Good Global Summit at the UN in May 2018, exists to inspire the next generation of ethical AI researchers, entrepreneurs and leaders who will shape the world of tomorrow. It aims to give young people early exposure to AI being developed and deployed for social good. Through a combination of teensinai\u2019s own hackathons, accelerators, and bootcamps together with expert mentoring, talks, company...", "level": "12-18", "cost": "Cost Not Specified", "pre_reqs": [], "duration": null})
// long curriculum
check_program_card({"id": 418, "name": "Computer Science for All in SF", "url": "https://www.csinsf.org/clubs.html", "type": "Curriculum", "organization": "Non-Profit", "target": ["Educators"], "is_free": false, "location": ["California"], "is_not_virtual": true, "is_not_national": true, "location_details": null, "is_underrep": true, "gender": [], "race_ethnicity": [], "is_community_program": true, "objective": "The San Francisco Unified School District (SFUSD) has made a bold commitment, to: Expand computer science education to all students at all schools, beginning in pre-kindergarten and extending through 12th grade. Picture We aim to accomplish this by incorporating CS into the core curriculum for all students in the lower grades (Pre-K to 8). By beginning in the earliest grades and with all children, we will normalize a discipline that has been long dominated by a selective group of the population. In high school, all students will have expanded opportunities to select among a variety of CS courses that continue to build upon this foundation.", "short_objective": "The San Francisco Unified School District (SFUSD) has made a bold commitment, to: Expand computer science education to all students at all schools, beginning in pre-kindergarten and extending through 12th grade. Picture We aim to accomplish this by incorporating CS into the core curriculum for all students in the lower grades (Pre-K to 8). By beginning in the earliest grades and with all children, we will normalize a discipline that has...", "level": "K-12 educators", "cost": "Cost Not Specified", "pre_reqs": [], "duration": "Year Round"})
// long fellowship
check_program_card({"id": 578, "name": "Great Lakes Summer Fellows Program", "url": "https://ciglr.seas.umich.edu/opportunities/student-fellowships/", "type": "Fellowship", "organization": "Government", "target": ["Postsecondary students", "Professionals"], "is_free": true, "location": ["National"], "is_not_virtual": true, "is_not_national": false, "location_details": null, "is_underrep": false, "gender": [], "race_ethnicity": [], "is_community_program": false, "objective": "CIGLR administers an annual Great Lakes Summer Fellows Program, in partnership with the NOAA Great Lakes Environmental Research Laboratory (GLERL). This program helps place promising undergraduate (junior or senior as of Fall 2021*) and graduate students with both academic and federal research mentors. Through this program, students work on substantive research issues in the Great Lakes and undergo a career training program that equips them with the knowledge and skills to be the next generation of Great Lakes scientists. We seek to use these fellowships to increase diversity in STEM disciplines (science, technology, engineering and math) and strongly encourage applications from students who identify with groups that have been traditionally underrepresented in government and academic workforces.", "short_objective": "CIGLR administers an annual Great Lakes Summer Fellows Program, in partnership with the NOAA Great Lakes Environmental Research Laboratory (GLERL). This program helps place promising undergraduate (junior or senior as of Fall 2021*) and graduate students with both academic and federal research mentors. Through this program, students work on substantive research issues in the Great Lakes and undergo a career training program that equips...", "level": "Undergraduate Juniors and seniors, Graduate students", "cost": "Free", "pre_reqs": ["U.S. Citizen or on a U.S. Student visa"], "duration": "Summer"})
// short hackathon
check_program_card({"id": 457, "name": "Hack Arizona", "url": "https://hackaz.io/", "type": "Hackathon", "organization": "University", "target": ["High school students", "Postsecondary students"], "is_free": true, "location": ["Arizona"], "is_not_virtual": true, "is_not_national": true, "location_details": null, "is_underrep": false, "gender": [], "race_ethnicity": [], "is_community_program": false, "objective": "Hack Arizona is a student led organization fostering a world-class hacker culture in the Southwest and hosted at the University of Arizona. Teams of up to four people compete to win prizes; all while attending fun activities and lots of educational sessions.", "short_objective": "Hack Arizona is a student led organization fostering a world-class hacker culture in the Southwest and hosted at the University of Arizona. Teams of up to four people compete to win prizes; all while attending fun activities and lots of educational sessions.", "level": "students", "cost": "Free", "pre_reqs": [], "duration": "3 Days"})
// short internship
check_program_card({"id": 590, "name": "Naval Research Enterprise Internship Program", "url": "https://navalsteminterns.us/nreip/", "type": "Internship", "organization": "Government", "target": ["Postsecondary students"], "is_free": true, "location": ["National"], "is_not_virtual": true, "is_not_national": false, "location_details": null, "is_underrep": false, "gender": [], "race_ethnicity": [], "is_community_program": false, "objective": "The goals of NREIP are to encourage participating college students to pursue science and engineering careers, to further their education via mentoring by laboratory personnel and their participation in research, and to make them aware of DoN research and technology efforts, which can lead to employment within the DoN.", "short_objective": "The goals of NREIP are to encourage participating college students to pursue science and engineering careers, to further their education via mentoring by laboratory personnel and their participation in research, and to make them aware of DoN research and technology efforts, which can lead to employment within the DoN.", "level": "College Students", "cost": "Free", "pre_reqs": [], "duration": "10 Weeks"})
// short robotics
check_program_card({"id": 525, "name": "First Robotics Competitions", "url": "https://www.firstinspires.org/robotics/frc", "type": "Robotics", "organization": "Private", "target": ["High school students"], "is_free": true, "location": ["National"], "is_not_virtual": true, "is_not_national": false, "location_details": null, "is_underrep": false, "gender": [], "race_ethnicity": [], "is_community_program": false, "objective": "Under strict rules and limited time and resources, teams of high school students are challenged to build industrial-size robots to play a difficult field game in alliance with other teams, while also fundraising to meet their goals, designing a team \u201cbrand,\u201d and advancing respect and appreciation for STEM within the local community.", "short_objective": "Under strict rules and limited time and resources, teams of high school students are challenged to build industrial-size robots to play a difficult field game in alliance with other teams, while also fundraising to meet their goals, designing a team \u201cbrand,\u201d and advancing respect and appreciation for STEM within the local community.", "level": "High School Students", "cost": "Free", "pre_reqs": [], "duration": null})
// short scholarship
check_program_card({"id": 616, "name": "Machine Learning Scholarship Program for Microsoft Azure", "url": "https://www.udacity.com/scholarships/machine-learning-scholarship-microsoft-azure", "type": "Scholarship", "organization": "Private", "target": ["Anyone"], "is_free": true, "location": ["National"], "is_not_virtual": true, "is_not_national": false, "location_details": null, "is_underrep": false, "gender": [], "race_ethnicity": [], "is_community_program": false, "objective": "The Introduction to machine learning on Azure with a Low-code Experience is intended for learners who have programming knowledge in any language, preferably python, and are comfortable writing scripts. Having a knowledge of basic statistics will also help to understand and deploy the Machine Learning models in this course.", "short_objective": "The Introduction to machine learning on Azure with a Low-code Experience is intended for learners who have programming knowledge in any language, preferably python, and are comfortable writing scripts. Having a knowledge of basic statistics will also help to understand and deploy the Machine Learning models in this course.", "level": null, "cost": "Free", "pre_reqs": [], "duration": null})
// short summer camp
check_program_card({"id": 183, "name": "Tulsa Stem Coding Camp", "url": "https://tulsastem.org/summer-academy/", "type": "Summer Camp", "organization": "Non-Profit", "target": ["Elementary school students", "Middle school students", "High school students"], "is_free": true, "location": ["Virtual", "Oklahoma"], "is_not_virtual": false, "is_not_national": true, "location_details": null, "is_underrep": false, "gender": [], "race_ethnicity": [], "is_community_program": true, "objective": "Building broad, deep and innovative STEM pathways for all students to access high-impact careers.", "short_objective": "Building broad, deep and innovative STEM pathways for all students to access high-impact careers.", "level": "Grades 3-12", "cost": "Free", "pre_reqs": [], "duration": "5 Days"})