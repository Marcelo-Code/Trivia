// Variables para el cronómetro
let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let minutes;
let seconds;
let centiseconds;

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
    minutes = Math.floor((difference/1000)/60);
    minutes = minutes.toString().padStart(2, '0');
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    seconds = seconds.toString().padStart(2, '0');
    centiseconds = Math.floor((difference % 1000) / 10);
    centiseconds = centiseconds.toString().padStart(2, '0');

    // Formatear los centisegundos para tener siempre dos dígitos
    // centiseconds = centiseconds < 10 ? "0" + centiseconds : centiseconds;

    document.getElementById('timer').innerHTML = minutes + " : " + seconds + "." + centiseconds;
}

// Iniciar el cronómetro al cargar la página
window.onload = startTimer;