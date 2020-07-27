const apikey ='vfzshvjlgrlEAJFuTa7Gh4GNDtq5rd9B';

let timer = document.getElementById('contador');
const btnCapturar = document.getElementById('captura');
const btnParar = document.getElementById('parar');
const iconoGrabar = document.getElementById('btngrabando');
const btnRepetir = document.getElementById('repetir');
const image = document.getElementById('gifBlock');
const video = document.getElementById('vid2');
const btnSubir = document.getElementById('subir');
const captureTitleInner = document.getElementById('captureTitleInner');
const btnCerrar = document.getElementById('cerrar');
const btnCamarita = document.getElementById('btncamarita');
const progressBar = document.getElementById('progressBar');
const captureAtRecord = document.getElementById('captureAtRecord');
const btnCancelarUp = document.getElementById('cancelarUp');
const timeMsg = document.getElementById('timeMsg');
const btnListo = document.getElementById('terminar');
const btnDescargar = document.getElementById('descargar');
const btnCopiar = document.getElementById('copiar');
const uploadingScreen = document.getElementById('uploadingScreen');
const gifPrevSmall = document.getElementById('gifPrevSmall')
const misGuifos = document.getElementById('misGuifos');

let comienza = document.querySelector(".btn_comenzar")

function comenzar(){
 document.getElementById("vista").setAttribute("class","cuadro_video") ///para ocultar y mostrar pantallas
 document.getElementById("princ").setAttribute("class","vista_video")
 btnCopiar.style.display = 'none'
 btnDescargar.style.display = 'none'
 btnListo.style.display = 'none'

getStream()}

function getStream(){
navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
    height: { max: 480 }
    }
    })
    .then(function(stream) {
    video.srcObject = stream;
    video.play()
    btnCapturar.style.display="block"
})
}

let recorder = null;

function recordGif(stream) {
    recorder = new RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
            console.log('Grabando')
        },
    });
    recorder.startRecording();
}

    btnCapturar.addEventListener('click', async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        recordGif(stream)
        btnParar.style.display = 'block'
        btnCapturar.style.display = 'none'
        let titulo =document.querySelector('.checking')  
        console.log(titulo)
        titulo.innerHTML='Capturando tu guifo' 
    })

    let blob = null
    let urlB = ""

    btnParar.addEventListener('click', async () => {        // Oculta el botón frenar
        await recorder.stopRecording();
        blob = await recorder.getBlob();
        urlB = URL.createObjectURL(blob);
        video.style.display = "none"
        image.src = urlB
        image.style.display = "block"
        btnCapturar.style.display = 'none'
        btnParar.style.display="none"
        let titulo =document.querySelector('.checking')  
        titulo.innerHTML='Vista previa' 
        let vista= document.querySelector(".previa")
        vista.style.display="block"
        vista.style.display="inline-flex"
        btnRepetir.style.display="block"
        btnSubir.style.display="block"
    })
    
   
    btnRepetir.addEventListener('click', () => {
        let titulo =document.querySelector('.checking')  
        titulo.innerHTML="Un chequeo antes de empezar" 
        btnSubir.style.display = 'none'
        btnRepetir.style.display = 'none'
        btnCapturar.style.display = 'block'
        image.style.display = "none"
        video.style.display = "block"  
        btnCerrar.style.display = 'block'
    });
   
   

    const controller = new AbortController();
    const signal = controller.signal;
   
    btnSubir.addEventListener('click', () => {
        uploadingScreen.style.display = "flex"
        btnCancelarUp.style.display = "block"
        btnSubir.style.display = 'none'
        btnRepetir.style.display = 'none'
        video.style.display = "none"
        image.style.display = "none"
        cerrar.style.display = 'block'
        let titulo =document.querySelector('.checking')  
        titulo.innerHTML="Subiendo Guifo"
        let fondo=document.querySelector(".fondo-blanco")
        fondo.style.display="block"

        let formData = new FormData();     
        formData.append("file", blob, "myGif.gif");//
        console.log(formData.get('file'))

        const options = {
            method: 'POST',
            mode: 'cors',
            body: formData
        };
   
        fetch(upload, options)
            .then(response => {
                return response.json();
            })
            .then(json => {
                const gifObject = json;
                saveGif(gifObject.data.id);
            
                const copyID = json.data.id;
                const getApiURL = `https://api.giphy.com/v1/gifs/${copyID}?api_key=${apikey}&gif_id=${copyID}`;
                const gifsafe = document.getElementById ('gifosSalvados');

                getGifURL(getApiURL);
                console.log(getApiURL)
                let titulo =document.querySelector('.checking')  
                titulo.innerHTML="Guifo Subido con Éxito"
                let fondo = document.querySelector(".fondo-blanco")
                fondo.style.display = "none"
                uploadingScreen.style.display = "none"
                btnCancelarUp.style.display = "none"
                console.log('Tu GIF fué subido exitosamente!')
                misGuifos.style.display = "grid"
                // gifPrevSmall.src = url                   ///////verificar
                mostrarSubida()
            })
            .catch(error => {
                console.log(error)
            })

    });

function mostrarSubida(){
    btnCopiar.style.display = 'block'
    btnDescargar.style.display = 'block'
    btnListo.style.display = 'block'
    image.style.display = "block"
    image.classList.add("vistaSubida");
    document.querySelector(".tituloSubida").style.display="block"
}


// Obtener URL de Gif

let createdGifURL;

function getGifURL(url) {
    useRequest(url).then(response => {
        createdGifURL = response.data.url
    })
};

 
 // Cancelar subida

 btnCancelarUp.addEventListener('click', () => {
    controller.abort();
    console.log('Subida cancelada');
    uploadingScreen.style.display = "none"
    btnCancelarUp.style.display = "none"
    uploadingScreen.style.display = "none"
    btnSubir.style.display = 'block'
    btnRepetir.style.display = 'block'
    image.style.display = "block"
    document.querySelector(".fondo-blanco").style.display="none"
    btnCopiar.style.display = 'none'
    btnDescargar.style.display = 'none'
    btnListo.style.display = 'none'
    image.style.display = "none"
    image.classList.remove("vistaSubida");
    document.querySelector(".tituloSubida").style.display="none"
    document.querySelector(".cuadro_video").style.display="none"
});

 // Copiar Url de Gif

 function copiarUrl(text) {
    const hiddenTextArea = document.createElement("textarea");
    document.body.appendChild(hiddenTextArea);
    hiddenTextArea.value = text;
    hiddenTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(hiddenTextArea);
};


 
 // Copia URL de Gif

 btnCopiar.addEventListener('click', () => {
    try {
        copiarUrl(createdGifURL)
        btnCopiar.innerHTML = 'Enlace copiado con éxito!';
    } catch (e) {
        alert('El enlace no pudo ser copiado');
    }
});



// guarda Gif en PC

btnDescargar.addEventListener('click', () => {
    invokeSaveAsDialog(blob);
});

btnListo.addEventListener('click', () => {
    btnCopiar.style.display = 'none'
    btnDescargar.style.display = 'none'
    btnListo.style.display = 'none'
    image.style.display = "none"
    image.classList.remove("vistaSubida");
    document.querySelector(".tituloSubida").style.display="none"
    document.querySelector(".cuadro_video").style.display="none"
    document.querySelector("#misGuifos").style.display="grid"
    location.reload()
});



// guarda Gifs en LocalStorage

let arrayGifs = []

function saveGif(gifID) {
    if (localStorage.getItem('arrayGifs') == null) {
        arrayGifs.push(gifID)
    } else {
        arrayGifs = localStorage.getItem('arrayGifs').split(',')
        arrayGifs.push(gifID)
    }
    localStorage.setItem('arrayGifs', arrayGifs.join())
};



 // Obtener Gifs de LocalStorage en mis gifs

 let savedGifs = localStorage.getItem('arrayGifs')
 const gifGetURL = `https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${savedGifs}`;
 const misGuifosInnerText = document.getElementById('misGuifosInnerText');

 function getMyGifs(output) {
     if (savedGifs) {
         fetch(gifGetURL)
             .then(res => {
                 return res.json()

             }).then(response => {
                 appendGif(response, output)
             })
             .catch(error => {
                 console.log(error)
             })
     } else {
         misGuifosInnerText.innerHTML = 'No hay GiFs Creados!';
     }
 };
   

// Fetch Fx

async function useRequest(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
};


function appendGif(response, output) {
    response.data.forEach(object => {
        const createdElement = document.createElement('img');
        output.appendChild(createdElement).src = object.images.fixed_height.url;
        
    })
};

function cancelar(){
    location.href="index.html"

}
btnCerrar.addEventListener('click',()=>{
    location.href="index.html"
})

 