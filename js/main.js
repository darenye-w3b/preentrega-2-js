// Función para crear un libro
function crearLibro(titulo, autor) {
    return {
        titulo,
        autor,
        prestado: false,
    };
}

// Función para agregar un libro a la biblioteca
function agregarLibro(biblioteca, libro) {
    biblioteca.push(libro);
}

// Función para mostrar todos los libros en la biblioteca
function mostrarBiblioteca(biblioteca) {
    console.log("Biblioteca:");
    biblioteca.forEach((libro, index) => {
        console.log(`${index + 1}. Título: ${libro.titulo}, Autor: ${libro.autor}, Prestado: ${libro.prestado ? 'Sí' : 'No'}`);
    });
}

// Función para mostrar libros según su estado de préstamo
function mostrarLibrosPorEstado(biblioteca, prestado) {
    const librosFiltrados = biblioteca.filter(libro => libro.prestado === prestado);

    librosFiltrados.forEach((libro, index) => {
        console.log(`${index + 1}. Título: ${libro.titulo}, Autor: ${libro.autor}`);
    });
}

// Función para prestar un libro
function prestarLibro(biblioteca, indiceLibro) {
    const libro = biblioteca[indiceLibro];

    if (libro) {
        if (!libro.prestado) {
            libro.prestado = true;
            return `Libro "${libro.titulo}" prestado.`;
        } else {
            return `El libro "${libro.titulo}" ya está prestado.`;
        }
    } else {
        return "No se encontró el libro en la biblioteca.";
    }
}


const biblioteca = [];

agregarLibro(biblioteca, crearLibro("Cien años de soledad", "Gabriel García Márquez"));
agregarLibro(biblioteca, crearLibro("1984", "George Orwell"));
agregarLibro(biblioteca, crearLibro("El señor de los anillos", "J.R.R. Tolkien"));
agregarLibro(biblioteca, crearLibro("Orgullo y Prejuicio", "Jane Austen"));
agregarLibro(biblioteca, crearLibro("El Resplandor", "Stephen King"));
agregarLibro(biblioteca, crearLibro("El Alquimista", "Paulo Coelho"));
agregarLibro(biblioteca, crearLibro("Moby-Dick", "Herman Melville"));
agregarLibro(biblioteca, crearLibro("El Marciano", "Andy Weir"));
agregarLibro(biblioteca, crearLibro("El Arte de la Guerra", "Sun Tzu"));
agregarLibro(biblioteca, crearLibro("Harry Potter y la piedra filosofal", "J.K. Rowling"));
agregarLibro(biblioteca, crearLibro("El Gran Gatsby", "F. Scott Fitzgerald"));
agregarLibro(biblioteca, crearLibro("Crimen y castigo", "Fyodor Dostoevsky"));
agregarLibro(biblioteca, crearLibro("El Hobbit", "J.R.R. Tolkien"));

prestarLibro(biblioteca, 0);
prestarLibro(biblioteca, 3);
prestarLibro(biblioteca, 5);
prestarLibro(biblioteca, 7);
prestarLibro(biblioteca, 10);


const opcionUsuario = prompt("¿Qué deseas visualizar? (biblioteca/prestados/disponibles)");

if (opcionUsuario) {
    if (opcionUsuario.toLowerCase() === "biblioteca") {
        // Mostrar la biblioteca completa
        console.log("\nTodos los libros en la biblioteca:");
        mostrarBiblioteca(biblioteca);
    } else if (opcionUsuario.toLowerCase() === "prestados") {
        // Mostrar solo libros prestados
        console.log("\nLibros prestados:");
        mostrarLibrosPorEstado(biblioteca, true);
    } else if (opcionUsuario.toLowerCase() === "disponibles") {
        // Mostrar solo libros disponibles
        console.log("\nLibros disponibles:");
        mostrarLibrosPorEstado(biblioteca, false);
    } else {
        console.log("\nOpción no válida. Debes ingresar 'biblioteca', 'prestados' o 'disponibles'.");
    }
} else {
    console.log("\nNo ingresaste ninguna opción.");
}

