const container = document.createElement('div')
container.id = 'notification'
const ul = document.createElement('ul')
ul.addEventListener('click', onClick)
container.appendChild(ul)

document.body.appendChild(container)

export function notify(message) {
    const li = document.createElement('li')
    li.classList.add('notification')
    li.textContent = message + ' \u2716'
    ul.appendChild(li)

    setTimeout(() => li.remove(), 3000)
}

function onClick(e) {
    if (e.target.tagName == 'LI') {
        e.target.remove()
    }
}