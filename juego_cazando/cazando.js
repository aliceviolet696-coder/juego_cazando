// Obtener canvas y contexto
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// VARIABLES
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

// CONSTANTES
const ANCHO_GATO = 50;
const ALTO_GATO = 50;

const ANCHO_COMIDA = 30;
const ALTO_COMIDA = 30;


// FUNCION GENERAL PARA DIBUJAR RECTANGULOS
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}


// FUNCION GATO
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "blue");
}


// FUNCION COMIDA
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "green");
}


// INICIAR JUEGO
function iniciarJuego() {

    // LIMPIAR CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // CENTRAR GATO
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

    // COMIDA EN ESQUINA INFERIOR DERECHA
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    // DIBUJAR
    graficarGato();
    graficarComida();
}