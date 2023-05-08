# Chapter 7: Page Objects in Cypress

# Page Objects

- Page objects are staple of designing a test suite.
- They are the standard way of coping with large test suites.
- They enable use to write the tests using objects that are relevant to the application
- They limit the use of selectors and other page-specific code which makes the test code incomprehensible.
- Page objects also enable some level of flexibility when the structure of a page changes and we need to change our code to accommodate that.
- If the change is small, all we need to do is change the code in the page object class, and all the tests will now work.

For example from writing this:

```jsx
cy.get('.new-todo').type('Clean room{enter}')
```

We can just write instead:

```jsx
todoPage.addTodo('Clean room')
```

## Creating Page Object files

- Let’s create a new folder called `page-objects` and create a new file called `todo-page.js`
- We don’t want to create a new file under the folder `integrations` as it is not a test.
- In this example we are just creating one such class, but in a large project you will definitely have more than one.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/PageObjects1.png" height="600" width="1000" >

- First we write an empty class. Syntax is similar to Java and C#

```jsx
export class TodoPage {

}
```

> Export is to say that this class can be imported and used from outside this module. If we hadn’t added the export, no other module would have been able to import the class.
> 
- Next you create different functions within this class that either accepts parameters or which doesn’t.

For example:

```jsx
export class TodoPage {

    navigate() {
        cy.visit('http://todomvc-app-for-testing.surge.sh/')
    }

    addTodo(todoText) {
        cy.get('.new-todo').type(todoText + '{enter}')
    }
    
}
```

## Replacing code with the newly created pageObjects

- Now we have a usable class that we can use to make some of the code in the class be better.
- Let’s now open `todo-actions.js` and change the beforeEach code to use the newly created **pageObject**
- First, let’s create the page object itself so we can use it.

```jsx
/// <reference types= "cypress" />

import { TodoPage } from "../page-objects/todo-page"

describe('todo actions using page objects', ()=> {
    const todoPage = new TodoPage()
})
```

- We create JavaScript variable using **const** or **let**

> `let` is for when you want to change the value of the variable afterwards, but in this case, we don't want to change the value, so we enforce this using `const`. This is usually what you will use.
> 
- The rest is similar to Java: we create an object from the class using `new`.
- If you notice, Visual studio code added the import statement for our class automatically. If your IDE doesn’t support that, you can add it manually.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/PageObjects2.png" height="600" width="1000" >

- Let's replace `cy.visit` with `todoPage.navigate`

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/PageObjects3.png" height="600" width="1000" >

- Similarly lets replace the next line

```jsx
beforeEach(() => {
    todoPage.navigate()
    todoPage.addTodo('Clean room')
})
```

## Final Result (Solution 1 - import class)

**So from this….. `todomvc-actions.spec`**

```jsx
/// <reference types= "cypress" />

describe('todo actions', ()=> {
    beforeEach(()=>{
        //visit url
        cy.visit('http://todomvc-app-for-testing.surge.sh')
            
        //create a new todo
        cy.get('.new-todo', {timeout:6000}).type("Clean Room{enter}")

    })
    it(`Should add a new todo to the list`, ()=>{
        //asserts if the newly added todo exists and that is not marked as complete
        cy.get('label').should('have.text', 'Clean Room')
        cy.get('.toggle').should('not.be.checked')
        
    })
        
    it(`Should mark a todo as completed`, ()=>{
        //clicking on the toggle to mark complete a todo task
        cy.get('.toggle').click()
        cy.get('label').should('have.css', 'text-decoration-line', 'line-through')
        
    })

    it(`Should clear completed todos`, ()=>{
    
         //clicking on the toggle to mark complete a todo task
         cy.get('.toggle').click()
         cy.get('label').should('have.css', 'text-decoration-line', 'line-through')

        // clearning all completed todo tasks
        cy.contains('Clear').click()
        
        //assertion to check if there are no more pendind todos
        cy.get('.todo-list').should('not.have.descendants', 'li')
        
    })
})
```

**& this….. `todomvc-filtering.spec.js`**

```jsx
/// <reference types= "cypress" />

describe('Filtering', ()=>{
    beforeEach(()=>{
        cy.visit('http://todomvc-app-for-testing.surge.sh/')
        cy.get('.new-todo').type("Learn JavaScript{enter}")
        cy.get('.new-todo').type("Learn Cypress{enter}")
        cy.get('.new-todo').type("Learn Markup{enter}")
        cy.get(':nth-child(2) > .view > .toggle').click()
    })
    it('should filter "Active" correctly', () => {
        cy.contains('Active').click()
        cy.get('.todo-list li').should('have.length', 2)
      })
    
      it('should filter "Completed" correctly', () => {
        cy.contains('Completed').click()
        cy.get('.todo-list li').should('have.length', 1)
      })
    
      it('should filter "All" correctly', () => {
        cy.contains('All').click()
        cy.get('.todo-list li').should('have.length', 3)
      })
})
```

**we have made it to use the pageObject module which had lot of methods now to this… `todomvc-actions-pageobject.spec.js`**

```jsx
/// <reference types= "cypress" />

import { TodoPage } from "../page-objects/todo-page"

describe('todo actions using page objects', ()=> {
    const todoPage = new TodoPage()

    beforeEach(()=>{
        //visit url
        todoPage.navigate()            
        //create a new todo
        todoPage.addTodo("Clean Room")
        todoPage.addTodo("Sleep 8 Hours")
    })
    it(`Should add a new todo to the list`, ()=>{
        //asserts if the newly added todo exists and that is not marked as complete
        todoPage.validateTodoText(1, 'Clean Room')
        todoPage.validateTodoText(0, 'Sleep 8 Hours')
        todoPage.validateTodoToggleIsNotChecked(0)
        todoPage.validateTodoToggleIsNotChecked(1)
    })
        
    it(`Should mark a todo as completed`, ()=>{
        //clicking on the toggle to mark complete a todo task
        todoPage.clickOnToggleToMarkItAsComplete(0)
        todoPage.clickOnToggleToMarkItAsComplete(1)
        todoPage.validateTodoTextThatIsMarkedAsCompleteHasLineThrough(0)
        todoPage.validateTodoTextThatIsMarkedAsCompleteHasLineThrough(1)        
    })

    it(`Should clear completed todos`, ()=>{
    
         //clicking on the toggle to mark complete a todo task
         //cy.get('.toggle').click()
         todoPage.clickOnToggleToMarkItAsComplete(0)
         todoPage.clickOnToggleToMarkItAsComplete(1)
         todoPage.validateTodoTextThatIsMarkedAsCompleteHasLineThrough(0)
         todoPage.validateTodoTextThatIsMarkedAsCompleteHasLineThrough(1)

        // clearning all completed todo tasks
        todoPage.clickOnFilterType("Clear")
        //assertion to check if there are no more pending todos
        todoPage.validateTodoListHasNoDescendants()  
    })
})
```

**`todomvc-filtering-pageobject.spec.js`**

```jsx
/// <reference types= "cypress" />

import { TodoPage } from "../page-objects/todo-page"

describe('Filtering', ()=>{
    const todoPage = new TodoPage()
    beforeEach(()=>{
        todoPage.navigate()
        todoPage.addTodo("Learn JavaScript")
        todoPage.addTodo("Learn Cypress")
        todoPage.addTodo("Learn Markup")
        todoPage.clickOnToggleToMarkItAsComplete(2)
    })

    it('should filter "Active" correctly', () => {
        todoPage.clickOnFilterType("Active")
        todoPage.validateTodoListLength(2)
      })
    
      it('should filter "Completed" correctly', () => {
        todoPage.clickOnFilterType("Completed")
        todoPage.validateTodoListLength(1)
      })
    
      it('should filter "All" correctly', () => {
        todoPage.clickOnFilterType("All")
        todoPage.validateTodoListLength(3)
      })
})
```

**Using the reusable methods created in the page object file `todo-page.js`**

```jsx
export class TodoPage {
    navigate() {
        cy.visit('http://todomvc-app-for-testing.surge.sh/')
    }

    addTodo(todoText) {
        cy.get('.new-todo').type(todoText+"{enter}")
    }

    validateTodoText(todoIndex, expectedText){
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.text', expectedText)
    }

    validateTodoToggleIsNotChecked(todoIndex){
        //cy.get('.toggle').should('not.be.checked')
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) toggle`).should('not.be.checked')
    }

    clickOnToggleToMarkItAsComplete(todoIndex){
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) input`).click()
    }

    validateTodoTextThatIsMarkedAsCompleteHasLineThrough(todoIndex){
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.css', 'text-decoration-line', 'line-through')
    }

    clickOnFilterType(filterTypeText){
        cy.contains(filterTypeText).click()
    }

    validateTodoListHasNoDescendants(){
        cy.get('.todo-list').should('not.have.descendants', 'li')
    }
    
    validateTodoListLength(expectedNumberOfTodos){
        cy.get('.todo-list li').should('have.length', expectedNumberOfTodos)
    }

}
```

## Final Result (Solution 2 - Import functions)

- Instead of exporting one class, we can also export a set of functions
- By this solution we have created a “page module” instead of a “page object”, we’ve created a “page module”
- This can be done by getting rid of the class and then take each method and prefix it with a function and then for each of these functions we are adding a prefix of export so we can export them.

### How can we do that?

- First, we get rid of the class — we’ll delete the `export class…` line and its balanced curly braces at the end
- Then we take each function and turn it into a function — add a `function` prefix to each method
- Each of these functions need to be exported, so we `export` them.

So from this…

```jsx
export class TodoPage {
    navigate() {
        cy.visit('http://todomvc-app-for-testing.surge.sh/')
    }

    addTodo(todoText) {
        cy.get('.new-todo').type(todoText+"{enter}")
    }

    validateTodoText(todoIndex, expectedText){
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.text', expectedText)
    }

    validateTodoToggleIsNotChecked(todoIndex){
        //cy.get('.toggle').should('not.be.checked')
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) toggle`).should('not.be.checked')
    }

    clickOnToggleToMarkItAsComplete(todoIndex){
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) input`).click()
    }

    validateTodoTextThatIsMarkedAsCompleteHasLineThrough(todoIndex){
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.css', 'text-decoration-line', 'line-through')
    }

    clickOnFilterType(filterTypeText){
        cy.contains(filterTypeText).click()
    }

    validateTodoListHasNoDescendants(){
        cy.get('.todo-list').should('not.have.descendants', 'li')
    }
    
    validateTodoListLength(expectedNumberOfTodos){
        cy.get('.todo-list li').should('have.length', expectedNumberOfTodos)
    }

}
```

to this…

```jsx
export function navigate() {
        cy.visit('http://todomvc-app-for-testing.surge.sh/')
    }

    export function addTodo(todoText) {
        cy.get('.new-todo').type(todoText+"{enter}")
    }

    export function validateTodoText(todoIndex, expectedText){
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.text', expectedText)
    }

    export function validateTodoToggleIsNotChecked(todoIndex){
        //cy.get('.toggle').should('not.be.checked')
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) toggle`).should('not.be.checked')
    }

    export function clickOnToggleToMarkItAsComplete(todoIndex){
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) input`).click()
    }

    export function validateTodoTextThatIsMarkedAsCompleteHasLineThrough(todoIndex){
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.css', 'text-decoration-line', 'line-through')
    }

    export function clickOnFilterType(filterTypeText){
        cy.contains(filterTypeText).click()
    }

    export function validateTodoListHasNoDescendants(){
        cy.get('.todo-list').should('not.have.descendants', 'li')
    }
    
    export function validateTodoListLength(expectedNumberOfTodos){
        cy.get('.todo-list li').should('have.length', expectedNumberOfTodos)
    }
```

> **See how much more understandable everything is!**
> 

> **The code reads more like a specification of a test, and less like a lot of selector and Cypress gobbledygook.**
> 

### So your tests needs to be also updated to based on this new solution..

**from….**

```jsx
/// <reference types= "cypress" />

import { TodoPage } from "../page-objects/todo-page-export-class"

describe('todo actions using page objects', ()=> {
    const todoPage = new TodoPage()

    beforeEach(()=>{
        //visit url
        todoPage.navigate()            
        //create a new todo
        todoPage.addTodo("Clean Room")
        todoPage.addTodo("Sleep 8 Hours")
    })
}
```

**to….**

```jsx
/// <reference types= "cypress" />

import 
{
    navigate,
    addTodo,
    validateTodoText,
    validateTodoToggleIsNotChecked, 
    clickOnToggleToMarkItAsComplete, 
    validateTodoTextThatIsMarkedAsCompleteHasLineThrough,
    validateTodoListHasNoDescendants,
    clickOnFilterType
} 
    from "../page-objects/todo-page-export-function"

describe('todo actions using page objects with import functions', ()=> {

    beforeEach(()=>{
        //visit url
        navigate()            
        //create a new todo
        addTodo("Clean Room")
        addTodo("Sleep 8 Hours")
    })
}
```

- If you notice instead of importing the class now we are importing individual functions that we are referencing to in this test.
