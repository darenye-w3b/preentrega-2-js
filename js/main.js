// -------  BIBLIOTECA VIRTUAL --------
const modoOscuroSwitch = document.getElementById('modoOscuroSwitch');
const body = document.body;

if (localStorage.getItem('modoOscuro') === 'activado') {
    activarModoOscuro();
}

modoOscuroSwitch.addEventListener('change', () => {
    if (modoOscuroSwitch.checked) {
        activarModoOscuro();
    } else {
        desactivarModoOscuro();
    }
});

// Activar el modo oscuro
function activarModoOscuro() {
    body.classList.add('modo-oscuro');
    localStorage.setItem('modoOscuro', 'activado');
}

// Desactivar el modo oscuro
function desactivarModoOscuro() {
    body.classList.remove('modo-oscuro');
    localStorage.setItem('modoOscuro', 'desactivado');
}

// DOM
const tituloInput = document.getElementById('titulo');
const autorInput = document.getElementById('autor');
const resultadoDiv = document.getElementById('resultado');
const filtrarEstadoSelect = document.getElementById('filtrarEstado');

// Crear un libro
function crearLibro(titulo, autor) {
    return {
        titulo,
        autor,
        prestado: false,
    };
}

// Agregar un libro a la biblioteca
function agregarLibro() {
    const titulo = tituloInput.value;
    const autor = autorInput.value;

    if (titulo && autor) {
        const nuevoLibro = crearLibro(titulo, autor);
        biblioteca.push(nuevoLibro);
        guardarEnLocalStorage();
        mostrarBiblioteca();
    } else {
        alert('Por favor, ingrese el título y el autor del libro.');
    }
}

// Mostrar todos los libros en la biblioteca
function mostrarBiblioteca() {
    resultadoDiv.innerHTML = "<h2>Biblioteca:</h2>";

    biblioteca.forEach((libro, index) => {
        const infoLibro = document.createElement('p');
        infoLibro.textContent = `${index + 1}. Título: ${libro.titulo}, Autor: ${libro.autor}, Prestado: ${libro.prestado ? 'Sí' : 'No'}`;

        const cambiarEstadoButton = document.createElement('button');
        cambiarEstadoButton.textContent = libro.prestado ? 'Devolver' : 'Prestar';
        cambiarEstadoButton.addEventListener('click', function () {
            cambiarEstadoLibro(index);
        });

        infoLibro.appendChild(cambiarEstadoButton);
        resultadoDiv.appendChild(infoLibro);
    });
}

// Mostrar libros según su estado de préstamo
function mostrarLibrosPorEstado() {
    const estadoSeleccionado = filtrarEstadoSelect.value;
    resultadoDiv.innerHTML = "";

    let librosFiltrados = [];

    switch (estadoSeleccionado) {
        case 'prestados':
            librosFiltrados = biblioteca.filter(libro => libro.prestado);
            break;
        case 'disponibles':
            librosFiltrados = biblioteca.filter(libro => !libro.prestado);
            break;
        default:
            librosFiltrados = biblioteca;
    }

    librosFiltrados.forEach((libro, index) => {
        const infoLibro = document.createElement('p');
        infoLibro.textContent = `${index + 1}. Título: ${libro.titulo}, Autor: ${libro.autor}, Prestado: ${libro.prestado ? 'Sí' : 'No'}`;

        const cambiarEstadoButton = document.createElement('button');
        cambiarEstadoButton.textContent = libro.prestado ? 'Devolver' : 'Prestar';
        cambiarEstadoButton.addEventListener('click', function () {
            cambiarEstadoLibro(index);
        });

        infoLibro.appendChild(cambiarEstadoButton);
        resultadoDiv.appendChild(infoLibro);
    });
}

// Cambiar el estado de un libro (prestado o devuelto)
function cambiarEstadoLibro(indiceLibro) {
    const libro = biblioteca[indiceLibro];

    if (libro) {
        libro.prestado = !libro.prestado; 

        guardarEnLocalStorage();
        mostrarBiblioteca();
    } else {
        alert("No se encontró el libro en la biblioteca.");
    }
}

// Guardar la biblioteca en el almacenamiento local
function guardarEnLocalStorage() {
    localStorage.setItem('biblioteca', JSON.stringify(biblioteca));
}

// Cargar la biblioteca desde el almacenamiento local
function cargarDesdeLocalStorage() {
    const bibliotecaGuardada = localStorage.getItem('biblioteca');
    if (bibliotecaGuardada) {
        biblioteca = JSON.parse(bibliotecaGuardada);
        mostrarBiblioteca();
    }
}

// FETCH y JSON
fetch('js/package.json') 
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al obtener el JSON. Código de estado: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        biblioteca = data.libros;
        mostrarBiblioteca();
    })
    .catch(error => {
        console.error('Error en la solicitud FETCH:', error.message);
    });

// Botón para abrir la galería de libros
const abrirGaleriaButton = document.getElementById('abrirGaleriaButton');
abrirGaleriaButton.addEventListener('click', mostrarGaleria);

filtrarEstadoSelect.addEventListener('change', function () {
    mostrarLibrosPorEstado();
});

// Mostrar la galería de libros con Sweet Alert 2
function mostrarGaleria() {
    const galeriaHTML = generarHTMLGaleria();

    Swal.fire({
        title: 'Galería de libros',
        html: galeriaHTML,
        confirmButtonText: 'Cerrar',
        width: '600px',
    });
}

// Generar el HTML de la galería
function generarHTMLGaleria() {
    let galeriaHTML = '<div style="display: flex; flex-wrap: wrap;">';

    biblioteca.forEach((libro, index) => {
        galeriaHTML += `
            <div style="margin: 10px; text-align: center;">
                <img src="assets/${index + 1}.jpg" alt="${libro.titulo}" style="width: 150px; height: 200px;">
                <p>${libro.titulo}</p>
            </div>
        `;
    });

    galeriaHTML += '</div>';

    return galeriaHTML;
}

















