# finance-secretarian-backend
This project contains the backend for the finance-secretarian-frontend.

## deploying
To deploy this app with docker, ensure docker is installed. After cloning this repo and stepping into the backend-folder you need to run (maybe under sudo):
1. `docker build -t finance-secretarian-backend .`
2. `docker run -p 5500:5500 -d finance-secratarian-backend`

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