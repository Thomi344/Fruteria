// -----  Declaro la lista de frutas (Ejercicio 1)----- //
ListaFrutas =  [
    { id: 1, nombre: "Ananá", precio: 220, rutaImagen: "img/anana.jpg" },
    { id: 2, nombre: "Arándano", precio: 180, rutaImagen: "img/arandano.jpg" },
    { id: 3, nombre: "Banana", precio: 90, rutaImagen: "img/banana.jpg" },
    { id: 4, nombre: "Frambuesa", precio: 210, rutaImagen: "img/frambuesa.png" },
    { id: 5, nombre: "Frutilla", precio: 170, rutaImagen: "img/frutilla.jpg" },
    { id: 6, nombre: "Kiwi", precio: 190, rutaImagen: "img/kiwi.jpg" },
    { id: 7, nombre: "Mandarina", precio: 120, rutaImagen: "img/mandarina.jpg" },
    { id: 8, nombre: "Manzana", precio: 130, rutaImagen: "img/manzana.jpg" },
    { id: 9, nombre: "Naranja", precio: 110, rutaImagen: "img/naranja.jpg" },
    { id: 10, nombre: "Pera", precio: 140, rutaImagen: "img/pera.jpg" },
    { id: 11, nombre: "Pomelo Amarillo", precio: 160, rutaImagen: "img/pomelo-amarillo.jpg" },
    { id: 12, nombre: "Pomelo Rojo", precio: 170, rutaImagen: "img/pomelo-rojo.jpg" },
    { id: 13, nombre: "Sandía", precio: 250, rutaImagen: "img/sandia.jpg" }
];


// =============================== Llamar etiquetas =============================== //

let contenedorProductos =document.getElementById("contenedor-productos");
let inputBuscar = document.getElementById("barra-busqueda");
let itemCarrito = document.getElementById("item-carrito");
let totalDiv = document.getElementById("precio-total");
let contador = document.getElementById("contador-carrito");
let eliminarCarrito = document.getElementById("seccion-carrito")
// -----  "Escuchamos" los datos ingresados por el input ----- //
inputBuscar.addEventListener("keyup",filtrarProductos);


// =============================== Imprimir Datos Alumno (Ejercicio 2)=============================== //

function imprimirDatosAlumno(){
    // -----  Defino el objeto con mis datos ----- //
    let Alumno  = {
        dni : "47012087",
        nombre : "Dylan Thomas",
        apellido : "Valenzuela"
    };
    // -----  Muestro por consola el objeto en String ----- //
    console.log(`Nombre: ${Alumno.dni}, Apellido: ${Alumno.apellido}, DNI: ${Alumno.dni}`)
    // -----  // Insertando el nombre y apellido en el <nav> -----//
    document.addEventListener("DOMContentLoaded", () => {
    let nav = document.getElementById("navegacion");
    if (nav) {
        nav.innerHTML = `<strong>${Alumno.nombre} ${Alumno.apellido}</strong>`;
    }
    });
};

// =============================== Imprimir Productos en pantalla (Ejercicio 3) =============================== //
function ImprimirProductos(array){
    let htmlProductos = "";
    // -----  Recorro el array dado como parametro ----- //
    array.forEach(producto => {
        // -----  Para cada objeto del mismo le doy un espacio en el html(una carta propia) ----- //
        htmlProductos +=`
        <div class="card-producto">
            <img src="${producto.rutaImagen}" alt="">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarCarritos(${producto.id})">Agregar al carrito</button>
        </div>
    `;});
    // -----  Lo sumo al html ----- //
    contenedorProductos.innerHTML = htmlProductos;
};
    

// =============================== Imprimir Datos Alumno (Ejercicio 4)=============================== //
function filtrarProductos(){

    let valorInput = inputBuscar.value;
    // -----  Guarda productos con el mismo titulo en una array nueva ----- //
    let listaProductosFiltrados = ListaFrutas.filter(producto =>producto.nombre.toLowerCase().includes(valorInput.toLowerCase()));
    ImprimirProductos(listaProductosFiltrados);
};

// =============================== Agregar al carrito (Ejercicio 5) =============================== //
let carrito = obtenerCarritoStorage();
if(!carrito){carrito = [];};


// ----- Creo la funcion Agregar Carritos que recibe como parametro una ID  ----- //
function agregarCarritos(id){ 
    let objetoEncontrado = ListaFrutas.find(producto => producto.id === id);
    if (!objetoEncontrado) return;

    // -----Clonamos el producto  -----
    let copiaProducto = {
        id: objetoEncontrado.id,
        nombre: objetoEncontrado.nombre,
        precio: objetoEncontrado.precio
    };

    carrito.push(copiaProducto);

    guardarCarritoStorage(carrito);
    mostrarCarrito(carrito);
    eliminarElementoPorId("no-elementos-carrito");
};

// ----- Creo la funcion que muestre el carrito en su espacio correspondiente,recibe como parametro una array  ----- //
function mostrarCarrito(array){
    let htmlCarrito = "";
    let total = 0;
    // -----  Para cada objeto del mismo le doy un bloque en el html ----- //
    array.forEach(producto => {
        htmlCarrito += `
            <li class="bloque-item">
                <p class="nombre-item">${producto.nombre} - ${producto.precio}</p>
                <button class="boton-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </li>        
        `;
        total += producto.precio;
    });

    itemCarrito.innerHTML = htmlCarrito;
// =============================== (Ejercicio 7) =============================== //
    // -- Mostrar total abajo a la derecha --//
    if(totalDiv){
        // -----  Si el largo del array es mayor a 0,en total pongo el precio total acumulado en el bucle,sino dejo vacio ----- //
        totalDiv.textContent = array.length>0? `Total: $${total}`:"";
    };
    // ----- Actualizar contador en el header -----//
    if(contador){
        contador.textContent = array.length;
    }
    eliminarElementoPorId("no-elementos-carrito");

    
};

// -----  Creo la funcion eliminar Productos  ----- //
function eliminarProducto(id){

    //----- Que recorre la lista con un for clasico y con splice elimino el elemento para luego cerrar el bucle ya que no se necesita seguir recorriendo -----//
    for(let i = 0;i< carrito.length;i++){
        if (carrito[i].id === id){
            carrito.splice(i,1);
            break
        };
    };
    guardarCarritoStorage(carrito);
    mostrarCarrito(carrito);
    
    if(carrito.length===0){
        alert("No hay Productos")
    }
};

// -----  Creo una funcion adicion para eliminar el mensaje "No hay elementos en el carrito."(ya que al agregar elementos si los hay) ----- //
function eliminarElementoPorId(id) {
    let elemento = document.getElementById(id);
    if (elemento) {
        elemento.remove();
}};

// =============================== Almacena los productos del carrito en localStorage. (Ejercicio 6) =============================== //
//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarritoStorage() 
{
    // Recupera el carrito almacenado como string en el LocalStorage
    let carritoObtenido =localStorage.getItem("carrito");
    // Convierte el string a un objeto JavaScript (array)
    let carritoParseado = JSON.parse(carritoObtenido);
    return carritoParseado;
};

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarritoStorage(carrito) 
{
    let carritoTransformadoString =JSON.stringify(carrito);
    localStorage.setItem("carrito",carritoTransformadoString);

}

// =============================== Botones de Ordenamiento (Ejercicio 8) =============================== //
// --- Eventos para ordenar --- //
//--- Ordena la copia de la lista de frutas alfabéticamente por nombre y muestra los productos ordenados --- //
document.getElementById("ordenar-nombre").addEventListener("click", () => {
    //--- (Buscado en documentacion)localeCompare compara dos cadenas de texto según el orden alfabético local (útil para ordenar nombres con acentos o caracteres especiales) ---//
    let ordenadosPorNombre = ListaFrutas.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    ImprimirProductos(ordenadosPorNombre);
});
//--- Ordena la copia de la lista de frutas por precio de menor a mayor y muestra los productos ordenados ---//
document.getElementById("ordenar-precio").addEventListener("click", () => {
    let ordenadosPorPrecio = ListaFrutas.slice().sort((a, b) => a.precio - b.precio);
    ImprimirProductos(ordenadosPorPrecio);
});


// =============================== Vaciar (Ejercicio 9) =============================== //
function limpiarCarrito() {
    // --- Elimina el carrito de localStorage ---
    localStorage.removeItem("carrito");
    // --- Vacía el array en memoria ---
    carrito = [];
    // --- Actualiza la vista del carrito ---
    mostrarCarrito(carrito);
    // --- Mensaje en consola y alerta ---
    alert("El carrito ha sido vaciado.");
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("vaciar-carrito").addEventListener("click", limpiarCarrito);
});
// =============================== Inicializar funciones ===============================
function init(){
    imprimirDatosAlumno();
    ImprimirProductos(ListaFrutas);
    mostrarCarrito(carrito);
};

init();