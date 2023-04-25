import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/Model/experiencia';
import { ExperienciaService } from 'src/app/Service/experiencia.service';

@Component({
  selector: 'app-nueva-experiencia',
  templateUrl: './nueva-experiencia.component.html',
  styleUrls: ['./nueva-experiencia.component.css']
})
export class NuevaExperienciaComponent implements OnInit {

  titulo: string ='';
  fecha: string = '';
  lugar: string = '';
  descripcion: string = '';

  constructor(
    private experienciaService: ExperienciaService,
    private router: Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const experiencia= new Experiencia(this.titulo, this.fecha, this.lugar, this.descripcion);
    this.experienciaService.save(experiencia).subscribe(
      data => {

        this.toastr.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
        //alert("Experiencia creada");
        this.router.navigate(['/Experiencia']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });

       // alert("Error al crear la experiencia");
      }
    );

  }
  
}
