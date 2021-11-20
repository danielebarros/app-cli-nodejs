const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        //Obtiene el listado de tareas mediante el key de cada una
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea); // agrega al arreglo listado cada una de las tareas
            // por cada una de las keys
        })
        return listado; //Retorno el listado
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }


    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, id) => {
            const idx = `${id + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;

            console.log(`${idx}.- ${desc} ==>> ${estado}`);
        })
    }

    listarPendientesCompletadas(completadas = true) {
        let contador = 1
        this.listadoArr.map((tarea, id) => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;

            if (completadas === true) {
                if (completadoEn) {
                    console.log(`${contador.toString().green}${'.-'.green} ${desc} ==>> ${estado}`);
                    contador += 1;
                }
            } else {
                if (!completadoEn) {
                    console.log(`${contador.toString().green}${'.-'.green} ${desc} ==>> ${estado}`);
                    contador += 1;
                }
            }

        })
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;