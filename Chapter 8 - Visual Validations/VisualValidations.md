# Chapter 8: Visual Validations

In the previous chapters we have seen how we can do functional validations in Cypress.

This validations was checking how it works.

## Can we use Cypress to do visual validations?

Yes we can!!! Cypress doesn’t give us this functionality out of the box, but you can easily add this using external plugins.

We will be using Applitools Eyes for this which can be easily installed and used. 

Using Applitools we can use this powerful functionality.

## How to use Applitools?

- First register at Applitools using this link: [https://applitools.com/users/register](https://applitools.com/users/register)

**TODO Insert Image1**

- Once you are registered it will take you to the Applitools Test Manager where you can see the results of the visual tests.

**TODO Insert Image2**

- Next we would need to install the Eyes SDK for Cypress. This can be done by the following command using the terminal. Eyes Cypress `[eyes-cypress]` is a Cypress plugin.

***Note: Here we are setting the version as 3, but you can feel free to use without the @3 which will default to the latest version.***

```bash
npm install @applitools/eyes-cypress@3
```

- Next you would also need to run the below script supplied by Eyes Cypress that will help Cypress recognise it and also help modifying various files in the cypress folder.

```bash
npx eyes-setup
```

**TODO Insert Image3**

- The above step needs to be done only one after installing `eyes-cypress`

## Adding Visual Validations

Visual validations is easy. In some ways. it’s easier than functional.

Eyes will take screenshots but will also compare them to the previous good screenshot. If they are the same, all is well, and the test passes.

So, let’s write a test that:

- Takes a screenshot of the empty todo list
- Takes a screenshot after adding two todos
- Takes a screenshot after marking one todo completed

**Let’s create a new file with the below test code under the folder integration.**

**TODO Insert Image4**

```jsx
/// <reference types= "cypress" />

import * as todoPage from '../page-objects/todo-page-export-function'

describe('visual validations', () => {

    before(() => todoPage.navigate())

    it('should look good', () => {

        todoPage.addTodo('Clean Room')
        todoPage.addTodo('Learn JavaScript')
       
        todoPage.clickOnToggleToMarkItAsComplete(0)
    })
})
```

- Here, we’ve imported the todoPage functions, but we put them in the “namespace” todoPage.
- This is not a class, so no need to `new` it.
- We are using the before() to navigate to the page.
- In the test it() we are adding 2 todos and then marking the 1st one as complete.
- Now let’s run the test.
- Remember we’re not doing any visual validations as of yet. We are just running the test.

## Adding Applitools API Key

- Because we’re using Applitools Eyes, we need to do one more thing: tell Applitools who we are, and in which account to show the results.
- To do that we need an API Key, which we get from the Applitools Test Manager.

**TODO Insert Image5**

- While we can add it into the code of the test, this is not the recommended way, as you do not want to commit “secrets” like the Applitools API Key to your code. These things are better relegated to environment variables.
- We can use the below command in the terminal and create an environment variable with the name `APPLITOOLS_API_KEY` and put our API key there.

```bash
export APPLITOOLS_API_KEY= {yourAPIKey}
```

- The `eyes-cypress` package automatically uses that environment variable without us needing to tell it to.

So the below command would not be needed ❌

```jsx
set APPLITOOLS_API_KEY= {yourAPIKey}
```

## Adding Visual Validations to our test

Now let’s add visual validations. Remember we need to check that:

- An empty todo list looks good
- Two todos added looks good
- Marking a list of to-do as completed looks good

We’ve installed `eyes-cypress`, so now we can just use it to take the required screenshots.

We can do that by adding the following command for example

```jsx
cy.eyesCheckWindow('empty todo list')
```

- This line calls into the Eyes Cypress plugin, using `eyesCheckWindow`, which will take a screenshot, name it “empty todo list” and compare it to a baseline screenshot that was generated the first time the test runs.
- Next we would also need to add two more commands.
    - One to open an Eyes test
    - and one to close the Eyes tests.
- We’ll add them in a `beforeEach` and a `afterEach` section

So after we have added these changes the final code will look like this:

```jsx
/// <reference types= "cypress" />

import * as todoPage from '../page-objects/todo-page-export-function'

describe('visual validations', () => {

    before(() => todoPage.navigate())

    beforeEach(() => cy.eyesOpen({appName: 'TAU TodoMVC', batchName: 'TAU TodoMVC Hey!'}))
    afterEach(() => cy.eyesClose())

    it('should look good', () => {

        cy.eyesCheckWindow('empty todo list')

        todoPage.addTodo('Clean Room')
        todoPage.addTodo('Learn JavaScript')

        cy.eyesCheckWindow('two todos')
        
        todoPage.clickOnToggleToMarkItAsComplete(0)

        cy.eyesCheckWindow('mark as complete')
    })
})
```

- Let’s run this test now which will open an Eyes test, closed it, and between them, took 3 screenshots and let Eyes compare them to the base screenshots.
- You can review your test in the Eyes Test Manager.

**TODO Insert Image6**

- Notice that the status of the screenshots are “New”, which means that this is the first time that the test is run, and so Eyes automatically accepts those screenshots as OK.
- If you run the tests again it should pass.

**TODO Insert Image7**

- Eyes compared this test’s screenshots to the baseline screenshots generated in the first test and found no difference.

## Generating a bug

Unfortunately, we don’t have access to the TodoMVC’s apps code, so we can’t change anything, but we can add something to the app that will simulate a bug.

- This is the regular app — http://todomvc-app-for-testing.surge.sh/
- Let’s add something to the URL — http://todomvc-app-for-testing.surge.sh/?different-title-color
- Just replace the before() with the following code.

```jsx
before(() =>  cy.visit('[http://todomvc-app-for-testing.surge.sh/?different-title-color](http://todomvc-app-for-testing.surge.sh/?different-title-color)'))
```

- Let’s run the test. Notice that the title is green.
- There we go. We have an error.

**TODO Insert Image8**

- If you go to Eyes Test Manager you will see that Applitools Eyes just highlighted the difference and we can see the difference between both the baseline and the check point.

**TODO Insert Image9**

- See that “Unresolved” status? This is Applitools Eyes telling us that it found a diff.
- Applitools Eyes has very complex algorithms for figuring out whether the diff is a real diff and not just some noise due to differing environments where the browser is running. But those algorithms can’t tell whether the change is a bug, or whether that change is actually a feature. Is the change of title color a bug in the CSS, or is it a welcome change?
- Eyes doesn’t know, and it defers the resolution to the user.
- While we can mark it as a bug in all 3, we can actually have Applitools group them all the changes into one and mark all of them as failed. Let’s mark the change as a bug by clicking the *thumbs down* icon.

**TODO Insert Image10**

- If we had done this, then these screenshots would have become the new baselines, so that the next tests run will compare against the new, corrected screenshots.

## Adding more browsers and more resolutions to our result

This can be done by specifying an array of browsers and resolutions, which will enable Eyes to generate the screenshots on various browsers and resolutions. 

Add the following code to the beforeEach() section of your code

```jsx
browser: [
        {name: 'chrome', width: 1024, height: 768},
        {name: 'chrome', width: 800, height: 600},
        {name: 'firefox', width: 1024, height: 768},
        {deviceName: 'iPhone X'},
      ]
```

**TODO Insert Image11**

- The **[Applitools Visual Grid](https://applitools.com/visualgrid)** will generate those screenshots with a grid of thousands of browsers at its disposal.
- Once you run the tests you can see in the Test results not 3 screenshots, but 12: 3 for each browser we specified.

**TODO Insert Image12**