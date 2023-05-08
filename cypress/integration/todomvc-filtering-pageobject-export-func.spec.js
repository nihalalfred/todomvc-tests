/// <reference types= "cypress" />

import 
{
    navigate,
    addTodo,
    clickOnToggleToMarkItAsComplete,
    clickOnFilterType,
    validateTodoListLength
}   
  from "../page-objects/todo-page-export-function"

describe('todo Filtering using page objects and import function', ()=>{

    beforeEach(()=>{
        navigate()
        addTodo("Learn JavaScript")
        addTodo("Learn Cypress")
        addTodo("Learn Markup")
        clickOnToggleToMarkItAsComplete(2)
    })

    it('should filter "Active" correctly', () => {
        clickOnFilterType("Active")
        validateTodoListLength(2)
      })
    
      it('should filter "Completed" correctly', () => {
        clickOnFilterType("Completed")
        validateTodoListLength(1)
      })
    
      it('should filter "All" correctly', () => {
        clickOnFilterType("All")
        validateTodoListLength(3)
      })
})