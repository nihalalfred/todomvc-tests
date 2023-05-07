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