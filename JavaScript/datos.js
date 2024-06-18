const apiUrl = 'http://localhost:3000/data';

async function crearRegistro() {
    let confirmar = false;
    let jugador = {};
    let minutos = 0;
    let segundos = 0;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        confirmar = confirm("¿Crear nuevo registro?");
        if (confirmar) {
            jugador.nombre = prompt("Ingresar nuevo nombre: ");
            jugador.respuestasCorrectas = Number(prompt("Ingresar cantidad de respuestas correctas: "));
            minutos = parseInt(prompt("Ingresar minutos: "));
            segundos = parseFloat(prompt("Ingresar segundos: "));
            segundos = Number(segundos.toFixed(3));
            jugador.tiempo = minutos * 60000 + segundos * 1000;
            jugador.posicion = 0;

            console.log(jugador);

            data.push(jugador);
            guardarDatos(data);

            //Se agrega un pequeño retraso para asegurarnos de que se accedan a los datos ya modificados
            setTimeout(() => {
                cargarRegistros()
            }, 500);
        }
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }

}

// Función para cargar datos del servidor

async function cargarRegistros() {
    try {
        const apiUrl = 'http://localhost:3000/data';
        const response = await fetch(apiUrl);
        const data = await response.json();
        datosPosicion = document.getElementById("datosPosicion");
        datosNombre = document.getElementById("datosNombre");
        datosCorrectas = document.getElementById("datosCorrectas");
        datosTiempo = document.getElementById("datosTiempo");
        let mensajePosicion = "";
        let mensajeNombre = "";
        let mensajeCorrectas = "";
        let mensajeTiempo = "";
        data.forEach(element => {
            mensajePosicion += `<div>${element.posicion}</div>`;
            mensajeNombre += `<div>${element.nombre}</div>`;
            mensajeCorrectas += `<div>${element.respuestasCorrectas}</div>`;
            let minutos = Math.floor((element.tiempo / 60000));
            let segundos = Math.floor((element.tiempo - minutos * 60000) / 1000);
            let milisegundos = element.tiempo - minutos * 60000 - segundos * 1000;
            minutos = minutos.toString().padStart(2, '0');
            segundos = segundos.toString().padStart(2, '0');
            milisegundos = milisegundos.toString().padStart(3, '0');
            mensajeTiempo += `<div>${minutos}' ${segundos}.${milisegundos}"</div>`;
        });
        datosPosicion.innerHTML = mensajePosicion;
        datosNombre.innerHTML = mensajeNombre;
        datosCorrectas.innerHTML = mensajeCorrectas;
        datosTiempo.innerHTML = mensajeTiempo;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Función para guardar datos en el servidor

async function guardarDatos(data) {

    //Ordena los datos antes de guardarlos

    data.sort((a, b) => {
        if (b.respuestasCorrectas !== a.respuestasCorrectas) {
            return b.respuestasCorrectas - a.respuestasCorrectas;
        } else return a.tiempo - b.tiempo;
    })

    //Luego de ordenar los datos les asigna el valor de la posición

    data.forEach((item, index) => {
        item.posicion = index + 1;
    });
    try {
        const apiUrl = 'http://localhost:3000/data';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Error al guardar los datos: ' + response.statusText);
        }
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}

async function modificarRegistro() {
    let confirmar = false;
    let jugador = {};
    let nombre = "";
    let respuestasCorrectas = 0;
    let tiempo = 0;
    let minutos = 0;
    let segundos = 0;
    ID = prompt("Ingresar la posición del jugador:");
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        jugador = data[ID - 1];
        confirmar = confirm("¿modificar datos de " + jugador.nombre + " en posición " + jugador.posicion + "?");
        if (confirmar) {
            confirmar = false;
            confirmar = confirm("¿modificar nombre de " + jugador.nombre + "?");
            if (confirmar) {
                nombre = prompt("Ingresar nuevo nombre: ");
                data[ID - 1].nombre = nombre;
            }
            confirmar = false;
            confirmar = confirm("¿modificar cantidad de correctas? el dato actual es " + jugador.respuestasCorrectas);
            if (confirmar) {
                respuestasCorrectas = prompt("Ingresar nueva cantidad de correctas: ");
                data[ID - 1].respuestasCorrectas = respuestasCorrectas;
            }
            confirmar = false;
            confirmar = confirm("¿modificar tiempo? el dato actual es " + jugador.tiempo + "ms");
            if (confirmar) {
                minutos = parseInt(prompt("Ingresar minutos: "));
                segundos = parseFloat(prompt("Ingresar segundos: "));
                segundos = Number(segundos.toFixed(3));
                tiempo = minutos * 60000 + segundos * 1000;
                data[ID - 1].tiempo = tiempo;
                guardarDatos(data);
                //Se agrega un pequeño retraso para asegurarnos de que se accedan a los datos ya modificados
                setTimeout(() => {
                    cargarRegistros()
                }, 500);
            }
        }
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

async function borrarDatos() {
    let confirmacion = false;
    confirmacion = confirm("Se borrarán todos los datos, estás seguro?")
    if (confirmacion) {
        const data = [];
        guardarDatos(data);
        //Se agrega un pequeño retraso para asegurarnos de que se accedan a los datos ya modificados
        setTimeout(() => {
            cargarRegistros()
        }, 500);
    }
}

async function actualizarRanking(jugador) {

    //--- recupera los datos guardados en data.json

    try {
        const response = await fetch(apiUrl);
        data = await response.json();
        data.push(jugador);
        guardarDatos(data);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

async function borrarRegistro() {
    let confirmar = false;
    let jugador = {};
    let nombre = "";
    let respuestasCorrectas = 0;
    let tiempo = 0;
    ID = prompt("Ingresar la posición del jugador: ");
    try {
        const response = await fetch(apiUrl);
        data = await response.json();
        data[ID - 1];
        confirmar = confirm("¿eliminar datos de " + data[ID - 1].nombre + " en posición " + data[ID - 1].posicion + "?")
        if (confirmar) data.splice(ID - 1, 1);
        guardarDatos(data);
        //Se agrega un pequeño retraso para asegurarnos de que se accedan a los datos ya modificados
        setTimeout(() => {
            cargarRegistros()
        }, 500);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}