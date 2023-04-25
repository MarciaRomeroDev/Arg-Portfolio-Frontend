import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyectos } from 'src/app/Model/proyectos';
import { ImagenesService } from 'src/app/Service/imagenes.service';
import { ProyectosService } from 'src/app/Service/proyectos.service';

@Component({
  selector: 'app-editar-poryecto',
  templateUrl: './editar-poryecto.component.html',
  styleUrls: ['./editar-poryecto.component.css']
})
export class EditarPoryectoComponent implements OnInit {
  proyectos : Proyectos = null;
  imgSrc: string = '';
  archivoSeleccionado: File | null = null;

  constructor(
    private proyectosService : ProyectosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr : ToastrService,
    private imgenesService : ImagenesService
  ) {
   }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.proyectosService.detalle(id).subscribe(
      data => {
        this.proyectos = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/Proyectos']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.proyectosService.update(id, this.proyectos).subscribe(
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
    
        this.router.navigate(["/Proyectos"]);

      }
    )
  }
  cargarImagen(event : any){
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgSrc = event.target.result;
    }

     this.imgenesService.cargarImagenes(event, 'proyecto')
     .then(url =>{
      this.proyectos.url_imagen = url;
      reader.readAsDataURL(event.target.files[0]);
    
     })

  

}
}
