let canvas=document.getElementById("areajuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=50;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;


let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje=0;
let vidas=5;
let velocidadCaida=200;
let intervalo;

function iniciar(){
    setInterval(bajarLimon,velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();

}

function dibujarSuelo(){
   ctx.fillStyle = "#5BCFFB";
   ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}
function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}
function moverIzquierda(){
    personajeX=personajeX-10;
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    detectarAtrapado();
    
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function moverDerecha(){
    personajeX=personajeX+10;
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    detectarAtrapado(); 
}
function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);
}
function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX+ANCHO_LIMON>personajeX && 
        limonX< personajeX+ANCHO_PERSONAJE &&
        limonY+ALTURA_LIMON>personajeY &&
        limonY < personajeY+ALTURA_PERSONAJE){
        //alert("ATRAPADO!!")
        aparecerLimon();
        puntaje=puntaje+1;
        monstrarEnSpan("txtPuntaje",puntaje);
        if(puntaje==3){
            cambiarVelocidad(150);
        }
        if(puntaje==6){
            cambiarVelocidad(100);
        }
        if(puntaje==10){
            clearInterval(intervalo);
            alert("🍋 TIENES LOS LIMONES, AHORA FALTA SAL Y TEQUILA 🍋");
        }
    }
}

function detectarPiso(){
    if(limonY+ALTURA_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        monstrarEnSpan("txtVidas",vidas);
        if(vidas==0){
            clearInterval(intervalo);
            alert("GAME OVER");
        }
    }
}

function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}
function reiniciar(){
    clearInterval(intervalo);

    puntaje = 0;
    vidas = 5;
    velocidadCaida = 200;

    monstrarEnSpan("txtPuntaje",puntaje);
    monstrarEnSpan("txtVidas",vidas);

    personajeX=canvas.width/2;
    limonY=0;

    iniciar();
}