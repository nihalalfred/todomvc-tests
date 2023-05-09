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