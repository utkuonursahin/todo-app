export const state = {
    allTodos: [],
    darkMode: false
}

//Creates IDs like '1W1e4q3Y5e' for todoObject (check line:22)
const createID = function () {
    const chars = ['q', 'W', 'e', 'R', 't', 'Y']
    let id = ''
    for (let i = 0; i < 5; i++) {
        const number = Math.round(Math.random() * 5)
        const char = chars[number]
        id += number + `${char}`
    }
    return id
}

export const createTodo = function (checkBox) {
    const inputsContainer = checkBox.closest('.header__inputs')
    const todoInput = inputsContainer.querySelector('#text--addTodo')
    if (!todoInput.value) return
    const todoObject = {
        id: `${createID()}`,
        status: 'active',
        content: todoInput.value
    }
    state.allTodos.push(todoObject)
    todoInput.value = ''
    return todoObject
}

export const deleteTodoFromModel = function (todoEl) {
    state.allTodos = state.allTodos.filter(todoObj => todoObj.id !== todoEl.dataset.id)
}

export const checkTodo = function (todoCheckbox, todoID) {
    const checkedTodo = state.allTodos.find(todoObj => todoObj.id === todoID)
    if (todoCheckbox.checked) checkedTodo.status = 'completed'
    else checkedTodo.status = 'active'
}

//filterTodo fn returns the filtered data for render
export const filterTodo = function (type) {
    if (type === 'all') return state.allTodos
    //Manipulating 'state.allTodos' on purpose. Bcs completed tasks should simply be removed from state.
    if (type === 'clear') return state.allTodos = state.allTodos.filter(todoObj => todoObj.status !== 'completed')
    else return state.allTodos.filter(todoObj => todoObj.status === type)
}

//After 500ms, unchecking the main input which is responsible for adding todos
export const uncheckMainInput = function (input) { setTimeout(() => input.checked = false, 500); }

export const saveLocalStorage = function () { localStorage.setItem('todos', JSON.stringify(state.allTodos)) }
export const getLocalStorage = function () {
    state.allTodos = JSON.parse(localStorage.getItem('todos'))
    if (!state.allTodos) state.allTodos = []
}

export const getQuote = async function () {
    try {
        const response = await fetch('https://api.quotable.io/random');
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}