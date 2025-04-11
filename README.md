
![Logo](https://raw.githubusercontent.com/EastonA01/civiclens/refs/heads/main/READMERefs/civiclensLogoWithTitle.png)


# CivicLens

Overall this project's goal was to create a full-stack, data-driven web application that pulls, stores, and visualizes public data on local socioeconomic factors (e.g., income, education, housing, crime) to help social science researchers, policymakers, or nonprofits identify patterns and areas in need of attention.



## Roadmap

### 🧩 Core Components (Tech & Skills Applied):

#### ❓ Backend (SQL + DB Management):

- Set up a **PostgreSQL** or **MySQL** relational database.
    
- Design a normalized schema to store datasets on various social indicators (e.g., census data, public health records, local crime reports).
    
- Write stored procedures or complex SQL queries to extract meaningful insights (e.g., income disparity by neighborhood, housing trends over time).
    

#### ✅ Frontend (Web Basics):

- Create a simple web interface.
    
- Display:
    
    - Filterable tables and search functionality.
        
    - Graphs/charts (via Chart.js or D3.js) showing trends over time or across regions.
        

#### ❓ Data Import & Cleaning:

- Pull open datasets from sources like:
    
    - U.S. Census Bureau
        
    - local data portals (e.g., NYC OpenData)
        
    - FBI crime stats or education APIs
        
#### ❓ Stretch Goals:

- Write scripts (Python or your language of choice) to clean and normalize incoming data for your database.

- Learn and implement a lightweight backend framework (Flask for Python, FastAPI, or Express.js for Node).
    
- Containerize with Docker for easy deployment.
    
- Add basic authentication for saving favorite views or exporting reports.
## Authors

- [@EastonA01](https://www.github.com/EastonA01)


## Acknowledgements

 - [React-Chartjs-2 Library](https://react-chartjs-2.js.org/)


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

![GitHub commit activity](https://img.shields.io/github/commit-activity/y/EastonA01/civiclens)

![GitHub contributors](https://img.shields.io/github/contributors/EastonA01/civiclens)




## Contributing

Contributions are always welcome!

More than likely you're going to need to `fork` the project and do a pull request once changes are made and will be put under manual review.

Please adhere to this project's `code of conduct`.


## Tech Stack

**Client:** React, Vite, JavaScript

**Server:** TBD


## Run Locally

Clone the project

```bash
  git clone https://https://github.com/EastonA01/civiclens.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

When ready to run a development server, use:

```bash
  npm run dev
```