import closeIcon from "../images/icon-cross.svg"
import sunIcon from "../images/icon-sun.svg"
import moonIcon from "../images/icon-moon.svg"
import bgDarkDesktop from "../images/bg-desktop-dark.jpg"
import bgDarkMobile from "../images/bg-mobile-dark.jpg"
import bgLightDesktop from "../images/bg-desktop-light.jpg"
import bgLightMobile from "../images/bg-mobile-light.jpg"
import Sortable from 'sortablejs';

class View {
    _todoboxElement = document.querySelector('.todobox')
    _addTodoCheckbox = document.querySelector('#checkbox--addTodo')
    _modeButton = document.querySelector('.header__container--mode')
    _header = document.querySelector('.header')
    _root = document.documentElement
    _data = null

    addHandlerAddTodo(handler) { this._addTodoCheckbox.addEventListener('change', handler) }
    addHandlerDeleteTodo(handler) { this._todoboxElement.addEventListener('click', handler) }
    addHandlerCompleteTodo(handler) { this._todoboxElement.addEventListener('change', handler) }

    addHandlerFilterTodo(handler) {
        this._todoboxElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn')
            if (!btn) return
            else handler(btn.dataset.type)
        })
    }

    addHandlerChangeMode(handler) { this._modeButton.addEventListener('click', handler) }

    changeToDark(width) {
        this._root.style.setProperty('--color-mainBackground', 'hsl(235, 21%, 11%)')
        this._root.style.setProperty('--color-todoBackground', 'hsl(235, 24%, 19%)')
        this._root.style.setProperty('--color-textHover', 'hsl(236, 33%, 92%)')
        this._header.style.backgroundImage = `url(${width > 500 ? bgDarkDesktop : bgDarkMobile})`
        this._modeButton.src = `${sunIcon}`
    }

    changeToLight(width) {
        this._root.style.setProperty('--color-mainBackground', 'hsl(236, 33%, 92%)')
        this._root.style.setProperty('--color-todoBackground', 'hsl(0, 0%, 98%)')
        this._root.style.setProperty('--color-textHover', 'hsl(235, 19%, 35%)')
        this._header.style.backgroundImage = `url(${width > 500 ? bgLightDesktop : bgLightMobile})`
        this._modeButton.src = `${moonIcon}`
    }

    _clear() { this._todoboxElement.innerHTML = '' }

    _createTodoMarkup() {
        return this._data.map(todo => {
            return `
            <li class="todobox__list--item ${todo.status === 'completed' ? 'completed' : ''}" data-id="${todo.id}" tabindex="1">
                <input type="checkbox" id = "checkbox--completeTodo-${todo.id}" class="check" ${todo.status === 'completed' ? 'checked' : '!checked'}>
                <label for="checkbox--completeTodo-${todo.id}" class="checkbox"></label>
                <span class="todobox__list--item--text">${todo.content}</span>
                <img src="${closeIcon}" alt="Close-icon" class="todobox__list--item--img btn--close">
            </li>`
        }).join('')
    }

    _createMarkup() {
        return `
        <ul class="todobox__list">
            ${this._createTodoMarkup()}
        </ul>

        <div class="todobox__manage">
          <span class="todobox__manage--items">${this._data.length} items</span>
          <button class="btn btn--text btn--all" data-type="all">All</button>
          <button class="btn btn--text btn--active" data-type="active">Active</button>
          <button class="btn btn--text btn--completed" data-type="completed">Completed</button>
          <button class="btn btn--text btn--clearAll" data-type="clear">Clear Completed</button>
        </div>`
    }

    renderTodo(data) {
        this._data = data
        this._todoboxElement.classList.remove('hidden')
        const markup = this._createMarkup()
        this._clear()
        this._todoboxElement.insertAdjacentHTML('afterbegin', markup)
        this._makeSortable()
    }

    _makeSortable() {
        const dragArea = document.querySelector('.todobox__list')
        const options = {
            animation: 250,
            delay: 100,
            draggable: '.todobox__list--item',
            chosenClass: 'todo--choose',
            dragClass: 'todo--drag',
            ghostClass: 'todo--ghost'
        }
        new Sortable(dragArea, options)
    }

    changeQuote(data) {
        const text = document.querySelector('.header__quote--text')
        const author = document.querySelector('.header__quote--author')
        text.innerHTML = `${data.content}`
        author.innerHTML = `- ${data.author}`
    }
}

export default new View()