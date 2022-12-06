function showPut(element){
    let id = element.dataset.id
    let name = element.dataset.name
    let cpf = element.dataset.cpf
    let email = element.dataset.email
    let password = element.dataset.password
    let admin = element.dataset.admin === 'true'
    let formPut = `
        <div class="modal-body">
            <form id="form">
            <div class="mb-3">
                <label for="name" class="form-label">Nome</label>
                <input type="text" name="name" required class="form-control" id="name-put" value='${name}'>
            </div>
            <div class="mb-3">
                <label for="cpf" class="form-label">CPF</label>
                <input type="text" name="cpf" required class="form-control" id="cpf-put" value='${cpf}'>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" name="email" required class="form-control" id="email-put" value='${email}'>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input type="text" name="password" required class="form-control" id="password-put" value='${password}'>
            </div>
            <div class="mb-3">
                <label for="admin" class="form-label">Ativo</label>
                <select class="form-select" id="admin-put" aria-label="Default select example">
                    <option ${admin ? 'selected' : ''} value="true">Sim</option>
                    <option ${!admin ? 'selected' : ''} value="false">Não</option>
                </select>
            </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="submit" data-id='${id}' onclick="putUser(this)" class="btn btn-primary">Alterar</button>
        </div>
    `
    document.querySelector('#formPut').innerHTML = formPut
}

function showResponse(res){
    let tableContent = ''
    let count = 0
    res.forEach(element => {
        count += 1
        tableContent += `
        <tr>
            <th scope="row">${count}</th>
            <td>${element.name}</td>
            <td>${element.cpf}</td>
            <td>${element.email}</td>
            <td>${element.isAdmin ? 'Sim' : 'Não'}</td>
            <td><i data-bs-target="#exampleModalPut" data-id='${element.id}' data-name='${element.name}' data-cpf='${element.cpf}' data-email='${element.email}' data-password='${element.password}' data-admin='${element.isAdmin}' onclick='showPut(this)' data-bs-toggle="modal" class="bi bi-pen-fill"></i></td>
            <td><i class="bi bi-trash3-fill mx-auto" data-id='${element.id}' style="color: red ;" onclick='deleteUser(this)' id='tableDelete'></i></td>
        <tr>
        `
    });
    document.querySelector('#table').innerHTML = tableContent
}

async function getUsers(){
    await axios.get("http://localhost:3333/users")
        .then(res =>showResponse(res.data))
}

async function deleteUser(element){
    let id = element.dataset.id
    await axios.delete(`http://localhost:3333/users/${id}`)

    location.reload()
}

async function putUser(element){
    let id = element.dataset.id
    let name = document.querySelector('#name-put').value;
    let cpf = document.querySelector('#cpf-put').value;
    let password = document.querySelector('#password-put').value;
    let email = document.querySelector('#email-put').value;
    let isAdmin = document.querySelector('#admin-put').value === 'true';
    let data = {
        name,
        cpf,
        password,
        email,
        isAdmin,
    }
    await axios.put(`http://localhost:3333/users/${id}`, data)

    location.reload()
}

async function postUser(){
    let name = document.querySelector('#name').value;
    let cpf = document.querySelector('#cpf').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let isAdmin = document.querySelector('#admin').value === 'true';
    let data = {
        name,
        cpf,
        email,
        password,
        isAdmin,
    }
    await axios.post("http://localhost:3333/users", data)
        .then(res =>console.log(res))
    
    location.reload()
}