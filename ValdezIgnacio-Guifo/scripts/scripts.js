console.log("Todo bien por ahora");

function menuCambio(id_Div,nombre) {
  if(id_Div.className == nombre + "Oculto") {
      id_Div.className = nombre + "Visible";
  } else {
      id_Div.className = nombre + "Oculto";
  }
}

function cambiarModoDark(){
  let clase = document.querySelector(".dark");
  console.log(clase);
  if(clase == null){
    var dark = document.body;
    dark.classList.toggle("dark");
    const imagen = document.querySelector('.logo');
    imagen.src = './images/gifOF_logo_dark.png';
    const lupa = document.querySelector('.lupa');
    lupa.src = "./images/lupa_light.svg";
  }
}  

function cambiarModoLight() {
  let clase = document.querySelector("body");
  console.log (clase);
  clase.classList.remove("dark");
  const imagen = document.querySelector('.logo');
  imagen.src = './images/gifOF_logo.png';
  const lupa = document.querySelector('.lupa');
  lupa.src = "./images/lupa.svg";
}

function buscar(){
    let busqueda= document.getElementById("search-input");
    console.log(busqueda);
    let q=busqueda.value;
    console.log(q);
    let cuadro =document.getElementById("cuadro-inf");
    cuadro.classList.remove("cuadro-visible");
    cuadro.classList.add("cuadro-oculto");
    let resultado = document.querySelector('h3');
    resultado.innerHTML= q + " (resultados)";
    search(q);
    console.log(search)
}

const apiKey = "vsJ7mRViHwlfqYUZ4t8D9K0dxpQw9bbM";
const url = "http://api.giphy.com/v1/gifs/";     
const upload= `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;


function search(q){      

  const path = `${url}search?q=&api_key=${apiKey}&q=${q}`;    
    fetch(path).then(function (res) {
      return res.json ();
    }).then(function (json) {
      console.log (json.data [0].images.fixed_width.url);
      const resultsEl = document.getElementById ('results');
      let resultsHTML = ' ';
      json.data.forEach (function(obj) {
      console.log (obj.images.fixed_width);    
      resultsHTML += `<img 
                      src="${obj.images.fixed_width.url}" 
                      width="${obj.images.fixed_width.width}"
                      height="${obj.images.fixed_width.height}"
                      alt="${obj.title}">`;
      })
      resultsEl.innerHTML = resultsHTML;
    }).catch (function(err) {
    console.log (err.message);
  })
}



function tendencias (){
    const path =`${url}trending?q=&api_key=${apiKey}&limit=20`;
    fetch(path).then(function (res) {
        return res.json ()
      }).then(function (json) {
        console.log (json.data [0].images.fixed_width.url)
        const resultsEl = document.getElementById ('results')
        let resultsHTML = ' '
        json.data.forEach (function(obj) {
        console.log (obj.images.fixed_width)    
        resultsHTML += `<img src="${obj.images.fixed_width.url}">`
        })
        resultsEl.innerHTML = resultsHTML
      }).catch (function(err) {
      console.log (err.message);
    })
}
///////////////////////
function visibles(){
let estado = document.getElementById("search-input")
estado.addEventListener("keypress", letra => {
        let boton =document.getElementById("submit");
        boton.classList.remove("boton_buscar");
        boton.classList.add("boton_buscaract");
        let cuadro =document.getElementById("cuadro-inf");
        cuadro.classList.remove("cuadro-oculto");
        cuadro.classList.add("cuadro-visible");
    })
}

/////////////////////////////////////////////////////sugerencias//////////////////////////////////

function busquedatend(k,id){
const pathsu = `${url}search?q=&api_key=${apiKey}&limit=1&q=${k}`;
fetch(pathsu).then(function (res) {
    return res.json()
}).then(function (json) {
    console.log (json.data[0].images.fixed_width.url)
    const resultsEl = document.getElementById (id)
    let resultsHTML = ' '
   json.data.forEach (function(obj){
       console.log (obj)      
     resultsHTML += `<img src="${obj.images.fixed_width.url}">`
    })
    resultsEl.innerHTML = resultsHTML
}).catch (function(err) {
  console.log (err.message)
})
}
/////////////////////////////////////////////////////llamados de los gifos//////////////////////////////////////////////

function busquedapal(k,palab){
  const pathsd = `${url}search?q=&api_key=${apiKey}&limit=20&q=${k}`;
  fetch(pathsd).then(function (res) {
      return res.json()
  }).then(function (json) {
      console.log (json.data[0].images.fixed_width.url)
      const resultsEl = document.getElementById ('results')
      let resultsHTML = ' '
     json.data.forEach (function(obj){
         console.log (obj)      
       resultsHTML += `<img src="${obj.images.fixed_width.url}">`
      })
      resultsEl.innerHTML = resultsHTML
  }).catch (function(err) {
    console.log (err.message)
  })
  let resu = document.querySelector('h3')
  resu.innerHTML=k
  let cuadro =document.getElementById("cuadro-inf");
  cuadro.classList.remove("cuadro-visible");
  cuadro.classList.add("cuadro-oculto");
  }

function lanzadera(){
  visibles();
  tendencias();
  busquedatend('soccer','unicorn');
  busquedatend('avengers','jonh');
  busquedatend('sailor mercury','sailor');
  busquedatend('starwars','five');
}

/////////////////////////////////////////////video///////////////////////////////////


function ocultarCreacion(){
  let oculto = document.getElementById("principal")
  oculto.style.display="none"

  /*btnCopiar.style.display = 'none'
  btnDescargar.style.display = 'none'
  btnListo.style.display = 'none'
  image.style.display = "none"
  image.classList.remove("vistaSubida");
  document.querySelector(".tituloSubida").style.display="none"
  document.querySelector(".cuadro_video").style.display="none"*/
}