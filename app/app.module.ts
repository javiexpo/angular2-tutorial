/*
Con la sentencia import, importamos el NgModule del @angular/core 
el cual contiene  los componemtes funcionales necesarios para una 
aplicación Angular y también importamos BrowserModule del @angular/platform-browser
el cual es necesario si nuestra aplicación se ejecuta en un Browser.  
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';

/**Importamos el modulo FormsModule */
import { FormsModule } from '@angular/forms';

/*
Haciendo uso del decorator @NgModule declaramos un módulo y en el parámetro array
"imports"" inyectamos los módulos de los cuales depende nuestra app, en este caso el modulo 
BrowserModule
 */
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})

/*Definimos la clase AppModule y la exportamos para que sea accesible*/
export class AppModule { }
