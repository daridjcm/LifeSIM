# LifeSIM

An interactive life simulation web game where users manage their daily routine and key decisions through an intuitive system. There is no avatar for the player, but actions and decisions are reflected in game statistics and results.

- **Work:** 💼 Earn money to cover your needs and achieve your goals.
- **Bank:** 🏦 Manage your finances, save, pay debts or apply for loans.
- **Home:** 🏠 Manage your personal well-being with options such as eating 🍽️, cooking 🍳, sleeping 🛌, bathing 🚿, playing 🎮 or cleaning 🧹.
- **Grocery:** 🛒 Buy food and other essentials, make payments 💳 and organize your resources in the fridge 🧊.
- **Hospital:** 🏥 Visit the doctor (pay), pick up medications, Download your medical records, get health insurance, and schedule an appointment with your preferred doctor. 
- **Phone:** 📱 Manage your contacts, chats, calendar and more activities. 

# Technologies used

1. **Front-End:** ReactJSX, TailwindCSS, Heroicons, HeroUI and Vite.
2. **Back-End:** Express, JSONWebToken, Dotenv, Sequelize, bcrypt, body-parser, CORS and Node Cron.
3. **General:** MariaDB, Recharts, JSPDF, JSPDF-AutoTable, Nodemon, Prettier, Concurrently.

# Getting Started

#### Clone Repository

- (HTTPS)

```bash
git clone https://github.com/Daridjcm/LifeSIM.git
```

- (SSH)

```bash
git clone git@github.com:Daridjcm/LifeSIM.git
```

#### Run Client

```bash
cd ./client && npm install && cd ../
cd ./server && npm install && cd ../
npm install && npm start # Click or type get URL (Vite and/or Server)
```

## Get files for the general project

```bash
# For Excel (only read and organized)
https://docs.google.com/spreadsheets/d/1E6aQg3iHK8itzw7qzZfeb-iKJb3FuVXD/edit?usp=drivesdk&ouid=106620760397870700889&rtpof=true&sd=true

# For CSV Data
cd ./client/src/utils && node summaryProject.js # Add files to folder CSV.
cd ./CSV && ls -al
```

[LifeSIM](https://github.com/Daridjcm/LifeSIM) © by [Daridjcm](https://github.com/Daridjcm/) is licensed under a [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1).
