import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Habilidades } from 'src/app/Model/habilidades';
import { HabilidadesService } from 'src/app/Service/habilidades.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidades : Habilidades[] = [];
  isAdmin= false;

  constructor(
    private habilidadesService : HabilidadesService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.cargarHabilidades();
   this.isAdmin = this.tokenService.isAdmin();
  }


  cargarHabilidades(): void{
    this.habilidadesService.lista().subscribe(
      data => {this.habilidades= data;
      },
      err=>{
        console.log(err);
      } 
    )
  }

  borrar(id: number): void{
 this.habilidadesService.delete(id).subscribe(
  data => {
    this.toastr.success(data.mensaje, 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });

    this.cargarHabilidades();
  },
  err =>{
    this.toastr.error(err.error.mensaje, 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
 );
  }

}
