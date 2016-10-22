/** 
 * Importamos de la librería @angular/core los módulos
 * Component: Usado para definir el componente
 * OnInit: usado para implementar la interfaz OnInit y 
 * con ella el método ngOnInit()
 * 
 * Importamos de la librería rxjs/Rx el modulo:
 * Observable: usado para instanciar y suscribirnos a un 
 * Observable Timer
*/
import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** 
 * Definimos el componente haciendo uso del decorator @Component   
 * y los siguientes parámetros:
 * selector = define el nombre del selector CSS usado por un elemento 
 *            HTML que representa al componente  
 * template = define la plantilla HTML que renderiza el contenido en pantalla
 * templateUrl = ruta al fichero .html donde se define el template, esta 
 * propiedad reemplaza a la propiedad template   
*/
@Component({
  selector: 'mi-app',
  templateUrl: 'app/app.template.html'
})

/**
 * Declaramos el AppComponent bajo la clase AppComponent
 * y lo exportamos para que sea accesible 
 */
export class AppComponent  implements OnInit{ 
  //Titulo del Componente
  title = 'Mi Shopping List';
  //Mini BD de productos con sus cantidades
  itemsDB: Object[] = [
            {productName: 'Manzanas', cantidad: 5}, 
            {productName: 'Pera', cantidad: 2},
            {productName: 'Banana', cantidad: 1},
            {productName: 'Kiwi', cantidad: 3},
            {productName: 'Melocoton', cantidad: 10}, 
            {productName: 'Patatas', cantidad: 10}, 
            {productName: 'Jamón', cantidad: 2},
            {productName: 'Queso', cantidad: 2},
            {productName: 'Tomates', cantidad: 5},
            {productName: 'Pimientos', cantidad: 1}
          ];

  //Array de Items que se han de mostrar en pantalla 
  items: Object[] = [];

  _myInterval = null;

  ngOnInit(): void {
    //ngOnInit es un método que se ejecuta cuando el componente 
    //esta completamente instanciado

    /**
     * Instanciamos un Observable.timer cuya ejecución tenga 
     * un retraso de 1 segundo (1000 milisegundos)
     * y se re-ejecute cada 3 segundos (3000 milisegundos)
     * y en cada ejecución llamará al método _pickRandomItems   
     * */
    let timer = Observable.timer(1000,3000);
    timer.subscribe(t=> {
        this._pickRandomItems();
    });  
  }

  constructor() {
    //Este método cosntructor permite instanciar al Componente
  }

  _pickRandomItems(): void {
    //Método que determina de forma aleatoria los items 
    //que se han de mostrar en pantalla y llena la propiedad items
    this.items = [];
    let itemsCount = Math.floor((Math.random() * 10) + 1);
    for (var index = 0; index < itemsCount; index++) {
      let item = this.itemsDB[Math.floor((Math.random() * 9) + 0)];
      this.items.push(item);
    }
  }
}
