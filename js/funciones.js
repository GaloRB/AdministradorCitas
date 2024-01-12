import Citas from './clases/citas.js';
import UI from './clases/ui.js';
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './selectores.js';

let editando;

// Instancia objetos 
const ui = new UI();
const administrarCitas = new Citas();


// objeto global con la información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// agrega datos al objeto de la cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

    //console.log(citaObj);
}

// valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault();

    // extrae la informaciín del objeto de citas
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando) {
        ui.imprimirAlerta('Se guardaron los cambios');

        //cambiar texto de boton
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        // pasar el objeto de la cita al modo edicion
        administrarCitas.editarCita({...citaObj });

        //quitar modo edición
        editando = false;
    } else {
        //agregar id a cita
        citaObj.id = Date.now();

        // Crear nueva cita
        administrarCitas.agregarCita({...citaObj }); /* Se crea una copia del objeto para no agrar repetido */

        ui.imprimirAlerta('Cita agregada');
    }


    //mostrar datos de cita en html
    ui.imprimirCita(administrarCitas);

    formulario.reset();

    //Reiniciar el obj
    reinciarObj();

}

// Reinicia el objeto para pasar al arreglo de citas
export function reinciarObj() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.hora = "";
    citaObj.sintomas = "";

}

//funciones de boton eliminar cita
export function eliminarCita(id) {
    //Eliminar citas
    administrarCitas.eliminaCita(id);

    //Muestra un mensaje
    ui.imprimirAlerta('Cita eliminada');

    //Refresca las citas
    ui.imprimirCita(administrarCitas);
}

//Carga los datos de la cita y el modo edicion
export function cargarEdicion(cita) {
    editando = true;

    // extrae la informaciín del objeto 
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //llena los input con los datos de la cita
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar objetoi para validar
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //cambiar texto de boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';



}