import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Habilidades } from 'src/app/Model/habilidades';
import { HabilidadesService } from 'src/app/Service/habilidades.service';

@Component({
  selector: 'app-editar-habilidad',
  templateUrl: './editar-habilidad.component.html',
  styleUrls: ['./editar-habilidad.component.css']
})
export class EditarHabilidadComponent implements OnInit {

  habilidades : Habilidades = null;

  constructor(
    private habilidadesService : HabilidadesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];
    this.habilidadesService.detalle(id).subscribe(
      data => {
        this.habilidades = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });

        this.router.navigate(['/Habilidades']);
      }
    )
  }
  

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.habilidadesService.update(id, this.habilidades).subscribe(
      data => {
        this.toastr.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/Habilidades']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
    
        this.router.navigate(["/Experiencia"]);

      }
    )
  }


}
