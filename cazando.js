let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// POSICIONES
let gatoX = 200;
let gatoY = 200;
let comidaX = 100;
let comidaY = 100;

// JUEGO
let puntos = 0;
let tiempo = 15;
let intervalo = null;

// CONSTANTES
const ANCHO_GATO = 50;
const ALTO_GATO = 50;
const ANCHO_COMIDA = 30;
const ALTO_COMIDA = 30;
const VELOCIDAD = 10;

// DIBUJAR RECTANGULO
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

// GATO
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#22c55e"); // verde neon
}

// COMIDA
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#ff003c"); // rojo neon
}

// LIMPIAR
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// DIBUJAR TODO
function dibujar() {
    limpiarCanvas();
    graficarGato();
    graficarComida();
}

// MOVER GATO
function moverArriba() {
    gatoY -= VELOCIDAD;
    actualizar();
}

function moverAbajo() {
    gatoY += VELOCIDAD;
    actualizar();
}

function moverIzquierda() {
    gatoX -= VELOCIDAD;
    actualizar();
}

function moverDerecha() {
    gatoX += VELOCIDAD;
    actualizar();
}

// TECLADO (PRO)
function controlarTeclado(e) {
    if (e.key === "ArrowUp") moverArriba();
    if (e.key === "ArrowDown") moverAbajo();
    if (e.key === "ArrowLeft") moverIzquierda();
    if (e.key === "ArrowRight") moverDerecha();
}

// DETECTAR COLISION
function detectarColision() {
    if (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY
    ) {
        puntos++;
        document.getElementById("puntos").textContent = puntos;

        moverComida();
    }
}

// MOVER COMIDA
function moverComida() {
    comidaX = Math.random() * (canvas.width - ANCHO_COMIDA);
    comidaY = Math.random() * (canvas.height - ALTO_COMIDA);
}

// ACTUALIZAR
function actualizar() {
    detectarColision();
    dibujar();
}

// TIMER
function iniciarTiempo() {
    intervalo = setInterval(() => {
        tiempo--;
        document.getElementById("tiempo").textContent = tiempo;

        if (tiempo <= 0) {
            clearInterval(intervalo);
            document.getElementById("mensaje").textContent = "💀 GAME OVER";
        }
    }, 1000);
}

// REINICIAR
function reiniciarJuego() {
    puntos = 0;
    tiempo = 10;

    gatoX = 200;
    gatoY = 200;

    document.getElementById("puntos").textContent = puntos;
    document.getElementById("tiempo").textContent = tiempo;
    document.getElementById("mensaje").textContent = "";

    clearInterval(intervalo);
    iniciarTiempo();
    dibujar();
}

// INICIO
function iniciarJuego() {
    document.addEventListener("keydown", controlarTeclado);
    iniciarTiempo();
    dibujar();
}