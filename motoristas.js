function showPut(element){
    let id = element.dataset.id
    let name = element.dataset.name
    let cpf = element.dataset.cpf
    let driver_license = element.dataset.driverlicense
    let license_category = element.dataset.licensecategory
    let antt = element.dataset.antt
    let cnpj = element.dataset.cnpj
    let active = element.dataset.active === 'ativo'
    let formPut = `
        <div class="modal-body">
            <form id="form">
            <div class="mb-3">
                <label for="name" class="form-label">Nome</label>
                <input type="text" name="name" class="form-control" id="name-put" value='${name}'>
            </div>
            <div class="mb-3">
                <label for="cpf" class="form-label">CPF</label>
                <input type="text" name="cpf" class="form-control" id="cpf-put" value='${cpf}'>
            </div>
            <div class="mb-3">
                <label for="driver_license" class="form-label">CNH</label>
                <input type="text" name="driver_license" class="form-control" id="driverlicense-put" value='${driver_license}'>
            </div>
            <div class="mb-3">
                <label for="license_category" class="form-label">Categoria CNH</label>
                <input type="text" name="license_category" class="form-control" id="licensecategory-put" value='${license_category}'>
            </div>
            <div class="mb-3">
                <label for="antt" class="form-label">ANTT</label>
                <input type="text" name="antt" class="form-control" id="antt-put" value='${antt}'>
            </div>
            <div class="mb-3">
                <label for="cnpj" class="form-label">CNPJ</label>
                <input type="text" name="cnpj" class="form-control" id="cnpj-put" value='${cnpj}'>
            </div>
            <div class="mb-3">
                <label for="active" class="form-label">Ativo</label>
                <select class="form-select" id="active-put" aria-label="Default select example">
                    <option ${active ? 'selected' : ''} value="true">Sim</option>
                    <option ${active ? 'selected' : ''} value="false">Não</option>
                </select>
            </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="submit" data-id='${id}' onclick="putDriver(this)" class="btn btn-primary">Alterar</button>
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
            <td>${element.driver_license}</td>
            <td>${element.license_category}</td>
            <td>${element.antt}</td>
            <td>${element.cnpj}</td>
            <td>${element.active ? 'Ativo' : 'Inativo'}</td>
            <td><i data-bs-target="#exampleModalPut" data-id='${element.id}' data-name='${element.name}' data-cpf='${element.cpf}' data-driverlicense='${element.driver_license}' data-licensecategory='${element.license_category}' data-antt='${element.antt}' data-cnpj='${element.cnpj}' data-antt='${element.active}' onclick='showPut(this)' data-bs-toggle="modal" class="bi bi-pen-fill"></i></td>
            <td><i class="bi bi-trash3-fill mx-auto" data-id='${element.id}' style="color: red ;" onclick='deleteDriver(this)' id='tableDelete'></i></td>
        <tr>
        `
    });
    document.querySelector('#table').innerHTML = tableContent
}

async function getDrivers(){
    await axios.get("http://localhost:3333/drivers")
        .then(res =>showResponse(res.data))
}

async function deleteDriver(element){
    let id = element.dataset.id
    await axios.delete(`http://localhost:3333/drivers/${id}`)

    location.reload()
}

async function putDriver(element){
    let id = element.dataset.id
    let name = document.querySelector('#name-put').value;
    let cpf = document.querySelector('#cpf-put').value;
    let driver_license = document.querySelector('#driverlicense-put').value;
    let license_category = document.querySelector('#licensecategory-put').value;
    let antt = document.querySelector('#antt-put').value;
    let cnpj = document.querySelector('#cnpj-put').value;
    let active = document.querySelector('#active-put').value === 'true';
    let data = {
        name,
        cpf,
        driver_license,
        license_category,
        antt,
        cnpj,
        active
    }
    console.log(data)
    await axios.put(`http://localhost:3333/drivers/${id}`, data)

    location.reload()
}

async function postDriver(){
    let name = document.querySelector('#name').value;
    let cpf = document.querySelector('#cpf').value;
    let driver_license = document.querySelector('#driver_license').value;
    let license_category = document.querySelector('#license_category').value;
    let antt = document.querySelector('#antt').value;
    let cnpj = document.querySelector('#cnpj').value;
    let active = document.querySelector('#active').value === 'true';
    let data = {
        name,
        cpf,
        driver_license,
        license_category,
        antt,
        cnpj,
        active
    }
    console.log(data)
    await axios.post("http://localhost:3333/drivers", data)
        .then(res =>console.log(res))
    
    location.reload()
}