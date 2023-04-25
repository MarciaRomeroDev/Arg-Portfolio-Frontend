import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estudios } from 'src/app/Model/estudios';
import { EstudiosService } from 'src/app/Service/estudios.service';

@Component({
  selector: 'app-nuevo-estudio',
  templateUrl: './nuevo-estudio.component.html',
  styleUrls: ['./nuevo-estudio.component.css']
})
export class NuevoEstudioComponent implements OnInit {

  titulo: string ='';
  fecha: string = '';
  lugar: string = '';
  descripcion: string = '';

  constructor(
    private estudiosService : EstudiosService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const estudios = new Estudios(this.titulo, this.fecha, this.lugar, this.descripcion);
    this.estudiosService.save(estudios).subscribe(
      data => {

        this.toastr.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
        this.router.navigate(['/Estudios']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });

      }
    );

  }

}
