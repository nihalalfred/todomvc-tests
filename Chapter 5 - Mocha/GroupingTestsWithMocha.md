# Grouping Tests With Mocha

In this chapter lets see how we can create more than one test and then organise them into groups using Mocha.

## Original Single Test

```jsx
/// <reference types= "cypress" />

it('should be able to add a new todo to the list',()=>{
    //visit url
    cy.visit('http://todomvc-app-for-testing.surge.sh')
    
    //create a new todo
    cy.get('.new-todo', {timeout:6000}).type("Clean Room{enter}")
    
    //asserts if the newly added todo exists and that is not marked as complete
    cy.get('label').should('have.text', 'Clean Room')
    cy.get('.toggle').should('not.be.checked')

    //clicking on the toggle to mark complete a todo task
    cy.get('.toggle').click()
    cy.get('label').should('have.css', 'text-decoration-line', 'line-through')

    // clearning all completed todo tasks
    cy.contains('Clear').click()

    //assert to check if there are no more pendind todos
    cy.get('.todo-list').should('not.have.descendants', 'li')
})
```

*As you see above this single test does 3 things:*

1. Adding a new todo;
2. Toggling a todo; and
3. Clearing completed todos.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/GroupingTestsWithMocha1.png" height="600" width="1000" >

## New Separated Individual tests

Now lets create 3 different tests as below

```jsx
it(`Should add a new todo to the list`, ()=>{

})

it(`Should mark a todo as completed`, ()=>{

})

it(`Should clear completed todos`, ()=>{

})
```

Now let’s move the relevant code from the 1st test into these newly created empty tests as follows. 

```jsx
it(`Should add a new todo to the list`, ()=>{
//visit url
cy.visit('http://todomvc-app-for-testing.surge.sh')
    
//create a new todo
cy.get('.new-todo', {timeout:6000}).type("Clean Room{enter}")

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

    // clearning all completed todo tasks
    cy.contains('Clear').click()

    //assertion to check if there are no more pendind todos
    cy.get('.todo-list').should('not.have.descendants', 'li')
})
```

Once done you can safely delete the original single test.

Lets Run the newly created tests.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/GroupingTestsWithMocha2.png" height="600" width="1000" >

## Grouping Your Tests using describe()

When you have 3 tests then it's very easy to understand each one, but after a while, you will want to group your tests in logical groups.

Tests in Mocha are usually grouped around ‘**describe**’ groups.

Let's group these three tests together. We'll create a `describe` group which is actually just a function call, as usual, and call it “todo actions”.

It's very similar to an `it` — it has a name and a function. What we need to do is put in the three it's, it tests inside the group `describe`.

*Once you have done, you have successfully grouped tests in one group and it will looks something like this…*

```jsx
/// <reference types= "cypress" />

describe('todo actions', ()=> {
    it(`Should add a new todo to the list`, ()=>{
        //visit url
        cy.visit('http://todomvc-app-for-testing.surge.sh')
            
        //create a new todo
        cy.get('.new-todo', {timeout:6000}).type("Clean Room{enter}")
        
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
        
            // clearning all completed todo tasks
            cy.contains('Clear').click()
        
            //assertion to check if there are no more pendind todos
            cy.get('.todo-list').should('not.have.descendants', 'li')
        })
})
```

*It is common and customary to group tests in groups, both for aesthetic reasons, and for reasons we’ll see in a few minutes.*

## Running only one test using it.only()

*A nice feature Mocha gives us is the ability to run only one test, and not all of them.*

We can do that by adding a `.only` to the `it`, which will make Mocha run only that test.

Let do that for the 1st test.

```jsx
/// <reference types= "cypress" />

describe('todo actions', ()=> {
    it.only(`Should add a new todo to the list`, ()=>{
        //visit url
        cy.visit('http://todomvc-app-for-testing.surge.sh')
            
        //create a new todo
        cy.get('.new-todo', {timeout:6000}).type("Clean Room{enter}")
        
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
        
            // clearning all completed todo tasks
            cy.contains('Clear').click()
        
            //assertion to check if there are no more pendind todos
            cy.get('.todo-list').should('not.have.descendants', 'li')
        })
})
```

Running the updated tests will now only run the 1st test as that is marked with `it.only`

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/GroupingTestsWithMocha3.png" height="600" width="1000" >

`it.only` says run only this test.

## Making tests independent using beforeEach()

If you try to run only the second test using `it.only` the test will fail!

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/GroupingTestsWithMocha4.png" height="600" width="1000" >

The second test doesn't have the prologue of visiting the site and adding the first todo. It assumes that the first test ran. This is a problem. The tests are not dependent.

Sometimes this is what you want, especially if the setup time for a test is long, but usually let's try and make the tests not depend on one another.

*The simplest way to make the second test independent of the first would be to copy the prologue.*

But this isn't a good approach. There’s code duplication, and that’s bad in this context.

*But there’s a solution to that — it’s called `beforeEach`.*

Anything we put inside a “beforeEach” will be executed *before each* test in the group.

`beforeEach` is a function of Mocha, and it accepts another function. This function will be executed before each of the tests. And as we’ve already learned, the “() => {...}” is an “anonymous” function.

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
        
    it.only(`Should mark a todo as completed`, ()=>{
        //clicking on the toggle to mark complete a todo task
        cy.get('.toggle').click()
        cy.get('label').should('have.css', 'text-decoration-line', 'line-through')
        
    })
        
    it(`Should clear completed todos`, ()=>{
        // clearning all completed todo tasks
        cy.contains('Clear').click()
        
        //assertion to check if there are no more pendind todos
        cy.get('.todo-list').should('not.have.descendants', 'li')
        
    })
})
```

Now running the test once again should make the test PASS!

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/GroupingTestsWithMocha5.png" height="600" width="1000" >

*And now you can choose to run all your tests independently.*

But wait we have an error here

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/GroupingTestsWithMocha6.png" height="600" width="1000" >

This is because test 3 is dependant on the actions of test 2. 

We can fix this by copying the actions from test 2 into test 3 and this should work.

```jsx
it(`Should clear completed todos`, ()=>{
    
         //clicking on the toggle to mark complete a todo task
         cy.get('.toggle').click()
         cy.get('label').should('have.css', 'text-decoration-line', 'line-through')

        // clearning all completed todo tasks
        cy.contains('Clear').click()
        
        //assertion to check if there are no more pendind todos
        cy.get('.todo-list').should('not.have.descendants', 'li')
        
    })
```

In this case, I think copying makes sense because checking that it should clear completed todos's actually means toggling at least one.

Note

- `beforeEach` code will run only for the tests running inside *that* `describe`group.
- If there are tests that are outside this `describe`group, they will not be affected by this `beforeEach`
- Describe groups are not only for aesthetic reasons, but they can actually group things logically so that we can add `beforeEach` and `afterEach`  before and after to the thing.

## Adding more tests - Filtering

Lets add some more tests for the functionality of filtering by creating a new file

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

The above tests basically checks if the filtering only displays the correct content for Active, Completed and All.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/GroupingTestsWithMocha7.png" height="600" width="1000" >

Note: 

Until now we have seen how we can run all the tests or specific ones using the it.only() in a single file. But in the next chapter we will be looking at how we can run all the tests from all the files.
