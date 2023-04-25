import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/Model/persona';
import { PersonaService } from 'src/app/Service/persona.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  persona: Persona = null;
  isAdmin = false;

  constructor(
    private personaService: PersonaService,
    private toastr: ToastrService,
    private tokenService: TokenService

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
