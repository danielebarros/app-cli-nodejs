require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,

} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

console.clear();


const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();


    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }



    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                //Crear opcion
                const desc = await leerInput('Descripcion: ');
                console.log(desc);
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();   // listar todas las tareas            
                break;

            case '3':
                tareas.listarPendientesCompletadas() //listar completadas
                break;

            case '4':
                tareas.listarPendientesCompletadas(false) //listar pendientes
                break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                console.log(ids);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const borrarConfirm = await confirmar('Estas seguro?');
                    if (borrarConfirm) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente!')
                    }
                };
                break;
        }
        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}




main();