function showPut(element){
    let id = element.dataset.id
    let brand = element.dataset.brand
    let model = element.dataset.model
    let license_plate = element.dataset.licenseplate
    let color = element.dataset.color
    let category = element.dataset.category
    let formPut = `
        <div class="modal-body">
            <form id="form">
            <div class="mb-3">
                <label for="brand" class="form-label">Marca</label>
                <input type="text" name="brand" class="form-control" id="brand-put" value='${brand}'>
            </div>
            <div class="mb-3">
                <label for="model" class="form-label">Modelo</label>
                <input type="text" name="model" class="form-control" id="model-put" value='${model}'>
            </div>
            <div class="mb-3">
                <label for="license_plate" class="form-label">Placa</label>
                <input type="text" name="license_plate" class="form-control" id="license_plate-put" value='${license_plate}'>
            </div>
            <div class="mb-3">
                <label for="color" class="form-label">Cor</label>
                <input type="text" name="color" class="form-control" id="color-put" value='${color}'>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">Categoria</label>
                <input type="text" name="category" class="form-control" id="category-put" value='${category}'>
            </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="submit" data-id='${id}' onclick="putCar(this)" class="btn btn-primary">Alterar</button>
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
            <td>${element.brand}</td>
            <td>${element.model}</td>
            <td>${element.license_plate}</td>
            <td>${element.color}</td>
            <td>${element.category}</td>
            <td><i data-bs-target="#exampleModalPut" data-id='${element.id}' data-brand='${element.brand}' data-model='${element.model}' data-licenseplate='${element.license_plate}' data-color='${element.color}' data-category='${element.category}' onclick='showPut(this)' data-bs-toggle="modal" class="bi bi-pen-fill"></i></td>
            <td><i class="bi bi-trash3-fill mx-auto" data-id='${element.id}' style="color: red ;" onclick='deleteCar(this)' id='tableDelete'></i></td>
        <tr>
        `
    });
    document.querySelector('#table').innerHTML = tableContent
}

async function getCars(){
    await axios.get("http://localhost:3333/cars")
        .then(res =>showResponse(res.data))
}

async function deleteCar(element){
    let id = element.dataset.id
    await axios.delete(`http://localhost:3333/cars/${id}`)

    location.reload()
}

async function putCar(element){
    let id = element.dataset.id
    let brand = document.querySelector('#brand-put').value;
    let model = document.querySelector('#model-put').value;
    let license_plate = document.querySelector('#license_plate-put').value;
    let color = document.querySelector('#color-put').value;
    let category = document.querySelector('#category-put').value;
    let data = {
        brand,
        model,
        license_plate,
        color,
        category
    }
    await axios.put(`http://localhost:3333/cars/${id}`, data)

    location.reload()
}

async function postCar(){
    let brand = document.querySelector('#brand').value;
    let model = document.querySelector('#model').value;
    let license_plate = document.querySelector('#license_plate').value;
    let color = document.querySelector('#color').value;
    let category = document.querySelector('#category').value;
    let data = {
        brand,
        model,
        license_plate,
        color,
        category
    }
    await axios.post("http://localhost:3333/cars", data)
        .then(res =>console.log(res))
    
    location.reload()
}