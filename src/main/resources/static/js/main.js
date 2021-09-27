
const URL = "http://localhost:8088/api/users"
const usersTbody = document.querySelector('#users-tbody')
let rolesArr = []


/**
 *  EVENT LISTENERS
 */
window.addEventListener('load', () => {
    getRoles()
    getUsers()
})
usersTbody.addEventListener('click', e => {
    const id = e.target.id.split('-')
    getId(id[1], id[0])
})
document.querySelector('#form-new')
    .addEventListener('submit', e => {
        e.preventDefault()
        postUser()
        document.querySelector("#nav-home-tab").click()
    })
document.querySelector('#form-edit')
    .addEventListener('submit', e => {
        e.preventDefault()
        editUser()
        document.querySelector("#edit-close").click()
    })
document.querySelector(`#form-del`)
    .addEventListener('submit', e => {
        e.preventDefault()
        delUser()
        document.querySelector("#del-close").click()
    })


/**
 *  GET ALL ROLES
 */
function getRoles() {
    fetch(`${URL}/roles`)
        .then(resp => resp.json())
        .then(data => rolesArr = data)
}


/**
 *  GET ALL USERS
 */
function getUsers() {
    fetch(URL)
        .then(resp => resp.json())
        .then(data => renderAllUsers(data))
}

function renderAllUsers(users) {
    let html = ''
    users.forEach(user => html += renderUser(user))
    usersTbody.innerHTML = html
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
                            id="del-${user.id}"
                            data-bs-toggle="modal"
                            data-bs-target="#del-modal">Delete</button>
                </td>
            </tr>
        `
}


/**
 *  POST NEW USER
 */
const postUser = () => {
    const form = document.querySelector('#form-new')
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: getJson(form)
    })
        .then(getUsers)
    form.reset()
}

function getJson(form) {
    const formData = new FormData(form);
    const selectTag = form[form.length - 2]
    const rolesArr = []
    Array.from(selectTag.selectedOptions).forEach(role => {
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
 *  GET USER
 */
function getId(id, process) {
    fetch(`${URL}/${id}`)
        .then(resp => resp.json())
        .then(data => {
            if (process === 'del') renderDelModal(data)
            if (process === 'edit') renderEditModal(data)
        })
}


/**
 *  DELETE USER
 */
function delUser() {
    const id = document.querySelector('#form-del')[0].value
    fetch(`${URL}/${id}`, {
        method: 'DELETE'
    }).then(getUsers)
}

function renderDelModal(user) {
    const inputArr = []
    Array.from(document.querySelector('#form-del').children)
        .forEach(div => inputArr.push(Array.from(div.children)[1]))
    inputArr.forEach(input => input.value = user[input.name])
    
    const select = document.querySelector('#del-roles')
    let html = ''
    user.roles.forEach(role => {
        html += `<option selected disabled>${role.name}</option>`
    })
    select.innerHTML = html
    select.size = user.roles.length
}


/**
 *  EDIT USER
 */
const editUser = () => {
    const form = document.querySelector('#form-edit')
    const id = form[0].value
    fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: getJson(form)
    })
        .then(getUsers)
}

function renderEditModal(user) {
    const inputArr = []
    Array.from(document.querySelector(`#form-edit`).children)
        .forEach(div => inputArr.push(Array.from(div.children)[1]))
    inputArr.forEach(input => input.value = user[input.name])
    document.querySelector('#edit-password').value = null
    
    const select = document.querySelector('#edit-roles')
    let html = ''
    rolesArr.forEach(role => {
        let isSelected = false
        user.roles.forEach(userRole => {
            if (userRole.name === role.name) {
                isSelected = true
            }
        })
        isSelected
            ? html += `<option value="${role.id}" selected>${role.name}</option>`
            : html += `<option value="${role.id}">${role.name}</option>`
    })
    select.innerHTML = html
    select.size = rolesArr.length
}
