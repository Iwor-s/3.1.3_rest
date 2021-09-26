
const URL = "http://localhost:8088/api"
const usersObj = {}
const rolesObj = {}

/**
 *  GET ALL USERS
 */
const allUsersRows = document.querySelector('#users-tbody')
window.addEventListener('load', getUsers)

function getUsers() {
    fetch(`${URL}/users`)
        .then(resp => resp.json())
        .then(data => {
            renderUsers(data)
            data.forEach(user => usersObj[user.id] = user)
        })
}

function renderUsers(users) {
    let html = ''
    users.forEach(user => html += renderUser(user))
    allUsersRows.innerHTML = html
    
    Array.from(document.querySelectorAll(".user-btn"))
        .forEach(btn => {
            btn.addEventListener('click', () => {
                const attr = btn.getAttribute('id').split('-')
                getId(attr[1], attr[0])
            })
        })
}

function renderUser(user) {
    let roles = ''
    user.roles.forEach(role => roles += role.name + ' ')
    return `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${roles}</td>
                <td>
                    <button class="btn btn-info text-white px-2 py-1 user-btn"
                            id="edit-${user.id}"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-modal">Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger px-2 py-1 user-btn"
                            id="delete-${user.id}"
                            data-bs-toggle="modal"
                            data-bs-target="#del-modal">Delete</button>
                </td>
            </tr>
        `
}


/**
 *  POST NEW USER
 */
const success = document.querySelector("#success")
const postUser = form => {
    fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: getJson(form)
    })
        .then(resp => {
            console.log(resp.ok)
        })
}

const formNewUser = document.querySelector("#form-new-user");
formNewUser.addEventListener('submit', e => {
    e.preventDefault()
    postUser(e.target)
    success.classList.add("show")
    setTimeout(() => {
        e.target.reset()
        success.classList.remove("show")
    }, 1000)
})

function getJson(form) {
    const formData = new FormData(form);
    const roles = document.getElementById("new-roles")
    console.log(roles)
    const rolesArr = []
    Array.from(roles.selectedOptions).forEach(role => {
        rolesArr.push({
            id: role.value,
            name: role.text
        })
    })
    const obj = Object.fromEntries(formData.entries())
    obj.roles = rolesArr
    return JSON.stringify(obj)
}


/**
 *  DELETE USER
 */
function delUser(id) {
    fetch(`${URL}/users/${id}`, {method: 'DELETE'})
        .then(getUsers)
}

function renderDelModal(user) {
    document.querySelector(`#del-submit`)
        .addEventListener('click', e => {
            e.preventDefault()
            delUser(user.id)
            document.querySelector('#del-modal').classList.remove('show')
            document.querySelector('.modal-backdrop').classList.remove('show')
            document.querySelector('body').classList.remove('modal-open')
        })
    
    const inputArr = []
    Array.from(document.querySelector('#del-modal-fields').children)
        .forEach(div => inputArr.push(Array.from(div.children)[1]))
    
    for (let i = 0; i < inputArr.length; i++) {
        let fieldName = inputArr[i].getAttribute("name")
        inputArr[i].value = user[fieldName]
    }
    
    const select = document.querySelector('#del-roles')
    let html = ''
    user.roles.forEach(role => {
        html += `<option selected disabled>${role.name}</option>`
    })
    select.innerHTML = html
    select.setAttribute('size', user.roles.length.toString())
}


/**
 *  EDIT USER
 */
function editUser(id) {
    console.log("edit function", id)
}


function renderEditModal(user) {
    document.querySelector(`#edit-submit`)
        .addEventListener('click', e => {
            e.preventDefault()
            editUser(user.id)
            document.querySelector('#edit-modal').classList.remove('show')
            document.querySelector('.modal-backdrop').classList.remove('show')
            document.querySelector('body').classList.remove('modal-open')
        })
    
    const inputArr = []
    Array.from(document.querySelector(`#edit-modal-fields`).children)
        .forEach(div => inputArr.push(Array.from(div.children)[1]))
    for (let i = 0; i < inputArr.length; i++) {
        let fieldName = inputArr[i].getAttribute("name")
        if (fieldName !== 'password') {
            inputArr[i].value = user[fieldName]
        }
    }
    const select = document.querySelector('#edit-roles')
    let html = ''
    console.log(rolesObj)
    Object.values(rolesObj).forEach(role => {
        html += `<option selected>${role.name}</option>`
    })
    select.innerHTML = html
    select.setAttribute('size', rolesObj.length)
}


function getId(id, process) {
    fetch(`${URL}/users/${id}`)
        .then(resp => resp.json())
        .then(data => process === 'delete'
            ? renderDelModal(data)
            : renderEditModal(data))
}
function getRoles() {
    fetch(`${URL}/roles`)
        .then(resp => resp.json())
        .then(data => setRoles(data))
}
function setRoles(roles) {
    console.log(roles)
    roles.forEach(role => rolesObj[roles.name] = role)
}
