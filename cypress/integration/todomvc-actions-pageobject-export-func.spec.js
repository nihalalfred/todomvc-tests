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
    it(`Should add a new todo to the list`, ()=>{
        //asserts if the newly added todo exists and that is not marked as complete
        validateTodoText(1, 'Clean Room')
        validateTodoText(0, 'Sleep 8 Hours')
        validateTodoToggleIsNotChecked(0)
        validateTodoToggleIsNotChecked(1)
    })
        
    it(`Should mark a todo as completed`, ()=>{
        //clicking on the toggle to mark complete a todo task
        clickOnToggleToMarkItAsComplete(0)
        clickOnToggleToMarkItAsComplete(1)
        validateTodoTextThatIsMarkedAsCompleteHasLineThrough(0)
        validateTodoTextThatIsMarkedAsCompleteHasLineThrough(1)        
    })

    it(`Should clear completed todos`, ()=>{
    
         //clicking on the toggle to mark complete a todo task
         //cy.get('.toggle').click()
         clickOnToggleToMarkItAsComplete(0)
         clickOnToggleToMarkItAsComplete(1)
         validateTodoTextThatIsMarkedAsCompleteHasLineThrough(0)
         validateTodoTextThatIsMarkedAsCompleteHasLineThrough(1)

        // clearning all completed todo tasks
        clickOnFilterType("Clear")
        //assertion to check if there are no more pending todos
        validateTodoListHasNoDescendants()  
    })
})

