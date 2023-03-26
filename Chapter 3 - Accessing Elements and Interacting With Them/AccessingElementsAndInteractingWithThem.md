# Accessing Elements And Interacting With Them

## Turning off “watch” functionality

If you don’t want your tests to run every time you make any changes to your file, you can modify the default settings to false in the cypress.json file by the following:

```Javascript
{
    "watchForFileChanges": false
}
```
<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/AccessingElementsAndInteractingWithThem1.png" height="600" width="1000" >

```
Note: With this change now until you hit the rerun button your test will not run automatically with any file changes
```

## Adding further steps to the test

Below are the list of things we are going to do part of adding some more tests to our existing test.

- Update the test name to match the test steps
- Visit the todoMVC app
- Add a new Todo list - Clean Room
- Once the new to do list is added interact with it and mark it as done
- Then tap on the clear completed button

## Interactive Element Locator

If you want to find out a selector for an element you can use the interactive element locator to get by interacting with the little widget (see attached screenshot)

<img src= "https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/AccessingElementsAndInteractingWithThem2.png" height="600" width="1000" >

When we click on it, we get not only the selector, but also the command in Cypress that is used to “get” the element.

## Command Chaining

```jsx
cy.get('.new-todo').type('Clean room{enter}')
```

`.type` here is a command that is chained to `.get`

“curly braces enter” [`{enter}`] in the String that indicates that Cypress should type an “enter”, so that the todo will actually be added.

## Default Wait in Cypress

The reason Cypress is branded as a “non-flaky test tool” is because it will wait for the element to appear for a bit until it fails.

The default wait time is 4 seconds.

# Adding delays to elements

```jsx
cy.visit("http://todomvc-app-for-testing.surge.sh/?delay-new-todo=5000")
```

The `?delay-<element-selector=<delay-time>` can be used if you want a specific element to be delayed a bit before it can appear.

- if you put the delay directly to the element which is greater than the default wait the test will fail because
- Here in the below example we are waiting for 5 seconds for it to appear but the default wait is for 4 mins so it fails after that time.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/AccessingElementsAndInteractingWithThem3.png" height="600" width="1000" >

## Timeout as an option parameter

You can also add timeout as an option parameter

This can be done as

```jsx
cy.get('.new-todo', {timeout: 6000}).type('Clean room{enter}')
```

Here the timeout will be for 6 seconds.

So here though the delay is added to 5 seconds for the element to appear and the default wait is set to 4 seconds we are overwriting it to be now 6 seconds so the test passes.

## Completed Test code

```jsx
/// <reference types= "cypress" />

it('should be able to add a new todo to the list', () => {
    cy.visit("http://todomvc-app-for-testing.surge.sh/?delay-new-todo=5000")

    cy.get('.new-todo', {timeout:6000}).type("Clean Room{enter}")

    cy.get('.toggle').click()

    cy.contains('Clear').click()

})
```
