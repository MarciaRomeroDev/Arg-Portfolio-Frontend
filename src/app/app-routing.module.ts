import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './auth/registro.component';
import { BannerComponent } from './Componentes/banner/banner.component';
import { EstudiosComponent } from './Componentes/estudios/estudios.component';
import { ExperienciaComponent } from './Componentes/experiencia/experiencia.component';
import { HabilidadesComponent } from './Componentes/habilidades/habilidades.component';
import { LoginComponent } from './auth/login.component';
import { ProyectosComponent } from './Componentes/proyectos/proyectos.component';
import { SobreMiComponent } from './Componentes/sobre-mi/sobre-mi.component';
import { IndexComponent } from './index/index.component';
import { PerGuardService } from './guards/per-guard.service';
import { LoginGuard} from './guards/login.guard';
import { NuevaExperienciaComponent } from './Componentes/experiencia/nueva-experiencia.component';
import { EditarExperienciaComponent } from './Componentes/experiencia/editar-experiencia.component';
import { EditarEstudiosComponent } from './Componentes/estudios/editar-estudios.component';
import { NuevoEstudioComponent } from './Componentes/estudios/nuevo-estudio.component';
import { NuevaHabilidadComponent } from './Componentes/habilidades/nueva-habilidad.component';
import { EditarHabilidadComponent } from './Componentes/habilidades/editar-habilidad.component';
import { NuevoProyectoComponent } from './Componentes/proyectos/nuevo-proyecto.component';
import { EditarPoryectoComponent } from './Componentes/proyectos/editar-poryecto.component';
import { EditarPersonaComponent } from './Componentes/sobre-mi/editar-persona.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';





const routes: Routes = [

  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},

  // se debe estar logeado para poder acceder a estos componentes CanActivate, para todo lo que son botones de edicion crud dejamos solo el 'admin'
  
  //NAVBAR 
  { path: 'Navbar', component: NavbarComponent,canActivate: [PerGuardService], data: { expectedRol: ['admin', 'user'] } },
  
 
  //SOBRE-MI 
  { path: 'Inicio', component: BannerComponent, canActivate: [PerGuardService], data: { expectedRol: ['admin', 'user'] }},
  { path: 'Sobre-mi', component: SobreMiComponent,canActivate: [PerGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'editarPersona/:id', component: EditarPersonaComponent,canActivate: [PerGuardService], data: { expectedRol: ['admin'] } },

  //ESTUDIOS 
  { path: 'Estudios', component: EstudiosComponent,canActivate: [PerGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'nuevoEstudio', component: NuevoEstudioComponent,canActivate: [PerGuardService], data: { expectedRol: ['admin'] } },
  { path: 'editarEstudio/:id', component: EditarEstudiosComponent, canActivate: [PerGuardService], data: { expectedRol: ['admin'] } },
  

  //EXPEREINCIA 
  { path: 'Experiencia', component: ExperienciaComponent,canActivate: [PerGuardService], data: { expectedRol: ['admin', 'user'] }},
  { path: 'nuevaExperiencia', component: NuevaExperienciaComponent,canActivate: [PerGuardService], data: { expectedRol: ['admin'] } },
  { path: 'editarExperiencia/:id', component: EditarExperienciaComponent, canActivate: [PerGuardService], data: { expectedRol: ['admin'] } },

//HABILIDADES
  { path: 'Habilidades', component: HabilidadesComponent, canActivate: [PerGuardService], data: { expectedRol: ['admin', 'user'] }},
  { path: 'nuevaHabilidad', component: NuevaHabilidadComponent,canActivate: [PerGuardService], data: { expectedRol: ['admin'] } },
  { path: 'editarHabilidad/:id', component: EditarHabilidadComponent, canActivate: [PerGuardService], data: { expectedRol: ['admin'] } },


  //PROYECTOS
  { path: 'Proyectos', component: ProyectosComponent, canActivate: [PerGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'nuevoProyecto', component: NuevoProyectoComponent,canActivate: [PerGuardService], data: { expectedRol: ['admin'] } },
  { path: 'editarProyecto/:id', component: EditarPoryectoComponent, canActivate: [PerGuardService], data: { expectedRol: ['admin'] } },

  //CONTACTO
 

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
