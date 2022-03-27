const bookmarksContainer = document.getElementById("listaMarcadores");
const detallesContainer = document.getElementById("detallesMarcadores");
const listaEtiquetasContainer = document.getElementById("listaEtiquetas");
const ulEtiquetas = document.querySelector("#ulEtiquetas")
const ulBookmark = document.querySelector('#ulBookmarks')
const tituloInputDetalles = document.querySelector('#titulo');
const plataformaInputDetalles = document.querySelector('#plataforma');
const generoInputDetalles = document.querySelector('#genero');
const btnAddBookmarks = document.querySelector('.btnAddBookmarks')
const btnAddEtiquetas = document.querySelector('.btnAddEtiquetas')
const btnEditarElemento = document.querySelectorAll('.btnList')
const inputDetallesBookmark = document.querySelector(".inputDetallesBookmark");
const guardarBookmark = document.querySelector('#guardarBookmark')
const inputDetallesEtiqueta = document.querySelector(".inputDetallesEtiqueta");
const nombreEtiquetaInputDetalles = document.querySelector('#nombreEtiqueta');
const guardarEtiqueta = document.querySelector('#guardarEtiqueta')
const zonaDrop = document.querySelectorAll('.zonaDrop');
const bookmarkFiltradosContainer = document.querySelector('.bookmarksFiltrados');



let listaEtiquetas = []

let listaBookmarks = [
    {
        titulo: "Interstellar",
        plataforma: ["netflix", "hbo"],
        genero: ["aventura", "drama", "ciencia-ficción"]
    },
    {
        titulo: "Luca",
        plataforma: ["disney plus"],
        genero: ["animacion", "aventura"]
    },
    {
        titulo: "it",
        plataforma: ["disney plus"],
        genero: ["aventura", "drama"]
    }

]
btnAddBookmarks.addEventListener("click", crearBookmark)
btnAddEtiquetas.addEventListener('click', crearEtiqueta)
mostrarBookmarks(listaBookmarks);
zonaDrop.forEach(zona => {

    zona.addEventListener('drop', handleDrop)
    zona.addEventListener('dragover', allowDrop)
})

function crearEtiqueta() {

    mostrarDetallesEtiqueta(true)
    nombreEtiquetaInputDetalles.focus()
    guardarEtiqueta.addEventListener('click', addEtiquetaIndividual)
}
function addEtiquetaIndividual() {
    let etiquetaBuscar = nombreEtiquetaInputDetalles.value.trim().toLocaleLowerCase()
    if (!etiquetaBuscar) return
    if (!listaEtiquetas.some((element) => etiquetaBuscar === element.trim().toLocaleLowerCase())) {
        listaEtiquetas.push(etiquetaBuscar)
        mensajeConfirmacion()
    } else {

        mensajeEtiquetaExistente()
    }
    mostrarEtiquetas(listaEtiquetas)
    mostrarDetallesEtiqueta(false)



}

function crearBookmark() {
    mostrarDetallesBookmark(true)
    tituloInputDetalles.focus()
    guardarBookmark.addEventListener("click", actualizarListaBookmarks)
}
function actualizarListaBookmarks() {
    let nuevoBookmark = leerDatosInputBookmark()
    listaBookmarks.push(nuevoBookmark)
    mostrarBookmarks(listaBookmarks)
    tituloInputDetalles.value = ''
    generoInputDetalles.value = ''
    plataformaInputDetalles.value = ''
    actualizarListaEtiquetas()

    mensajeConfirmacion()
    mostrarDetallesBookmark(false)


}
function actualizarListaEtiquetas() {
    listaBookmarks.forEach((bookmark) => {

        let arrayPlataformas = bookmark.plataforma
        arrayPlataformas.forEach((etiqueta) => {
            let etiquetaBuscar = etiqueta.trim().toLocaleLowerCase()

            if (!listaEtiquetas.some((element) => etiquetaBuscar === element.trim().toLocaleLowerCase())) {
                listaEtiquetas.push(etiquetaBuscar)
            }
        })
        let arrayGenero = bookmark.genero
        arrayGenero.forEach((etiqueta) => {
            let etiquetaBuscar = etiqueta.trim().toLocaleLowerCase()

            if (!listaEtiquetas.some((element) => etiquetaBuscar === element.trim().toLocaleLowerCase())) {
                listaEtiquetas.push(etiquetaBuscar)
            }
        })
    })
    mostrarEtiquetas(listaEtiquetas);


}

function leerDatosInputBookmark() {
    console.log(plataformaInputDetalles.value.split(','))
    return { titulo: tituloInputDetalles.value, plataforma: [...plataformaInputDetalles.value.split(',')], genero: [...generoInputDetalles.value.split(',')] }
}

function mostrarDetalles(ev) {
    const bookmarkFiltradosContainer = document.querySelector('.bookmarksFiltrados');
    bookmarkFiltradosContainer.innerHTML = ''
    const tituloBuscar = ev.target.id.trim().toLowerCase()
    const resultadoBusqueda = listaBookmarks.filter((objeto) => objeto.titulo.trim().toLowerCase() === tituloBuscar)[0]
    const { titulo, plataforma, genero } = resultadoBusqueda
    const container = document.createElement('div')
    container.className = 'detallesMarcadorIndividual';
    const spanTit = document.createElement('span')
    container.appendChild(spanTit)
    const divEtiquetas = document.createElement('div')
    container.appendChild(divEtiquetas)

    divEtiquetas.className = 'etiquetasDetallesIndividual'
    spanTit.className = 'tituloDetallesInidividual'
    spanTit.innerText = titulo
    plataforma.forEach((etiqueta) => {
        let span = document.createElement('span')
        span.innerText = etiqueta
        divEtiquetas.appendChild(span)
    })
    genero.forEach((etiqueta) => {
        let span = document.createElement('span')
        span.innerText = etiqueta
        divEtiquetas.appendChild(span)
    })
    bookmarkFiltradosContainer.appendChild(container)
    console.log(titulo, plataforma, genero)

}
function filtrarEtiqueta(ev) {
    let resultadoBookmarks = listaBookmarks.filter((objeto) => {
        return objeto.plataforma.includes(ev.target.id) || objeto.genero.includes(ev.target.id)
    })
    bookmarkFiltradosContainer.innerHTML = ''
    resultadoBookmarks.forEach((bookmark) => {
        const { titulo, plataforma, genero } = bookmark
        const container = document.createElement('div')
        container.className = 'detallesMarcadorIndividual';

        const spanTit = document.createElement('span')
        container.appendChild(spanTit)
        const divEtiquetas = document.createElement('div')
        container.appendChild(divEtiquetas)

        divEtiquetas.className = 'etiquetasDetallesIndividual'
        spanTit.className = 'tituloDetallesInidividual'
        spanTit.innerText = titulo
        plataforma.forEach((etiqueta) => {
            let span = document.createElement('span')
            span.innerText = etiqueta
            divEtiquetas.appendChild(span)
        })
        genero.forEach((etiqueta) => {
            let span = document.createElement('span')
            span.innerText = etiqueta
            divEtiquetas.appendChild(span)
        })
        bookmarkFiltradosContainer.appendChild(container)
    })
    console.log(resultadoBookmarks)
    console.log(ev.target.id)
}
function editarBookmarkIndividual(ev) {
    ev.stopPropagation()
    const tituloID = (ev.target.parentElement.id).trim().toLowerCase()
    let resultadoFiltro = (listaBookmarks.filter((objeto) => objeto.titulo.trim().toLowerCase() === tituloID))[0]
    const { titulo, plataforma, genero } = resultadoFiltro
    tituloInputDetalles.focus()
    tituloInputDetalles.value = titulo
    plataformaInputDetalles.value = [...plataforma]
    generoInputDetalles.value = [...genero]
    console.log(resultadoFiltro)
    mostrarDetallesBookmark(true)

    guardarBookmark.addEventListener('click', () => {
        eliminarDeListaBookmarks(titulo)
        listaBookmarks.push(leerDatosInputBookmark())
        mostrarBookmarks(listaBookmarks)
        eliminarDelDom(titulo)
        mensajeConfirmacion()
    })

}
function mostrarBookmarks(bookmarks) {
    ulBookmark.innerHTML = ''

    actualizarListaEtiquetas()

    bookmarks.forEach((bookm) => {
        let li = document.createElement('li');
        li.draggable = true
        li.id = bookm.titulo

        li.style.cursor = 'move'
        li.addEventListener('click', mostrarDetalles)
        li.addEventListener('dragstart', handleDragStart)
        li.innerText = bookm.titulo;
        let btnEditar = creaBton()
        li.appendChild(btnEditar)
        btnEditar.addEventListener('click', editarBookmarkIndividual)
        ulBookmark.appendChild(li);

    });
}
function mensajeConfirmacion() {
    console.log('Añadir un mensaje de confirmacion al guardar,  como append a detalles')
}
function editarEtiquetaIndividual(ev) {
    ev.stopPropagation()
    const etiqueta = ev.target.parentElement.id

    console.log('Editar', etiqueta)
    mostrarDetallesEtiqueta(true)
    nombreEtiquetaInputDetalles.value = etiqueta
    guardarEtiqueta.addEventListener('click', () => {
        eliminarDeListaEtiquetas(etiqueta)
        addEtiquetaIndividual()
        mensajeConfirmacion()
    })






}
function mostrarEtiquetas(etiquetas) {
    ulEtiquetas.innerHTML = ""
    etiquetas.forEach((etiqueta) => {
        let li = document.createElement('li');
        li.id = etiqueta
        li.draggable = true
        li.addEventListener('click', filtrarEtiqueta)
        li.addEventListener('dragstart', handleDragStart)

        li.style.cursor = 'move'

        li.innerText = etiqueta;
        let btnEditar = creaBton()
        btnEditar.addEventListener('click', editarEtiquetaIndividual)
        li.appendChild(btnEditar)

        ulEtiquetas.appendChild(li);
    });
}
function creaBton() {
    let btn = document.createElement('button')
    btn.classList = 'btnEdit btnList'
    return btn
}
function mostrarDetallesEtiqueta(mostrar) {
    inputDetallesEtiqueta.style.display = mostrar ? "block" : 'none';
}
function mostrarDetallesBookmark(mostrar) {
    inputDetallesBookmark.style.display = mostrar ? "block" : 'none';

}
function mensajeEtiquetaExistente() {
    console.error('La etiqueta ya existe')
}
function eliminarDeListaEtiquetas(etiqueta) {
    let idBuscar = etiqueta.trim().toLocaleLowerCase();
    let indexBorrar = listaEtiquetas.indexOf(idBuscar);
    listaEtiquetas.splice(indexBorrar, 1)

    mostrarEtiquetas(listaEtiquetas)
}
function eliminarDeListaBookmarks(titulo) {
    titulo.trim().toLowerCase()
    listaBookmarks = listaBookmarks.filter((objeto) => objeto.titulo.trim().toLowerCase() !== titulo)

    console.log(listaBookmarks)
}
/*FUNCIONES PARA EL DRAG AND DROP*/
function allowDrop(ev) {
    ev.preventDefault()
}
function handleDragStart(ev) {
    ev.dataTransfer.setData('datos', ev.target.id)

}

function handleDrop(ev) {
    ev.preventDefault();
    let id = ev.dataTransfer.getData('datos')
    let ele = document.getElementById(id);
    ele.parentElement.removeChild(ele)
    eliminarDeListaEtiquetas(id)
    eliminarDeListaBookmarks(id)
}
function eliminarDelDom(id) {
    let ele = document.getElementById(id);
    ele.parentElement.removeChild(ele)
    console.log("elemnto borrado", id)
}
