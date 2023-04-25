export class Habilidades {
    id ?: number;
    nombre : string;
    icono : string;
    progreso : number;

    constructor (nombre: string, icono: string, progreso: number){
        this.nombre = nombre;
        this.icono = icono;
        this.progreso = progreso;
    }

}
