# Finance-Secretarian
This app aims to support the finance-secretarian in their work in their branches. It provides a way to input sales and show monthly statistics.

This project is structured in 2 sub-projects:
 * a NodeJs backend with a sqlite-database
 * an angular9 frontend

(note: at the moment the authentication works with basic-auth so it is not that safe)

## deploying on your own (linux)
Deploying a web-app can difficult and depends on which system you use, therefor I just explain how to do the basic-setup for this application, not for setting up the server.

### backend
 1. in the terminal open the finance-secretarian-backend folder
 2. install the sqlite3 cli
 3. run `sqlite3 /opt/finance_secretarian.db` (this creates the database in /opt)
 4. in the sqlite3 cli you run `.read INIT_DB.sql` (this populates the database with tables and basic entries)
 5. run `npm run build` (transpiles the ts-files to js and saves them in /dist)
 6. run `npm run launch` (launches the server at port 5500)

### frontend
If you just want to launch a test-server (not suggested for production-systems) run `npm start` if you want to build and deploy the webapp run `npm run build`.

## helping developing
You can program your own version of this software, but I would be pleased if we would work together to make our international more efficient.
You can message me on facebook or via email (pethaudi@yahoo.de)

## helping if you dont know how to program
Not every comrade understands english, therefor we need to translate the app. The static content of the page is saved in translation-files in `finance-secretarian-frontend/src/assets/i18n/`.
You can help if you optimize or create own translation-files.
If you create an own translation-file:
 1. create an file with the following name: [the ISO-639-1 norm for the language].json (https://de.wikipedia.org/wiki/Liste_der_ISO-639-1-Codes)
 2. copy the content of en.json
 3. replace the value of the json key: "key": "value"
