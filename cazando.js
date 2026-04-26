let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// POSICIONES
let gatoX = 200;
let gatoY = 200;
let comidaX = 100;
let comidaY = 100;

// JUEGO
let puntos = 0;
let tiempo = 10;
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
// COMIDA
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "green");
}

// LIMPIAR CANVAS
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// REDIBUJAR TODO
function dibujarTodo() {
    limpiarCanvas();
    graficarGato();
    graficarComida();
}

// MOVIMIENTOS
function moverIzquierda() {
    gatoX -= VELOCIDAD;
    dibujarTodo();
    detectarColision();
}

function moverDerecha() {
    gatoX += VELOCIDAD;
    dibujarTodo();
    detectarColision();
}

function moverArriba() {
    gatoY -= VELOCIDAD;
    dibujarTodo();
    detectarColision();
}

function moverAbajo() {
    gatoY += VELOCIDAD;
    dibujarTodo();
    detectarColision();
}

// DETECTAR COLISION
function detectarColision() {

    if (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY
    ) {
        // SUMAR PUNTO
        puntos++;
        document.getElementById("puntos").innerText = puntos;

        // NUEVA POSICION ALEATORIA
        comidaX = Math.random() * (canvas.width - ANCHO_COMIDA);
        comidaY = Math.random() * (canvas.height - ALTO_COMIDA);

        dibujarTodo();

        // CONDICION GANAR
        if (puntos >= 6) {
            clearInterval(intervalo);
            alert("🎉 GANASTE");
        }
    }
}

// TIEMPO
function restarTiempo() {
    tiempo--;
    document.getElementById("tiempo").innerText = tiempo;

    if (tiempo <= 0) {
        clearInterval(intervalo);
        alert("💀 GAME OVER");
    }
}

// INICIAR JUEGO
function iniciarJuego() {

    // RESET VARIABLES
    puntos = 0;
    tiempo = 10;

    document.getElementById("puntos").innerText = puntos;
    document.getElementById("tiempo").innerText = tiempo;

    // POSICION GATO
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

    // POSICION COMIDA ALEATORIA
    comidaX = Math.random() * (canvas.width - ANCHO_COMIDA);
    comidaY = Math.random() * (canvas.height - ALTO_COMIDA);

    dibujarTodo();

    // INICIAR TIMER
    clearInterval(intervalo);
    intervalo = setInterval(restarTiempo, 1000);
}

// REINICIAR
function reiniciarJuego() {
    iniciarJuego();
}

///Movimiento con teclado
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft") moverIzquierda();
    if (e.key === "ArrowRight") moverDerecha();
    if (e.key === "ArrowUp") moverArriba();
    if (e.key === "ArrowDown") moverAbajo();
});