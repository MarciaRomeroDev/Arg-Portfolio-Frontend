import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{ HttpClientModule} from '@angular/common/http';
import{ FormsModule} from '@angular/forms';

//componentes
import { NavbarComponent } from './Componentes/navbar/navbar.component';

import { SobreMiComponent } from './Componentes/sobre-mi/sobre-mi.component';
import { EditarPersonaComponent } from './Componentes/sobre-mi/editar-persona.component';
import { BannerComponent } from './Componentes/banner/banner.component';

import { EstudiosComponent } from './Componentes/estudios/estudios.component';
import { NuevoEstudioComponent } from './Componentes/estudios/nuevo-estudio.component';
import { EditarEstudiosComponent } from './Componentes/estudios/editar-estudios.component';

import { ExperienciaComponent } from './Componentes/experiencia/experiencia.component';
import { NuevaExperienciaComponent } from './Componentes/experiencia/nueva-experiencia.component';
import { EditarExperienciaComponent } from './Componentes/experiencia/editar-experiencia.component';

import { HabilidadesComponent } from './Componentes/habilidades/habilidades.component';
import { EditarHabilidadComponent } from './Componentes/habilidades/editar-habilidad.component';
import { NuevaHabilidadComponent } from './Componentes/habilidades/nueva-habilidad.component';

import { ProyectosComponent } from './Componentes/proyectos/proyectos.component';
import { NuevoProyectoComponent } from './Componentes/proyectos/nuevo-proyecto.component';
import { EditarPoryectoComponent } from './Componentes/proyectos/editar-poryecto.component';


import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';


import { IndexComponent } from './index/index.component';
import { interceptorProvider } from './interceptors/per-interceptor.service';






//External 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';






@NgModule({
  declarations: [
    AppComponent,
    SobreMiComponent,
    BannerComponent,
    EstudiosComponent,
    ExperienciaComponent,
    HabilidadesComponent,
    ProyectosComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    IndexComponent,
    NuevaExperienciaComponent,
    EditarExperienciaComponent,
    NuevoEstudioComponent,
    EditarEstudiosComponent,
    EditarHabilidadComponent,
    NuevaHabilidadComponent,
    NuevoProyectoComponent,
    EditarPoryectoComponent,
    EditarPersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), provideFirebaseApp(() => initializeApp(environment.firebase)), provideStorage(() => getStorage()), 
  
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
