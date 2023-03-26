# Validations

Cypress has an extensive list of validations, conditions, which go beyond checking whether something has a text or is checked, and can even check conditions on the DOM or on the CSS properties of an element.

Using these validations, we've created our first complete test, which includes a set of actions and a set of validations that validate those actions.

All validations use `should` and we pass arguments into it

• The first argument to the `should` is what to check. And in this case, it’s “have.text”

• The second argument is the value of what to test. We call this the condition, which in this case is the text to check

## Below is are a list of example tests using different validations:
- have.text
- not.be.checked
- be.checked
- have.css

```jsx
/// <reference types= "cypress" />

it('should be able to add a new todo to the list', () => {
    
    // Goes to Application Under Test (AUT) URL
    cy.visit('http://todomvc-app-for-testing.surge.sh')

    // Enters 1st Todo list
    cy.get('.new-todo', {timeout:6000}).type("Clean Room{enter}")

    // Validates the 1st entered todo list matches the text
    cy.get('label').should('have.text', 'Clean Room')

})

it('should be able to add a second todo to the list', () => {

    // Enters 2nd Todo list
    cy.get('.new-todo', {timeout:6000}).type("Cook Food{enter}")

    // Validates the 2nd entered todo list matches the text
    cy.get(':nth-child(1) > .view > label').should('have.text', 'Cook Food')

})

it('added todo lists should not be checked', ()=>{

    // Validates if the todo list toggles are not checked
    cy.get(':nth-child(1) > .view > .toggle').should('not.be.checked')
    cy.get(':nth-child(2) > .view > .toggle').should('not.be.checked')

})

it('all todo list that is cleared should be checked & have line through text decoration ', ()=> {

    // clicks on the 1st todo toggle
    cy.get(':nth-child(1) > .view > .toggle').click()

    // validates if the 1st todo toggle is changed to checked
    cy.get(':nth-child(1) > .view > .toggle').should('be.checked')

    // clicks on the 2nd todo toggle
    cy.get(':nth-child(2) > .view > .toggle').click()

    // validates if the 2nd todo toggle is changed to checked
    cy.get(':nth-child(2) > .view > .toggle').should('be.checked')

    // Validates if the checked todo lists have a line through text decoration ussing CSS
    cy.get('.completed > .view > label').should('have.css', 'text-decoration-line', 'line-through')

})

it('should be able to clear all completed todo lists', () => {

    // clears all completed tasks
    cy.contains('Clear').click()

    // validates if there are no existing todo lists using the DOM 
    //i.e that the class todo-list doesn't have any desecents
    cy.get('.todo-list').should('not.have.descendants', 'li')

})
```
TODO: Insert Image1