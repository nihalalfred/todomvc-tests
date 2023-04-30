# Cypress CLI

In this chapter we will learn how we can use the terminal instead of using the interactively. 

Earlier we used the command  `npx cypress open` in the terminal which used to open Cypress in the interactive mode

```bash
npx cypress open
```

TODO Insert Image3

TODO Insert Image1

And here you choose the test you want to run which then runs that specific test in the Chrome Browser.

TODO Insert Image2

## Running testing using CLI

Instead we can now using the command `npx cypress run` using the CLI to run the tests in a headless mode without the GUI.

```bash
npx cypress run
```

TODO Insert Images3-6

The best part of running on the headless mode is you can still view the recordings of your tests that were run using the headless mode under the folder videos which will be updated after every run saving test recordings.

TODO Insert Images8

## Cypress run options

To view all the run options you can use the command

```bash
npx cypress run --help
```

which displays all the list of the available options you can use to run your tests.

TODO Insert Images7

## Running specific tests using run option —spec

Using the run option — spec your can run a specific test using the CLI

```bash
npx cypress run --spec cypress/integration/todomvc-filtering.spec.js
```

TODO Insert Image9

## Adding Scrips in package.json

When you commit and push your changes of this package to the source control, any of your team member can pick up where you left off just by using `npm install`

Everything in a package is local, so `npm install` will install everything needed to run the test.

But, and this is the convention, they assume that if they run `npm test`, all the package’s tests will run. 

In order for this to run we would need to enable this and this can be done in the `package.json` file under the scripts section.

TODO Insert Image10

Once you do this you can run your scripts directly in the terminal by either using

```bash
npm run cypress
```

which will open cypress GUI

TODO Insert Image11

or

```bash
npm run test
```

which will run all your tests

TODO Insert Image12

*Note: There is an alternative to `npm run test` which is `npm test` which also does the same thing.*