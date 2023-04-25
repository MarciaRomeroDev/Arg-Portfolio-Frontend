import { Component, OnInit } from '@angular/core';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
 

  nombreUsuario: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getUserName();

 
  }
}
