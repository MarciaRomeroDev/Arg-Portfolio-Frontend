import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Habilidades } from 'src/app/Model/habilidades';
import { HabilidadesService } from 'src/app/Service/habilidades.service';

@Component({
  selector: 'app-nueva-habilidad',
  templateUrl: './nueva-habilidad.component.html',
  styleUrls: ['./nueva-habilidad.component.css']
})
export class NuevaHabilidadComponent implements OnInit {

  nombre : string = '';
  icono : string = '';
  progreso : number = 0 ;

  constructor(
    private habilidadesService : HabilidadesService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const habilidades = new Habilidades(this.nombre, this.icono, this.progreso);
    this.habilidadesService.save(habilidades).subscribe(
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

      }
    );

  }

}
