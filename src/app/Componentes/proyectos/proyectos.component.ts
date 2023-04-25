import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyectos } from 'src/app/Model/proyectos';
import { ProyectosService } from 'src/app/Service/proyectos.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos : Proyectos[] = [];
  isAdmin = false;

  constructor(
    private proyectosService : ProyectosService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarProyectos(): void{
    
    this.proyectosService.lista().subscribe(
      data => {this.proyectos = data;
      },
      err=>{
        console.log(err);
      } 
    )
  }

  borrar(id: number): void{
 this.proyectosService.delete(id).subscribe(
  data => {
    this.toastr.success(data.mensaje, 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });
    this.cargarProyectos();
  },
  err =>{
    this.toastr.error(err.error.mensaje, 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });

  }
 );
  }

}
