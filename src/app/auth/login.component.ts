import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from '../Model/login-usuario';
import { AuthService } from '../Service/auth.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}

