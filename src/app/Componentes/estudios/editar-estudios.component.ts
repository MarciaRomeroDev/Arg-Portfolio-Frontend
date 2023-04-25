import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estudios } from 'src/app/Model/estudios';
import { EstudiosService } from 'src/app/Service/estudios.service';

@Component({
  selector: 'app-editar-estudios',
  templateUrl: './editar-estudios.component.html',
  styleUrls: ['./editar-estudios.component.css']
})
export class EditarEstudiosComponent implements OnInit {

  estudios: Estudios = null;

  constructor(
    private estudiosService : EstudiosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];
    this.estudiosService.detalle(id).subscribe(
      data => {
        this.estudios = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });

        this.router.navigate(['/Estudios']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.estudiosService.update(id, this.estudios).subscribe(
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
      
        this.router.navigate(["/Estudios"]);

      }
    )

  }
}
