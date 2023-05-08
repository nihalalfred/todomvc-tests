
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