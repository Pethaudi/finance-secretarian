# finance-secretarian-backend
This project contains the backend for the finance-secretarian-frontend.

## deploying
Deploying a web-app can difficult and depends on which system you use, therefor I just explain how to do the basic-setup for this application, not for setting up the server.

steps to deploy backend:
 1. install nodejs
 2. in the terminal open the finance-secretarian-backend folder
 3. run `npm i`
 4. install the sqlite3 cli
 5. run `sqlite3 /opt/finance_secretarian.db` (this creates the database in /opt)
 6. in the sqlite3 cli you run `.read INIT_DB.sql` (this populates the database with tables and basic entries)
 7. run `npm run build` (transpiles the ts-files to js and saves them in /dist)
 8. run `npm run launch` (launches the server at port 5500)

## informations for devs
This is an nodejs backend with expressjs, sqlite3 and typescript.

The projectstructure is the following:
 * uow (contains classes for accessing database and other units of work)
 * entities (contains the interface files for the entities saved in the database)
 * middlewares (contains all middlewares for express)
 * routers (contains the routes for express)

## uow
Every class in here is a singleton to prevent multiple database-access.

## routers
Every router needs to contain `router.use(cors())` so we can access it in the frontend. Also if the route needs to be secured you must use authorization middleware.