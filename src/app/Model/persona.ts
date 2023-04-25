export class Persona {
    id?: number;
    nombre: string;
    apellido: string;
    foto_perfil: string;
    descripcion: string;
   

 constructor(nombre: string, apellido:string, foto_perfil: string, descripcion: string){
    this.nombre= nombre;
    this.apellido= apellido;
    this.foto_perfil= foto_perfil;
    this.descripcion= descripcion;
  
 }

}
