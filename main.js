
//Funcion encargada de que el nombre 
function esNombreValido(nombre) {
    return /^[a-zA-Z\s]+$/.test(nombre);
}

//Conjunto de Preguntas y Respuestas
let preguntas = ['¿Cuánto es 2 + 2?',
    '¿De qué color es el cielo?',
    '¿Quién es la persona más sabia del curso de JS?',
    '7+2=X-1',
    '¿El lenguaje Dart es conocido por su uso en el desarrollo de qué campo?',
    '¿4 + 4?',
    '¿Quién del curso tuvo que sacar al perro a pasear para evitar un regaño?'
];

let respuestas = ['4',
    'celeste',
    'pepe',
    '10',
    'movil',
    '8',
    'samuel'
];

if (confirm("Este simulador va a preguntarle la cantidad de estudiantes a evaluar y realizará preguntas aleatorias, se aprueba con un mínimo de dos ¿Desea continuar?")) {


    let estudiantes = [];
    let cantidad = Number(prompt('¿Qué cantidad de estudiantes son?'));

    //Si no es numerica la cantidad de estudiantes que nos indiquen lo mantendremos en este bucle
    while (isNaN(cantidad)) {
        alert('Por favor, ingrese un numero valido');
        cantidad = Number(prompt('¿Qué cantidad de estudiantes son?'));
    }

    //Este for incrementara segun la cantidad de estudiantes. Si la funcion que se encarga de verificar el nombre devuelve un true (.test devuelve true o false segun los caracteres usados)
    //Entoncees, si devuelve true pasara a tomarlo como nombre valido y lo asignara, de lo contrario seguira false y se manntendra en el bucle.
    for (let i = 0; i < cantidad; i++) {
        let nombreValido = false;

        while (!nombreValido) {
            let nombre = prompt('Nombre del estudiante número: ' + (i + 1));
            if (esNombreValido(nombre)) {
                estudiantes[i] = nombre;
                nombreValido = true;
            } else {
                alert('Por favor, introduce un nombre válido (solo letras y espacios).');
            }
        }
    }

    //Una funcion cuyos parametros son "El nombre del estudiante, el cual se ira iterando en el array que iremos completando con nombres desde la pagina"
    //Las preguntas y respuestas, mismas que toma desde los arrays internos, por otro lado el numero de preguntas se asigna internamente.
    function examen(nombre, preguntas, respuestas, numPreguntas) {
        let puntaje = 0;
        alert(`Empiezan las preguntas para el estudiante: ${nombre}`);

        //El operador spread nos permitira copiar el array original sin afectar al mismo.
        let preguntasRestantes = [...preguntas];
        let respuestasRestantes = [...respuestas];

        //En el caso de que en algun momento asignemos mas preguntas de las que hay tendremos este alert.
        for (let x = 0; x < numPreguntas; x++) {
            if (preguntasRestantes.length === 0) {
                alert('No hay más preguntas disponibles.');
                break;
            }

            //IndiceAleatorio: Genera un indice redondeado segun el largo de las preguntas restantes
            let indiceAleatorio = Math.floor(Math.random() * preguntasRestantes.length);
            //El indice que generamos se lo asignamos a las preguntas para que seleccione una aleatorio
            let preguntaSeleccionada = preguntasRestantes[indiceAleatorio];
            //El indice que generamos se lo asignamos a la respuesta para que seleccione una aleatorio. Las preguntas y las respuestas tienen la misma posicion, por lo cual coincidne
            //Ademas pasamos la respuesta ingresada a LowerCase para que no afecte como escriba el usuario
            let respuestaCorrecta = respuestasRestantes[indiceAleatorio].toLowerCase();

            let respuesta = prompt(preguntaSeleccionada).toLowerCase();

            //Utilizamos trim para evitar errores de espacios
            if (respuesta.trim() === respuestaCorrecta.trim()) {
                alert('¡Acertaste, sumas un punto!');
                puntaje++;
            } else {
                alert('Estuviste cerca... pero no. No sumas puntos');

            }

            //Borramos la pregunta y respuesta para que no se repitan (aunque en cada iteracion se van a resetear.)
            preguntasRestantes.splice(indiceAleatorio, 1);
            respuestasRestantes.splice(indiceAleatorio, 1);
        }

        return puntaje;
    }


    document.write(`<h1 style="text-align: center;">RESULTADOS DEL EXAMEN:</h1>`);
    for (let j = 0; j < cantidad; j++) {
        //Momento en el que segun la cantidad llamaremos a la funcion eexamen, enviandole los nombres de los estudiantes, preguntas, respuestas y cantidad de preguntas a tomar
        let puntaje = examen(estudiantes[j], preguntas, respuestas, 4);
        //El objetivo por eel momento esta establecido een el 50% de las preguntas asignadas, se modificara en el caso de que la institucion lo pida
        let objetivo = puntaje / 2
        //Cada estudiante aprobado tendra un true
        let aprobado = false


        if (puntaje == 0) {
            document.write(`<h2>El estudiante ${estudiantes[j]} obtuvo un ${puntaje}</h2>`);
            document.write(`<h3 style="color:red">No paso el examen`);
            aprobado = false
            document.write(`<hr>`);
        }
        else if (puntaje == 1) {
            document.write(`<h2>El estudiante ${estudiantes[j]} logró una cantidad de ${puntaje} punto</h2>`);
            if (objetivo < objetivo) {
                document.write(`<h3 style="color:red;">No paso el examen`);
                aprobado = false
                document.write(`<hr>`);
            }
            else {
                document.write(`<h3 style="color:green;">Aprobó el examen`);
                aprobado = true
                document.write(`<hr>`);
            }
        }
        else {
            document.write(`<h2>El estudiante ${estudiantes[j]} logró una cantidad de ${puntaje} puntos</h2>`);
            if (objetivo < objetivo) {
                document.write(`<h3 style="color:red;">No paso el examen`);
                aprobado = false
                document.write(`<hr>`);
            }
            else {
                document.write(`<h3 style="color:green;">Aprobó el examen`);
                aprobado = true
                document.write(`<hr>`);
            }
        }
    }

} else {
    alert("Vuelva cuando decida evaluar a los alumnos. Nota: Recuerde que deben pasar de a uno ¡solo tenemos la PC 14 disponible!");
}


