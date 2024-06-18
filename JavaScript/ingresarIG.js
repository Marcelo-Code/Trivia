let iGExistente = false;
let ranking = [];
let nombreJugadorValido = false;
let nombreJugadorepetido = false;

function validarIG(nombreJugador) {

    // Expresión regular para validar el nombre de usuario de Instagram

    const condiciones = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    return condiciones.test(nombreJugador);
}

async function cargar() {
    const apiUrl = 'http://localhost:3000/data';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        ranking = [...data];

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

async function tomarIG() {
    await cargar();
    let nombreJugador = document.getElementById('ingresarIG').value
    nombreJugador = nombreJugador.toLowerCase();
    nombreJugadorValido = validarIG(nombreJugador);
    nombreJugadorepetido = false;

    ranking.forEach(elemento => {
        if (elemento.nombre === nombreJugador) {
            nombreJugadorepetido = true;
        }
    })

    if ((nombreJugadorValido == true) && (nombreJugadorepetido == false)) {
        window.open("./pages/trivia.html", "_blank");
        localStorage.setItem("nombreJugador", nombreJugador);
    } else {
        if (nombreJugadorValido == false) alert("Instagram inválido, volvé a ingresar");
        if (nombreJugadorepetido == true) alert("Esta cuenta ya figura en nuestro ranking");
    }
}