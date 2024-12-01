document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if(event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if(event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

updateBtn.onclick = function(){
    const updateInputNama = document.querySelector('#update-input-nama');

    fetch('http://localhost:5000/ubah', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateInputNama.dataset.id,
            nama: updateInputNama.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;
    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id) {
    const updateInputNama = document.querySelector('#update-input-nama');
    updateInputNama.dataset.id = id;
    updateInputNama.value = ''; // reset value for user to enter new one
    document.querySelector('#update-section').style.display = 'block';
}

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');
    let tableHtml = "";

    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    data.forEach(function ({id, nama, tanggal}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${nama}</td>`;
        tableHtml += `<td>${new Date(tanggal).toLocaleDateString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Hapus</button></td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Ubah</button></td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

const addBtn = document.querySelector('#add-nama-btn');

addBtn.onclick = function () {
    const inputNama = document.querySelector('#input-nama');
    const nama = inputNama.value;
    inputNama.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ nama: nama })
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'tanggal') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Hapus</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Ubah</button></td>`;
    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}
