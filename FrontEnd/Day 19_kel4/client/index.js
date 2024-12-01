document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/pengiriman-berlangsung')
        .then(response => response.json())
        .then(data => {
            document.getElementById('pengiriman-berlangsung').textContent = data.kirimProses;
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/pengiriman-selesai')
        .then(response => response.json())
        .then(data => {
            document.getElementById('pengiriman-selesai').textContent = data.kirimSelesai;
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/total-pemasukan')
        .then(response => response.json())
        .then(data => {
            const totalPemasukan = data.totalPemasukan.toLocaleString('id-ID');
            document.getElementById('total-pemasukan').textContent = totalPemasukan;
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/total-paket')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-paket').textContent = data.totalPaket;
        })
        .catch(error => console.error('Error:', error));
});

// Login Failed Alert
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');

if (error) {
    document.getElementById('error-alert').style.display = 'block';
    setTimeout(() => {
        document.getElementById('error-alert').style.display = 'none';
        sessionStorage.setItem('errorShown', 'true');
        // Hapus parameter 'error' dari URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }, 3000);
} else if (sessionStorage.getItem('errorShown')) {
    document.getElementById('error-alert').style.display = 'block';
}

// get kota by id_provinsi
document.addEventListener('DOMContentLoaded', function() {
    const idProvinsiSelect = document.getElementById('id_provinsi');
    const idKotaSelect = document.getElementById('id_kota');

    idProvinsiSelect.addEventListener('change', function() {
        const idProvinsi = idProvinsiSelect.value;
        if (idProvinsi) {
            fetch(`/getKotaByProvinsi/${idProvinsi}`)
                .then(response => response.json())
                .then(data => {
                    idKotaSelect.innerHTML = '';
                    data.forEach(kota => {
                        const option = document.createElement('option');
                        option.value = kota.id_kota;
                        option.textContent = kota.nama_kota;
                        idKotaSelect.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching kota:', error);
                });
        } else {
            idKotaSelect.innerHTML = '';
        }
    });
});