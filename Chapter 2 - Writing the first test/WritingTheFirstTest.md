# Writing the first test

Note: All tests you want to write should be created under the integration folder.

For our 1st test we are going to a new file under this folder and going to name it `todomvc.spec.js`

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest1.png" height="600" width="1000" >


## Application Under Test (AUT)

Before we write tests lets visit the link and have a look at our application under test i.e TodoMVC App [link](http://todomvc-app-for-testing.surge.sh/)

If you look at the application you will notice that this is a simple app to add your TODOs

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest2.png" height="600" width="1000" >

Some other things that you can also do on this application apart from adding your TODOs :

1. Mark TODOs as done

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest3.png" height="600" width="1000" >

2. Use filters : All, Active, Completed

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest4.png" height="600" width="1000" >

3. You can also delete a TODO

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest5.png" height="600" width="1000" >

## Autocomplete Support in VS Code

```jsx
/// <reference types= "cypress" />
```

- This triple comment line above is to tell VS Code the package for which we need autocomplete support for.

- VS Code will then download whatever is need automatically for us.

## Mocha

**To write a test, we need a test runner, and we’ll be using a [test runner called Mocha](https://mochajs.org/)**

- Mocha comes built-in with Cypress, so we don’t need to install it. 

- Moreover, it’s the *only* test runner that comes with Cypress.

## it ( ) Function

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest6.png" height="600" width="1000" >

- The it( ) function is place within which you write the code of your tests.

- The it() function accepts two parameters:

    -  Name of the test as a string
    - A function within which you have your test script

        ```jsx
        it('should navigate to the TodoMVC App', () => {

        })
        ```

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest7.png" height="600" width="1000" >

**Note About Javascript Syntax**

- If you’re not familiar with the arrow thingy here `=>` it’s exactly the same as writing `function()`. 

- It’s a nice syntax for creating an anonymous function in JavaScript. 

- That test function will be passed to the `it` function, which will execute it as a test.


## Let's write our first simple test 

For this test we are just going use `cy.vist`  to visit the ToDoMVC app using a URL.

Here `cy` is:

- an object that using the visit method

- a built in object in cypress and it used to call all the cypress APIs.

- an object is the gateway to all cypress functionality

```jsx
/// <reference types= "cypress" />

it('should navigate to TodoMVC App', () => {
    cy.visit("http://todomvc-app-for-testing.surge.sh")
})
```

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest8.png" height="600" width="1000" >

Once you have written this test you can run it using the terminal command

```
npx cypress open
```

## Test runs and passes

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest9.png" height="600" width="1000" >

## Let's fail the test and see what it does

We are going to just change the url to something that is incorrect and see what it reports

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/WritingTheFirstTest10.png" height="600" width="1000" >

Notice it gives you a nice error log which is the best part of using cypress.

<aside>

💡 **TIP IF ARE HAVING TROUBLE RUNNING CYPRESS:**

If you are having issues opening Chrome browser using the terminal follow the below tip from following link: 

https://github.com/cypress-io/cypress/issues/1239

*Steps to follow:*
- opening up the cypress app
- Goto `File` -> `View App Data`
- Delete everything in here
- Close cypress and open it up again
- And it should recreate all the browser profiles + extension
</aside>

## Summary

- Mocha is used to run tests
- To create a test, use an it function
- cy.visit(url) is used to navigate to a page
- Cypress error messages are very clear
- Cypress reruns tests whenever a test file changes.

