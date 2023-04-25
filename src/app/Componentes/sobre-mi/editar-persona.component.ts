import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/Model/persona';
import { ImagenesService } from 'src/app/Service/imagenes.service';
import { PersonaService } from 'src/app/Service/persona.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

  persona: Persona = null;
  imgSrc: string = '';
  archivoSeleccionado: File | null = null;


  constructor(
    private personasService : PersonaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr : ToastrService,
    private imagenesService : ImagenesService
  
  ) { 
  }
  

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.personasService.detalle(id).subscribe(
      data => {
        this.persona = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/Sobre-mi']);
      }
    )
  }
  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.personasService.update(id, this.persona).subscribe(
      data => {
        this.toastr.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
  
        this.router.navigate(['/Sobre-mi']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
       
        this.router.navigate(["/Sobre-mi"]);

      }
    )
  }
  
  cargarImagen(event : any) {

   
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgSrc = event.target.result;
    }
  
    this.imagenesService.cargarImagenes(event, 'perfil')
    .then ( url => {      

      this.persona.foto_perfil = url; // Obtener la nueva URL de imagen después de cargarla
      console.log ('foto-perfil_: ' + this.persona.foto_perfil);

     
      reader.readAsDataURL(event.target.files[0]);
      
    });
   
  }
  
 

}
