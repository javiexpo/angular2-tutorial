/** 
 * Importamos el modulo Component de la librería  
 * @angular/core
*/
import { Component } from '@angular/core';

/** 
 * Definimos el componente haciendo uso del decorator @Component   
 * y los siguientes parámetros:
 * selector = define el nombre del selector CSS usado por un elemento 
 *            HTML que representa al componente  
 * template = define la plantilla HTML que renderiza el contenido en pantalla 
*/
@Component({
  selector: 'mi-app',
  template: '<h1>Este es mi primer componente Angular 2</h1>'
})

/**
 * Declaramos el AppComponent bajo la clase AppComponent
 * y lo exportamos para que sea accesible 
 */
export class AppComponent { }
