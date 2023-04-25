import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Model/persona';
import { PersonaService } from 'src/app/Service/persona.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  persona: Persona= {
    nombre: '',
    apellido: '',
    foto_perfil: '',
    descripcion: ''
  };
  
  isAdmin = false;

  constructor(
    private personaService : PersonaService,
    private tokenService: TokenService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.cargarPersonas();
    this.isAdmin = this.tokenService.isAdmin();
   
  }
  
  cargarPersonas(): void {
 
    this.personaService.detalle(1).subscribe(
      data => {
        this.persona = data;
      },
      err => {
        console.log(err);
      })
  }

}
