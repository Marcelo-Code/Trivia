// Variables para el cronómetro
let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let minutos;
let segundos;
let milisegundos;

// Función para iniciar el cronómetro
function startTimer() {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateTimer, 10); // Actualizar cada 10 milisegundos
    running = true;
}

// Función para pausar el cronómetro
function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
    //return difference;
}

// Función para actualizar el cronómetro
function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    minutos = Math.floor((difference/60000));
    minutos = minutos.toString().padStart(2, '0');
    segundos = Math.floor((difference - minutos*60000)/1000);
    segundos = segundos.toString().padStart(2, '0');
    milisegundos = difference - minutos*60000 - segundos*1000;
    
    milisegundosDosCifras = milisegundos/10;
    milisegundosDosCifras = Math.floor(milisegundosDosCifras);

    document.getElementById('timer').innerHTML = minutos + " : " + segundos + "." + milisegundosDosCifras;
}

// Iniciar el cronómetro al cargar la página
window.onload = startTimer;