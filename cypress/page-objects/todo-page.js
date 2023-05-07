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

    
}