import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/Model/experiencia';
import { ExperienciaService } from 'src/app/Service/experiencia.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {


  experiencias: Experiencia[] = [];
  isAdmin= false;


  constructor(
    private experienciaService: ExperienciaService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.cargarExperiencia();
   this.isAdmin = this.tokenService.isAdmin();
  }

  cargarExperiencia(): void{
    this.experienciaService.lista().subscribe(
      data => {this.experiencias = data;
      },
      err=>{
        console.log(err);
      } 
    )
  }

  borrar(id: number): void{
 this.experienciaService.delete(id).subscribe(
  data => {
    this.toastr.success(data.mensaje, 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });
    //alert("Experiencia borrada");
    this.cargarExperiencia();
  },
  err =>{
    this.toastr.error(err.error.mensaje, 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
    //alert("error al borrar la experiencia")
  }
 );
  }

}
