function cerrarVentana(){
    window.close();
}

function generarOrdenPreguntas(cantidad){
    let arrayNumerosPreguntas = [];
    let num = 0;
    if(cantidad > preguntas.length) cantidad = preguntas.length;
    for (let i = 0; i < cantidad; i++){
            do{
                num = Math.floor(Math.random()*preguntas.length);
                coincidencia = false;
                for(let j of arrayNumerosPreguntas){
                    if(j == num) {
                            coincidencia = true;
                            break;
                    }
                }
            }while(coincidencia);
            arrayNumerosPreguntas.push(num);    
    }
    return arrayNumerosPreguntas;
}

let arrayNumerosPreguntas = generarOrdenPreguntas(10);

//console.log(arrayNumerosPreguntas);

function select_id(id) {
    return document.getElementById(id);
}

function style(id) {
   return document.getElementById(id).style;
}

    let basePreguntas = [];
    let botonCorrespondiente = [
        select_id("btn1"),
        select_id("btn2"),
        select_id("btn3"),
        select_id("btn4")
    ];

    let posiblesRespuestas = []; 

    let index = 0;
    let respuestasCorrectas = 0;
    let respuestasIncorrectas = 0;


    function escogerPreguntas() {
        //let aleatorio = Math.random();
        //let n = Math.floor(aleatorio * preguntas.length);
        //console.log(n);
        // console.log(preguntas.length);
        // console.log(aleatorio);
        
        //console.log(arrayNumerosPreguntas);
        //console.log(arrayNumerosPreguntas[index]);
        //console.log(index);

        basePreguntas = preguntas[arrayNumerosPreguntas[index]];
        index += 1;

        //console.log(i);
        //select_id("categoria").innerHTML = basePreguntas.categoria;
        select_id("pregunta").innerHTML = basePreguntas.pregunta;
        select_id("imagen").setAttribute("src",  "url(./images/back\ to\ the\ future.JPG)");

        //basePreguntas.imagen = "./images/back\ to\ the\ future.JPG";
        
        if (basePreguntas.imagen) {
            style("imagen").heigth = "auto";
            style("imagen").width = "100%";
            style("imagen").objectFit = basePreguntas.objectFit;
        } else {
            style("imagen").heigth = 0;
            style("imagen").width = 0;
        }
        select_id("btn1").innerHTML = basePreguntas.respuesta;
        select_id("btn2").innerHTML = basePreguntas.incorrecta1;
        select_id("btn3").innerHTML = basePreguntas.incorrecta2;
        select_id("btn4").innerHTML = basePreguntas.incorrecta3;
    
        //En este segmento se desordenan las respuestas en los botones

        posiblesRespuestas = [
            basePreguntas.respuesta,
            basePreguntas.incorrecta1,
            basePreguntas.incorrecta2,
            basePreguntas.incorrecta3
        ];
        posiblesRespuestas.sort(() => Math.random() - 0.5);
        select_id("btn1").innerHTML = posiblesRespuestas[0];
        select_id("btn2").innerHTML = posiblesRespuestas[1];
        select_id("btn3").innerHTML = posiblesRespuestas[2];
        select_id("btn4").innerHTML = posiblesRespuestas[3];
        //console.log(posiblesRespuestas);
    }
    
    let suspenderBotones = false;

    function oprimirBoton(i) {
        if (suspenderBotones == true) {
            return;
        }
        suspenderBotones = true;
        if (posiblesRespuestas[i] == basePreguntas.respuesta) {
            botonCorrespondiente[i].style.background = "lightgreen";
            respuestasCorrectas += 1;
        } else {
            botonCorrespondiente[i].style.background = "red";
            respuestasIncorrectas += 1;
        }
        setTimeout(() => {
            
            if(index == arrayNumerosPreguntas.length){

                pauseTimer();
                
                //terminar programa, mostrar resultados

                const body = document.getElementById("body");
                const contenedor = document.getElementById("contenedor");
                body.removeChild(contenedor);
                body.innerHTML = `<div class = "mensaje">¡¡Gracias por participar en la trivia!! ¡¡Recordá visitarnos en nuestro local!!</div>
                                <div id="resultadoFinal">
                                        <span class ="respuesta">Estos son tus resultados:</span><br>
                                        <span class ="respuesta">Correctas</span>: ${respuestasCorrectas}<br>
                                        <span class ="respuesta">Incorrectas</span>: ${respuestasIncorrectas}<br>
                                        <span class ="respuesta">Tiempo</span>: ${minutes}:${seconds}:${centiseconds}<br><br>
                                        <button class = "btnSalir" onclick="cerrarVentana()">Cerrar</button>
                                    </div>`;
            }
            else{

                //reiniciar botones una vez que se contestó la pregunta

                    for (const btn of botonCorrespondiente) {
                        btn.style.background = "skyblue";
                    }
                    escogerPreguntas(index);
                    suspenderBotones = false;
            }
        }, 2000);
    }

    escogerPreguntas(index);
