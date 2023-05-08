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

