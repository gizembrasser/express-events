# Goal

- Design and develop a RESTful API for an event management app using Express.js. 
- Back-end tasks include focusing on route handling, middleware for things like logging, authentication and error handling. 

# Functions in /services

- Users should be able to login.
- Users can create, view, update and delete users. 
- Users can create, view, update and delete events. 
- Users can create, view, update and delete categories.

# REST API endpoints in /routes

- /users: GET (fetch all users and their info, including query filter), POST (create new user).
- /users/:id: GET (fetch a single user), PUT (update user), DELETE (remove user).

- /events: GET (fetch all events, including query filter), POST (create new event).
- /events/:id: GET (fetch a single event), PUT (update event), DELETE (remove event).

- /categories: GET (fetch all categories, including query filter), POST (create new category).
- /categories/:id: GET (fetch a single category), PUT (update category), DELETE (remove category).

- /login: POST (log in a user using JWT and return a token).

# Status codes

- 200: successful request (GET, PUT, DELETE and /login POST).
- 201: created resource (POST).
- 404: not found (all /:id routes).
- 401: invalid credentials (for auth middleware and /login route).
- 500: general internal errors.

# Authentication middleware

- POST on /events and /categories (not /users otherwise you can't create an account).
- PUT, DELETE on /users/:id, /events/:id and /categories/:id.

# Logging middleware

- Logs the duration of all requests with Winston. 

# Error handler middleware

- Create a custom error 'NotFoundError' for status code 404 along with an error handler middleware for it.
- Create general error handler middleware for status code 500.
- Connect application to Sentry.io so unhandled errors are reported there.

# Test endpoints with Newman

- Start the server in the folder you want to test with < npm run dev >, then run < npm test >.
- Restart the server with < npm run dev > every time you execute a test. 

# Connect app to a database

# Install Prisma

# Initiate Prisma Client

# Create schemas of datamodel
- ID should be unique identifiers of each model type.
- Users: the username should also be unique.
- Each Event has one User who created it.
- Each Event can have multiple Categories, and each Category can have multiple Events (many-to-many).

# Create seed file to seed the database with existing data
- 

# Use Prisma for queries (CRUD) and querying relationships

# Migrate schema changes