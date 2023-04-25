import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

 

  constructor( private storage : Storage) { 
  }
  

  public async cargarImagenes(event : any, name: any){
    const archivo = event.target.files[0];
   
    const imagenRef = ref(this.storage, `imagenes-url/`+ name )
    console.log('nombre: '+ name)
   await uploadBytes(imagenRef, archivo).catch(error => console.log(error))

     return this.obtenerImagen(name); // Pasamos el nombre de la imagen recién cargada como parámetro a la función obtenerImagen()
  }

  


 async obtenerImagen(name: string){
    const imagenRef = ref(this.storage, `imagenes-url/${name}`); //buscamos la imagen específica
  const url =  await  getDownloadURL(imagenRef)
      console.log('url images: '+ url)
      return url;
    
  }

}
