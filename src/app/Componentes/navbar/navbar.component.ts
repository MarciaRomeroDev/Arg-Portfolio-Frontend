import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLogged= false;
  isAdmin = false;

  

  constructor(
    private tokenService: TokenService,
    ) { }

  ngOnInit(): void {
   this.isLogged = this.tokenService.isLogged();
   this.isAdmin = this.tokenService.isAdmin();
  }

  onLogOut(): void{
    this.tokenService.logOut();
  }


}
