export class Proyectos {
  id ?: number;
  titulo: string;
  descripcion: string;
  url_imagen: string;
  url_repositorio: string;

  constructor (titulo: string, descripcion: string, url_imagen: string, url_repositorio: string ){
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.url_imagen = url_imagen;
    this.url_repositorio = url_repositorio;
  }
}
