import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/Model/experiencia';
import { ExperienciaService } from 'src/app/Service/experiencia.service';

@Component({
  selector: 'app-editar-experiencia',
  templateUrl: './editar-experiencia.component.html',
  styleUrls: ['./editar-experiencia.component.css']
})
export class EditarExperienciaComponent implements OnInit {
  
  experiencia: Experiencia = null;

  constructor(
    private experienciaService: ExperienciaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.experienciaService.detalle(id).subscribe(
      data => {
        this.experiencia = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });

       //alert("error al editar experiencia")
        this.router.navigate(['/Experiencia']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.experienciaService.update(id, this.experiencia).subscribe(
      data => {
        this.toastr.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      
        //alert("experiencia actualizada");
        this.router.navigate(['/Experiencia']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        //alert("error al actualizar la experiencia ");
        this.router.navigate(["/Experiencia"]);

      }
    )
  }



}
