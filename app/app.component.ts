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
  template: `
      <h1>{{title}}</h1>
      <table>
        <thead>
          <tr>
            <td>Nombre del Producto</td>
            <td>Cantidad</td>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items">
            <td>{{item.productName}}</td>
            <td>{{item.cantidad}}</td>
          </tr>
        </tbody>
      </table>
      `

})

/**
 * Declaramos el AppComponent bajo la clase AppComponent
 * y lo exportamos para que sea accesible 
 */
export class AppComponent { 
  title = 'Mi Shopping List';
  items: Object[] = [ {productName: 'Manzanas', cantidad: 5}, 
            {productName: 'Pera', cantidad: 2},
            {productName: 'Banana', cantidad: 1},
            {productName: 'Kiwi', cantidad: 3},
            {productName: 'Melocoton', cantidad: 10}
          ];
}
