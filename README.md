# Spaced Repetition Capstone

# Spaced repetition API!
Live API Link: 

<https://shrouded-springs-60057.herokuapp.com/>

GitHub Links: 

https://github.com/thinkful-ei-emu/spaced-repetition-MAC-client

https://github.com/thinkful-ei-emu/spaced-repetition-MAC-api


## Application Description 
Spaced Repetition is a responsive web application that allows users to learn a foreign language. The application utilizes an algorithm to implement  the spaced repetition learning technique, which allows for more effective learning of a new language. Our application currently allows users to learn Italian, but is structured for the potential to add additional languages in the future.


### Screenshots

<img src="src/media/images/login.png">

<img src="src/media/images/signUp.png">

<img src="src/media/images/dashboard.png">

<img src="src/media/images/learning.png">

### Tech Stack
- Frontend: JavaScript, React, CSS (flexbox), media queries, 
- Backend: Node.js, Express, Knex, PostgreSQL
- Development/Hosting: Heroku, Ziet, GitHub, Cypress, Mocha

#### Next Steps
- Add additional words to database
- Add options to add additional languages
- Add options to archive word once mastered
- Add features to listen to the pronunciation of words

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.
