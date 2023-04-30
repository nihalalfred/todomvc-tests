# Cypress CLI

In this chapter we will learn how we can use the terminal instead of using the interactively. 

Earlier we used the command  `npx cypress open` in the terminal which used to open Cypress in the interactive mode

```bash
npx cypress open
```

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI3.png" height="600" width="1000" >

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI1.png" height="600" width="1000" >

And here you choose the test you want to run which then runs that specific test in the Chrome Browser.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI2.png" height="600" width="1000" >

## Running testing using CLI

Instead we can now using the command `npx cypress run` using the CLI to run the tests in a headless mode without the GUI.

```bash
npx cypress run
```

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI4.png" height="600" width="1000" >

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI6.png" height="600" width="1000" >

The best part of running on the headless mode is you can still view the recordings of your tests that were run using the headless mode under the folder videos which will be updated after every run saving test recordings.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI8.png" height="600" width="1000" >

## Cypress run options

To view all the run options you can use the command

```bash
npx cypress run --help
```

which displays all the list of the available options you can use to run your tests.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI7.png" height="600" width="1000" >

## Running specific tests using run option —spec

Using the run option — spec your can run a specific test using the CLI

```bash
npx cypress run --spec cypress/integration/todomvc-filtering.spec.js
```

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI9.png" height="600" width="1000" >

## Adding Scrips in package.json

When you commit and push your changes of this package to the source control, any of your team member can pick up where you left off just by using `npm install`

Everything in a package is local, so `npm install` will install everything needed to run the test.

But, and this is the convention, they assume that if they run `npm test`, all the package’s tests will run. 

In order for this to run we would need to enable this and this can be done in the `package.json` file under the scripts section.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI10.png" height="600" width="1000" >

Once you do this you can run your scripts directly in the terminal by either using

```bash
npm run cypress
```

which will open cypress GUI

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI11.png" height="600" width="1000" >

or

```bash
npm run test
```

which will run all your tests

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/CypressCLI12.png" height="600" width="1000" >

*Note: There is an alternative to `npm run test` which is `npm test` which also does the same thing.*
