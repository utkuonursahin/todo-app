'use strict'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model'
import View from './view'

const addTodo = function (e) {
    const checkBox = e.target
    //Guard clause for triggering the input while it's still checked also it will be unchecked from line:15
    if (!checkBox.checked) return
    const todo = model.createTodo(checkBox)
    //Guard clause for triggering the input with empty string
    if (!todo) return checkBox.checked = false
    View.renderTodo(model.state.allTodos)
    model.uncheckMainInput(checkBox)
    model.saveLocalStorage()
}

const deleteTodo = function (e) {
    if (!e.target.classList.contains('btn--close')) return
    const deleteEl = e.target.closest('.todobox__list--item')
    model.deleteTodoFromModel(deleteEl)
    View.renderTodo(model.state.allTodos)
    model.saveLocalStorage()
}

const filterTodos = function (filterType) {
    const data = model.filterTodo(filterType)
    View.renderTodo(data)
    //After filtering saving todos to local storage for in case of mutated 'model.state.allTodos' (check model.js line:46)
    model.saveLocalStorage()
}

const completeTodo = function (e) {
    const todoCheckbox = e.target.closest('.check')
    if (!todoCheckbox) return //Authing there's a checkbox really
    const todoEl = todoCheckbox.closest('.todobox__list--item')
    const id = todoEl.dataset.id
    model.checkTodo(todoCheckbox, id) //A function responsible for both check & uncheck a task
    View.renderTodo(model.state.allTodos)
    model.saveLocalStorage()
}

const changeMode = function () {
    const width = screen.width
    if (!model.state.darkMode) View.changeToDark(width)
    else View.changeToLight(width)
    model.state.darkMode = !model.state.darkMode
}

const checkLocalStorage = function () {
    model.getLocalStorage()
    if (model.state.allTodos.length === 0) return
    else View.renderTodo(model.state.allTodos)
}

const runQuote = async function () {
    const data = await model.getQuote()
    View.changeQuote(data)
}

const init = async function () {
    //Check local storage if there's a data from before
    checkLocalStorage()
    //Add event listeners
    View.addHandlerAddTodo(addTodo)
    View.addHandlerDeleteTodo(deleteTodo)
    View.addHandlerCompleteTodo(completeTodo)
    View.addHandlerFilterTodo(filterTodos)
    View.addHandlerChangeMode(changeMode)
    runQuote()
    setInterval(async () => runQuote(), 10000)
}
init()