import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estudios } from 'src/app/Model/estudios';
import { EstudiosService } from 'src/app/Service/estudios.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  estudios : Estudios[] = [];
  isAdmin= false;

  constructor(
    private estudiosService : EstudiosService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.cargarEstudios();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarEstudios(): void{
    this.estudiosService.lista().subscribe(
      data => {this.estudios = data;
      },
      err=>{
        console.log(err);
      } 
    )
  }

  borrar(id: number): void{
 this.estudiosService.delete(id).subscribe(
  data => {
    this.toastr.success(data.mensaje, 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });
  
    this.cargarEstudios();
  },
  err =>{
    this.toastr.error(err.error.mensaje, 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
 );
  }


}
