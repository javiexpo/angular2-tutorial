/** 
 * Importamos de la libraería @angular/core los modulos
 * Component: Usado para definir el componente
 * OnInit: usado para 
 * OnInit: usado para implementar la interfaz OnInit y con ella el método ngOnInit()
 * 
 * Importamos de la librería rxjs/Rx el modulo:
 * Observable: usado para suscrubirnos a un Observable Timer
*/
import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** 
 * Definimos el componente haciendo uso del decorator @Component   
 * y los siguientes parámetros:
 * selector = define el nombre del selector CSS usado por un elemento 
 *            HTML que representa al componente  
 * template = define la plantilla HTML que renderiza el contenido en pantalla 
*/
@Component({
  selector: 'mi-app',
  templateUrl: 'app/app.template.html'
})

/**
 * Declaramos el AppComponent bajo la clase AppComponent
 * y lo exportamos para que sea accesible 
 */
export class AppComponent  implements OnInit {
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

  newProduct: Product = {
    productName: "",
    cantidad: 0
  }

  ngOnInit(): void {
    //ngOnInit es un método se ejecuta cuando el componente 
    //esta completamente instanciado

    /**
     * Instanciamos un Observable.timer cuya ejecucion tenga 
     * un retraso de 1 segundo (1000 milisegundos)
     * y se re-ejecute cada 3 segundos (3000 milisegundos)
     * y en cada ejecución llamará al método _pickRandomItems   
     * */
    /*let timer = Observable.timer(1000,3000);
    timer.subscribe(t=> {
        this._pickRandomItems();
    });*/  
  }

  constructor() {
    //this._myInterval = setInterval(this._pickRandomItems(), 3000);
  }

  addProduct():void {
    //Verificamos si el usuario ha introducido un nombre de producto
    if (this.newProduct.productName === ""){
      return;
    }
    //Verificamos si el usuario ha introducido una cantidad
    if (this.newProduct.cantidad === 0){
      return;
    }
    //Agreagmos el nuevo producto y su cantidad a la lista de productos
    this.items.push(this.newProduct);
  }

  _pickRandomItems(): void {
    //Método que determian de foram aleatoria los items 
    //que se han de mostrar en pantalla
    this.items = [];
    let itemsCount = Math.floor((Math.random() * 10) + 1);
    for (var index = 0; index < itemsCount; index++) {
      let item = this.itemsDB[Math.floor((Math.random() * 9) + 0)];
      this.items.push(item);
    }
  }
}

export class Product {
  productName: string;
  cantidad: number;
}
