// tus-scripts.js

function mostrarContenedor(contenedor) {
    // Ocultar todos los contenedores
    $('.container-content').hide();
    
    // Mostrar el contenedor seleccionado
    $('#contenedor-' + contenedor).show();
  }

// scripts.js

function mostrarContenedor(contenedor) {
    // Ocultar todos los contenedores
    $('.container-content').hide();
    
    // Mostrar el contenedor seleccionado
    $('#contenedor-' + contenedor).show();
}


function descargarJSON() {
    // Convertir datos a formato JSON
    const datosJSON = JSON.stringify(datos);
  
    // Crear un objeto Blob
    const blob = new Blob([datosJSON], { type: 'application/json' });
  
    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'datos.json';
  
    // Simular clic en el enlace
    document.body.appendChild(link);
    link.click();
  
    // Limpiar después de la descarga
    document.body.removeChild(link);
  }
  

// scripts.js

let datos = []; // Almacena los datos

function guardarDatos() {
  // Obtener valores del formulario
  let asignatura = document.getElementById("asignatura").value;
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let descripcion = document.getElementById("descripcion").value;
  let estado = document.getElementById("estado").checked;

  // Crear un objeto con los datos
  let nuevoDato = {
    asignatura: asignatura,
    fecha: fecha,
    hora: hora,
    descripcion: descripcion,
    estado: estado
  };

  // Agregar el nuevo dato al array
  datos.push(nuevoDato);

  // Limpiar el formulario
  document.getElementById("formulario-agregar").reset();

  // Actualizar la tabla de vista
  actualizarTabla();
    $('.container-content').hide();
    
    // Mostrar el contenedor seleccionado
    $('#contenedor-' + 'vista').show();
}

function actualizarTabla() {
    // Obtener la referencia a la tabla
    let tabla = document.getElementById("tabla-datos");
  
    // Limpiar la tabla
    tabla.innerHTML = "";
  
    // Iterar sobre los datos y agregar filas a la tabla
    datos.forEach((dato, index) => {
      let fila = tabla.insertRow();
      let celdaAsignatura = fila.insertCell(0);
      let celdaFecha = fila.insertCell(1);
      let celdaHora = fila.insertCell(2);
      let celdaDescripcion = fila.insertCell(3);
      let celdaEstado = fila.insertCell(4);
      let celdaAcciones = fila.insertCell(5);
  
      celdaAsignatura.innerHTML = dato.asignatura;
      celdaFecha.innerHTML = dato.fecha;
      celdaHora.innerHTML = dato.hora;
      celdaDescripcion.innerHTML = dato.descripcion;
      
      // Cambiar el texto en función del estado
      celdaEstado.innerHTML = dato.estado ? 'Completada' : 'Pendiente';
  
      // Botones de acciones (editar y eliminar)
      let btnEditar = document.createElement("button");
      btnEditar.className = "btn btn-warning btn-sm";
      btnEditar.innerHTML = "Editar";
      btnEditar.onclick = function () {
        editarDato(index);
      };
  
      let btnEliminar = document.createElement("button");
      btnEliminar.className = "btn btn-danger btn-sm";
      btnEliminar.innerHTML = "Eliminar";
      btnEliminar.onclick = function () {
        eliminarDato(index);
      };
  
      celdaAcciones.appendChild(btnEditar);
      celdaAcciones.appendChild(btnEliminar);
    });
  }
  

function editarDato(index) {
  // Lógica para editar un dato, por ejemplo, cargar los valores en el formulario de agregar
  let dato = datos[index];
  document.getElementById("asignatura").value = dato.asignatura;
  document.getElementById("fecha").value = dato.fecha;
  document.getElementById("hora").value = dato.hora;
  document.getElementById("descripcion").value = dato.descripcion;
  document.getElementById("estado").checked = dato.estado;

  // Eliminar el dato original
  datos.splice(index, 1);

  // Actualizar la tabla de vista
  actualizarTabla();
  // Ocultar el contenedor de vista
  $('.container-content').hide();

  // Mostrar el contenedor de home
  $('#contenedor-home').show();
}

function eliminarDato(index) {
  // Lógica para eliminar un dato
  datos.splice(index, 1);

  // Actualizar la tabla de vista
  actualizarTabla();
}

// Al cargar la página, inicializa la tabla de vista (puedes cargar datos existentes aquí si los tienes)
actualizarTabla();
function cargarArchivoJSON(event) {
    const archivo = event.target.files[0];
  
    if (archivo) {
      const lector = new FileReader();
  
      lector.onload = function (e) {
        try {
          const datosCargados = JSON.parse(e.target.result);
          // Aquí puedes procesar los datos cargados como desees
          // Por ejemplo, podrías reemplazar los datos actuales con los cargados
          datos = datosCargados;
          // Actualizar la tabla de vista
          actualizarTabla();
        } catch (error) {
          console.error('Error al cargar el archivo JSON:', error);
        }
      };
  
      lector.readAsText(archivo);
    }
    // Ocultar todos los contenedores
    $('.container-content').hide();
    
    // Mostrar el contenedor seleccionado
    $('#contenedor-' + 'vista').show();
  }
function seleccionarArchivo() {
document.getElementById('inputFile').click();
}