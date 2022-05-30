// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// event listeners
eventListener();
function eventListener(){
    //cuando el usuario crea un nuevo tweets
    formulario.addEventListener('submit', agregarTweet);
    // cuando el documento esta listado
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);

        crearHTML();
    });
  
}

//funciones

function agregarTweet(e){
    e.preventDefault();

    // textarea del usuario

    const tweet = document.querySelector('#tweet').value;

    // validacion del documento

    if(tweet === ''){
        mostrarError('El mensaje no puede ir vacio');
        return; // evita que ejecuten mas lineas de codigo
    }

    const tweetOb = {
        id: Date.now(),// utilizamos date al no tener una BBDD par no repetir
        tweet
    }
    // Añadiendo al Array los tweets
    tweets = [...tweets, tweetOb];
    
    // agrgar el html
    crearHTML();

    // rei9niciar el formulario

    formulario.reset();


}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

// insertar el error en el contenido

const contenido = document.querySelector('#contenido');
contenido.appendChild(mensajeError);

// Elimina la alerta de mensaje Error 3 seg
setTimeout(() =>{
    mensajeError.remove();
},3000);


}

// Muestra del listado de los tweets
function crearHTML(){

    limpiarHTML();// limpiar HTML para que no repita

    if(tweets.length > 0 ){
        tweets.forEach( tweet =>{
                // Agrgar boton de eliminar tweets
                const btnEliminar = document.createElement('a')
                btnEliminar.classList.add('borrar-tweet');
                btnEliminar.innerHTML = 'X'

                // Añadir la funcion de eliminar
                btnEliminar.onclick = () =>{
                    borrarTweet(tweet.id);
                }


            // crear el texto
            const li = document.createElement('li');

            //Añadir texto
            li.innerText = tweet.tweet;
            // Asignar el boton
            li.appendChild(btnEliminar);

            //Agregarlo al HTML 
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}
// Agrega los tweets a los twreets actuales a local storage

    function sincronizarStorage(){
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }
//Eliminar Tweet
function borrarTweet(id) {
 tweets = tweets.filter(tweet => tweet.id !== id)

 crearHTML();
}


// Limpiar html

function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}