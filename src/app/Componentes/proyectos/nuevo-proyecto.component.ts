import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyectos } from 'src/app/Model/proyectos';
import { ImagenesService } from 'src/app/Service/imagenes.service';
import { ProyectosService } from 'src/app/Service/proyectos.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {
 
  titulo: string = '';
  descripcion: string = '';
  url_imagen : string = '';
  url_repositorio: string = '';
  imgSrc: string = '';
  archivoSeleccionado: File | null = null;
  

  constructor(
    private proyectosService : ProyectosService,
    private router: Router,
    private toastr: ToastrService,
    private imagenesService: ImagenesService
  ) { 
    
  }

  ngOnInit(): void {
  }
  /*
  cargarImagen(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.archivoSeleccionado = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.archivoSeleccionado);
      reader.onload = () => {
        this.url_imagen = reader.result as string;
      };
    }
  }*/
  
  cargarImagen(event: any) {
   
    this.imagenesService.cargarImagenes(event, 'proyecto' + Date.now())
    .then (url =>{
      this.url_imagen = url; // Obtener la nueva URL de imagen después de cargarla
    })
    
    console.log('ruta-iamgenes :   ' +this.url_imagen)

    const reader = new FileReader();
  reader.onload = (event: any) => {
    this.imgSrc = event.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  }
  
  onCreate(): void {
   
    console.log('url ' + this.url_imagen);
    const proyectos = new Proyectos(this.titulo, this.descripcion, this.url_imagen, this.url_repositorio);
    
    this.proyectosService.save(proyectos).subscribe(
      data => {

        this.toastr.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
        this.router.navigate(['/Proyectos']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });

      }
    );

  }
  

}
