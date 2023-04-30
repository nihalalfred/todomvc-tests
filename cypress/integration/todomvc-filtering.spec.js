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