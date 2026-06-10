import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { CpfPipe } from './shared/pipes/cpf.pipe';
import { TelefonePipe } from './shared/pipes/telefone.pipe';

// import do MATERIAL

@NgModule({
  declarations: [
    AppComponent,
    ClienteListComponent,
    ClienteFormComponent,
    CpfPipe,
    TelefonePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([])),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
