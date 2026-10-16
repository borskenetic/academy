# CSE Skillsoft Courses Page Plan

## Source

Official CSE Skillsoft page: https://jef.jntuh.ac.in/skillsoft-cse/

Skillsoft stream directory: https://jef.jntuh.ac.in/skillsoftstreams/

## Purpose

Create a dedicated Computer Science Courses page for CSE students. The page should present professional elective groups, additional learning, featured course examples, semester filters, and direct access to the official JNTUH Education Foundation course portal.

The current Skillsoft landing page should add a CSE course card in its **Skillsoft Courses and Streams** section. The card should link directly to the official CSE page.

## Page Structure

1. Header and navigation
2. CSE hero section
3. Quick highlights
4. Subject categories
5. Featured CSE courses
6. Professional Elective 3 course details
7. Semester filter tabs
8. Final CTA
9. Footer

## Hero Section

### Title

> Skillsoft Courses for Computer Science Engineering

### Subtitle

> Explore Skillsoft-powered professional electives and additional learning courses mapped for CSE students across AI, data, software development, cyber security, cloud, mobile and emerging technologies.

### Actions

Primary CTA:

- Label: `View CSE Subjects`
- URL: https://jef.jntuh.ac.in/skillsoft-cse/

Secondary CTA:

- Label: `Explore All Skillsoft Streams`
- URL: https://jef.jntuh.ac.in/skillsoftstreams/

## Quick Highlights

Use four compact stat cards:

| Value | Label |
| --- | --- |
| `6` | Professional Elective Groups |
| `1` | Additional Learning Track |
| `Year 3 & Year 4` | Semester Mapping |
| `Rs. 885` | Listed Fee Incl. GST |

## Subject Categories

### Section Heading

> Subjects for CSE

Create one card for each category:

1. **Professional Elective - 1**
   - Courses mapped to PE1 subjects for CSE students.
2. **Professional Elective - 2**
   - Courses mapped to PE2 subjects for CSE students.
3. **Professional Elective - 3**
   - Year 3 Semester 2 courses including Full Stack Development, Scripting Languages, Mobile Development and Software Testing.
4. **Professional Elective - 4**
   - Advanced CSE electives such as Cyber Security and Cloud Computing.
5. **Professional Elective - 5**
   - Senior-year elective courses aligned to software, systems and industry skills.
6. **Professional Elective - 6**
   - Final elective group for advanced CSE specialization.
7. **Additional Learning**
   - Subjects based on current industry trends and real-world skills.

Each category card should provide a clear path to the official CSE course page or the relevant subject details when those URLs are available.

## Featured CSE Courses

Present the following examples in a searchable or scannable course grid:

- AI for Data Analytics & BI
- AI for Data Science
- AI for DevOps
- AI for Programmers
- AI for Software Engineers
- Cyber Security
- Data Analysis with R
- Generative AI and Prompt Engineering Essentials
- JavaScript Novice to Professional
- Learn Java
- Machine Learning
- Mastering Power BI
- Mobile Development with Android
- NLP & LLMs
- Python Novice to Python Apprentice
- Software Testing and Software Testing Automation

## Detailed Course Example

### Section Heading

> Professional Elective 3 Courses

Use a detailed list or table to show course title, duration, credits and course code.

| Course | Duration | Credits | Code |
| --- | --- | --- | --- |
| Full Stack Development | 51 hours 01 minutes | 3 Credits | `CS631PE` |
| Scripting Languages | 53 hours 23 minutes | 3 Credits | `CS633PE` |
| Mobile Development | 48 hours 59 minutes | 3 Credits | `CS634PE` |
| Android Development with Kotlin | 56 hours 47 minutes | 3 Credits | `CS634PE` |
| iOS Development with Swift | 53 hours 23 minutes | 3 Credits | `CS634PE` |
| Software Testing and Automation | 54 hours 17 minutes | 3 Credits | `CS635PE` |

## Semester Filters

Add accessible tabs or pill buttons with these labels:

- `All`
- `Year 3 Semester 1`
- `Year 3 Semester 2`
- `Year 4 Semester 1`
- `Year 4 Semester 2`
- `Any Semester`

The selected tab should visibly indicate its state. Course cards or rows should filter without a full-page reload when semester metadata is available.

## Final CTA

### Heading

> Choose Your CSE Skillsoft Subject

### Copy

> Review subject groups, compare mapped courses and apply through the JNTUH Education Foundation Skillsoft portal.

### Button

- Label: `Open CSE Courses`
- URL: https://jef.jntuh.ac.in/skillsoft-cse/

## Current Landing Page Integration

Add one card to the existing **Skillsoft Courses and Streams** section in `index.html`.

### Card Content

- Title: `Computer Science Engineering`
- Description: `View CSE professional electives, semester filters and additional learning subjects.`
- Link label: `View CSE Courses`
- URL: https://jef.jntuh.ac.in/skillsoft-cse/

The card should use the existing learning-area card styles and icon treatment. It should be added without removing the existing stream cards.

## Visual Direction

- Preserve the current JNTUH Skillsoft landing-page visual language.
- Use the existing teal, navy, white and gold palette for continuity.
- Make the CSE page feel more focused than the general partner page.
- Use a strong hero title, compact stats and clear course grouping.
- Keep cards easy to scan and avoid overly dense paragraphs.
- Use consistent labels for professional electives, additional learning, semester and credits.

## Accessibility

- Use one descriptive `h1` for the page title.
- Use heading levels in order for sections and course groups.
- Make all cards and CTA links keyboard accessible.
- Give filter tabs an accessible selected state using `aria-selected` where tabs are implemented.
- Ensure duration, credits and course codes remain readable at mobile widths.
- Do not use color alone to communicate the active semester filter.
- Use descriptive link text instead of generic `Learn more` labels.

## Responsive Behavior

### Desktop

- Use a two-column hero with the course message and supporting visual or summary panel.
- Display quick highlights in one row.
- Use a multi-column grid for subject categories and featured courses.
- Display PE3 details in a table or spacious list.

### Tablet

- Use two-column grids for category and course cards.
- Allow semester tabs to wrap onto multiple lines.
- Keep the primary CTA visible near the hero content.

### Mobile

- Stack the hero content and actions.
- Stack or horizontally scroll quick highlights without shrinking text excessively.
- Use one course card per row.
- Convert the PE3 table into readable stacked rows if the table becomes cramped.
- Allow filter tabs to wrap and preserve a clear active state.

## Acceptance Criteria

- A dedicated CSE courses page is documented and can be built from this plan.
- The hero contains the exact requested title, subtitle and two CTA destinations.
- All four quick-highlight values are displayed.
- All seven subject categories are represented.
- All sixteen featured course examples are included.
- The PE3 detail block includes duration, credits and course codes.
- All six semester filters are present.
- The final CTA uses the requested heading, copy and official CSE URL.
- `index.html` includes a new CSE course card without removing existing stream cards.
- The implementation remains responsive and keyboard accessible.

## Official Catalog Collection

The following catalog map was collected from the official Skillsoft stream directory and its linked subject pages on 2026-09-12. The directory lists these nine programs:

| Program | Program page | Available subject groups found |
| --- | --- | --- |
| Computer Science | https://jef.jntuh.ac.in/skillsoft-cse/ | PE1, PE2, PE3, PE4, PE5, PE6, Additional Learning |
| Computer Science (AI/ML) | https://jef.jntuh.ac.in/skillsoft-cseaiml/ | PE2, PE3, PE5, Additional Learning |
| Computer Science (Data Science) | https://jef.jntuh.ac.in/skillsoft-cseds/ | PE1, PE2, PE3, PE4, PE5, PE6, Additional Learning |
| Computer Science (CyberSecurity) | https://jef.jntuh.ac.in/skillsoft-csecs/ | PE1, PE2, PE3, PE4, PE6, Additional Learning |
| Information Technology | https://jef.jntuh.ac.in/skillsoft-it/ | PE1, PE2, PE3, PE4, PE5, PE6, Additional Learning |
| Electronics and Communciation | https://jef.jntuh.ac.in/skillsoft-ece/ | PE1, PE5, Additional Learning |
| Electronics and Electrical | https://jef.jntuh.ac.in/skillsoft-eee/ | Additional Learning |
| Mechanical Engineering | https://jef.jntuh.ac.in/skillsoft-mech/ | Additional Learning |
| Civil Engineering | https://jef.jntuh.ac.in/skillsoft-civil/ | Additional Learning |

Shared Additional Learning page: https://jef.jntuh.ac.in/skillsoft-additional/

Each subject-group page also exposes the official `More Details` and `Apply Now` URLs for its course records. The listed fee on the retrieved course pages is `Rs. 885 (incl GST)`.

## Collected Course Records

### Computer Science

| Group | Semester | Course | Duration | Credits | Code | Detail / apply |
| --- | --- | --- | --- | --- | --- | --- |
| PE1 | Year 3 Semester 1 | AI For Data Analytics and BI | 45h 46m | 3 | `CS513PE` | [Details](https://jef.jntuh.ac.in/skillsoft/ai-data-analytics-bi/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=71) |
| PE1 | Year 3 Semester 1 | Data Analytics | 54h 56m | 3 | `CS513PE` | [Details](https://jef.jntuh.ac.in/skillsoft/data-analytics/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=72) |
| PE2 | Year 3 Semester 1 | Natural Language Processing | 52h 58m | 3 | `CS525PE` | [Details](https://jef.jntuh.ac.in/skillsoft/natural-language-processing/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=73) |
| PE3 | Year 3 Semester 2 | Full Stack Development | 51h 01m | 3 | `CS631PE` | [Details](https://jef.jntuh.ac.in/skillsoft/full-stack-development/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=74) |
| PE3 | Year 3 Semester 2 | Scripting Languages | 53h 23m | 3 | `CS633PE` | [Details](https://jef.jntuh.ac.in/skillsoft/scripting-languages/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=75) |
| PE3 | Year 3 Semester 2 | Mobile Development | 48h 59m | 3 | `CS634PE` | [Details](https://jef.jntuh.ac.in/skillsoft/mobile-development/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=76) |
| PE3 | Year 3 Semester 2 | Android Development with Kotlin | 56h 47m | 3 | `CS634PE` | [Details](https://jef.jntuh.ac.in/skillsoft/android-development-kotlin/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=77) |
| PE3 | Year 3 Semester 2 | iOS Development with Swift | 53h 23m | 3 | `CS634PE` | [Details](https://jef.jntuh.ac.in/skillsoft/ios-development-swift/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=78) |
| PE3 | Year 3 Semester 2 | Software Testing and Automation | 54h 17m | 3 | `CS635PE` | [Details](https://jef.jntuh.ac.in/skillsoft/software-testing-automation/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=79) |
| PE4 | Year 4 Semester 1 | Cyber Security | 48h 15m | 3 | `CS742PE` | [Details](https://jef.jntuh.ac.in/skillsoft/cyber-security/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=80) |
| PE4 | Year 4 Semester 1 | Cloud Computing | 45h 18m | 3 | `CS744PE` | [Details](https://jef.jntuh.ac.in/skillsoft/cloud-computing/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=81) |
| PE5 | Year 4 Semester 1 | Software Process & Project Management | 49h 09m | 3 | `CS755PE` | [Details](https://jef.jntuh.ac.in/skillsoft/software-process-project-management/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=82) |
| PE5 | Year 4 Semester 1 | Blockchain Technology | 46h 00m | 3 | `CS754PE` | [Details](https://jef.jntuh.ac.in/skillsoft/blockchain-technology/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=83) |
| PE5 | Year 4 Semester 1 | Agile Methodology | 45h 33m | 3 | `CS752PE` | [Details](https://jef.jntuh.ac.in/skillsoft/agile-methodology/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=84) |
| PE6 | Year 4 Semester 2 | Deep Learning | 45h 16m | 3 | `CS863PE` | [Details](https://jef.jntuh.ac.in/skillsoft/deep-learning/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=85) |
| PE6 | Year 4 Semester 2 | Cyber Defense Forensics | 45h 16m | 3 | `CS865PE` | [Details](https://jef.jntuh.ac.in/skillsoft/cyber-defense-forensics/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=86) |

### Other Programs

The same collection produced these program-specific records. All rows are 3-credit courses with a listed fee of `Rs. 885 (incl GST)`.

| Program / group | Semester | Course records |
| --- | --- | --- |
| CSE (AI/ML) PE2 | Year 3 Semester 2 | Software Testing and Automation, 54h 17m, `AM621PE`, apply ID 87 |
| CSE (AI/ML) PE3 | Year 4 Semester 1 | Mobile Development, 48h 59m, `AM734PE`, ID 88; Cloud Computing, 45h 18m, `AM735PE`, ID 89; Scripting Languages, 53h 23m, `AM733PE`, ID 90; Android Development with Kotlin, 56h 47m, `AM734PE`, ID 91; iOS Development with Swift, 53h 23m, `AM734PE`, ID 92 |
| CSE (AI/ML) PE5 | Year 4 Semester 2 | Cloud Security, 48h 50m, `AM854PE`, ID 93 |
| CSE (Data Science) PE1 | Year 3 Semester 1 | Artificial Intelligence, 45h 14m, `DS512PE`, ID 94 |
| CSE (Data Science) PE2 | Year 3 Semester 1 | Software Process & Project Management, 49h 09m, `DS524PE`, ID 95; DevOps, 50h 35m, `DS524PE`, ID 96 |
| CSE (Data Science) PE3 | Year 3 Semester 2 | Mobile Development, 48h 59m, `DS634PE`, ID 97; Data Storytelling and Visualisation, 48h 40m, `DS632PE`, ID 98; Scripting Languages, 53h 23m, `DS633PE`, ID 99; Android Development with Kotlin, 56h 47m, `DS634PE`, ID 100; iOS Development with Swift, 53h 23m, `DS634PE`, ID 101; Software Testing and Automation, 54h 17m, `DS631PE`, ID 102 |
| CSE (Data Science) PE4 | Year 4 Semester 1 | Natural Language Processing, 52h 58m, `DS743PE`, ID 103 |
| CSE (Data Science) PE5 | Year 4 Semester 1 | Cloud Computing, 45h 18m, `DS752PE`, ID 104 |
| CSE (Data Science) PE6 | Year 4 Semester 2 | Blockchain Technology, 46h 00m, `DS864PE`, ID 105; Cloud Security (Web Security), 48h 50m, `DS862PE`, ID 106 |
| CSE (CyberSecurity) PE1 | Year 3 Semester 1 | Artificial Intelligence, 45h 14m, `CY512PE`, ID 107; Cloud Computing, 45h 18m, `CY515PE`, ID 108 |
| CSE (CyberSecurity) PE2 | Year 3 Semester 1 | Offensive Security (Ethical Hacking), 43h 45m, `CY521PE`, ID 109 |
| CSE (CyberSecurity) PE3 | Year 3 Semester 2 | DevOps, 50h 35m, `CY633PE`, ID 110; Blockchain Technology, 46h 00m, `CY634PE`, ID 111; Mobile Development, 48h 59m, `CY635PE`, ID 112; Android Development with Kotlin, 56h 47m, `CY635PE`, ID 113; iOS Development with Swift, 53h 23m, `CY635PE`, ID 114; Machine Learning, 46h 35m, `CY632PE`, ID 115 |
| CSE (CyberSecurity) PE4 | Year 4 Semester 1 | Deep Learning, 45h 16m, `CY745PE`, ID 116 |
| CSE (CyberSecurity) PE6 | Year 4 Semester 2 | Cloud Security, 48h 50m, `CY863PE`, ID 117 |
| IT PE1 | Year 3 Semester 1 | AI For Data Analytics and BI, 45h 46m, `IT513PE`, ID 118; Data Analytics, 54h 56m, `IT513PE`, ID 119 |
| IT PE2 | Year 3 Semester 1 | Operating Systems, 46h 16m, `IT523PE`, ID 120 |
| IT PE3 | Year 3 Semester 2 | Mobile Development, 48h 59m, `IT634PE`, ID 121; Scripting Languages, 53h 23m, `IT633PE`, ID 122; Android Development with Kotlin, 56h 47m, `IT634PE`, ID 123; iOS Development with Swift, 53h 23m, `IT634PE`, ID 124; Full Stack Development, 51h 01m, `IT631PE`, ID 125; Software Testing and Automation, 54h 17m, `IT635PE`, ID 126 |
| IT PE4 | Year 4 Semester 1 | Artificial Intelligence, 45h 14m, `IT743PE`, ID 127 |
| IT PE5 | Year 4 Semester 1 | Software Process & Project Management, 49h 09m, `IT755PE`, ID 128; Blockchain Technology, 46h 00m, `IT753PE`, ID 129; Deep Learning, 45h 16m, `IT754PE`, ID 130 |
| IT PE6 | Year 4 Semester 2 | Natural Language Processing, 52h 58m, `IT861PE`, ID 131; Cloud Security (Web Security), 48h 50m, `IT864PE`, ID 132; Cyber Defense Forensics, 45h 35m, `IT865PE`, ID 133 |
| ECE PE1 | Year 3 Semester 1 | Operating Systems, 46h 16m, `EC511PE`, ID 134; Computer Networking, 45h 53m, `EC512PE`, ID 135 |
| ECE PE5 | Year 4 Semester 2 | Artificial Intelligence, 45h 14m, `EC851PE`, ID 136; Machine Learning, 46h 35m, `EC853PE`, ID 137 |

EEE, Mechanical Engineering and Civil Engineering currently expose Additional Learning on their program pages rather than program-specific PE groups.

### Shared Additional Learning Records

The visible records returned by the shared Additional Learning page are:

| Course | Duration | Credit type | Detail / apply |
| --- | --- | --- | --- |
| Data Analysis with R | 50h 38m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/data-analysis-with-r/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=2) |
| Operating Systems | 46h 16m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/operating-system/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=4) |
| DevOps | 50h 35m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/devops/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=7) |
| Artificial Intelligence | 45h 14m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/artificial-intelligence/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=10) |
| Business Skills | 49h 24m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/business-skills/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=16) |
| Data Storytelling and Visualisation | 48h 40m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/data-storytelling-visualization/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=18) |
| Computer Networking | 45h 53m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/computer-networking/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=19) |
| AI for DevOps | 49h 01m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/ai-devops/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=22) |
| Learn Developer Tools | 54h 38m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/learning-developer-tools/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=1) |
| AI for Software Engineers | 48h 33m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/ai-software-engineers/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=24) |
| Data Structures & Algorithms in Javascript | 48h 21m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/dsa-in-js/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=27) |
| Data Structures & Algorithms in Python | 60h 10m | Optional Learning | [Details](https://jef.jntuh.ac.in/skillsoft/dsa-in-python/) / [Apply](https://jef.jntuh.ac.in/apply/?courseId=28) |

## Collection Notes

- Program pages expose the semester filters `ALL`, `YEAR 3 SEMESTER 1`, `YEAR 3 SEMESTER 2`, `YEAR 4 SEMESTER 1`, `YEAR 4 SEMESTER 2`, and `ANY SEMESTER`.
- Course pages consistently expose duration, credit type, fee, a `More Details` URL, and an `Apply Now` URL. Professional elective pages also expose a course code.
- The Additional Learning page includes a `Load More` control. The table above records the course cards returned in the visible page response; the page should be checked again before implementation if a complete post-load catalog is required.
- Some program pages omit one or more PE groups. The implementation should render only the groups linked by that program page rather than assuming every program has PE1 through PE6.
