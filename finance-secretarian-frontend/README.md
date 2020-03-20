# finance-secretarian-frontend
This project contains the frontend for the finance-secretarian-backend.

## deploying
Deploying a web-app can difficult and depends on which system you use, therefor I just explain how to do the basic-setup for this application, not for setting up the server.

steps to deploy frontend:
 1. install nodejs
 2. in the terminal open the finance-secretarian-backend folder
 3. run `npm i`
 4. If you just want to launch a test-server (not suggested for production-systems) run `npm start` if you want to build and deploy the webapp run `npm run build`.

## informations for devs
I think the project-structure is self-explaining. The 2 things to keep in mind is that with every request the auth-interceptors gets invoked and adds automatically the credentials and the translation-files (which should contain every static piece of text) are located in `assets/i18n`.