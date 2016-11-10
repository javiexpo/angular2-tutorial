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
import { ListService } from './app.service';

/** 
 * Definimos el componente haciendo uso del decorator @Component   
 * y los siguientes parámetros:
 * selector = define el nombre del selector CSS usado por un elemento 
 *            HTML que representa al componente  
 * template = define la plantilla HTML que renderiza el contenido en pantalla 
*/
@Component({
  selector: 'mi-app',
  templateUrl: 'app/app.template.html',
  //Con la porpiedad providers inyectamos los servicios que usa este componete 
  providers: [ListService]
})

/**
 * Declaramos el AppComponent bajo la clase AppComponent
 * y lo exportamos para que sea accesible 
 */
export class AppComponent  implements OnInit {
  //Titulo del Componente
  title = 'Mi Shopping List';
  
  //Array de Items que se han de mostrar en pantalla 
  items: Product[] = [];

  _myInterval = null;

  newProduct: Product = {
    productName: "",
    cantidad: 0
  }

  ngOnInit(): void {
    //ngOnInit es un método se ejecuta cuando el componente 
    //esta completamente instanciado

    this.listService.getItems().then(items => this.items = items);

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

  //Usamos los parámetros del contrucytor del componente para
  // instanciar el o los servicios 
  constructor(private listService: ListService) {
    
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
    
    this.listService.addProduct(this.newProduct).then(items => {
      this.items = items
      this.newProduct.cantidad = 0;
      this.newProduct.productName = "";
    });
  }
  
}

export class Product {
  productName: string;
  cantidad: number;
}
