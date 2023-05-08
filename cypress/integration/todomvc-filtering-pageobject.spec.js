/// <reference types= "cypress" />

import { TodoPage } from "../page-objects/todo-page-export-class"

describe('todo Filtering using page objects', ()=>{
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