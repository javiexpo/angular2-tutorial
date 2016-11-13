//Importamos el objeto Injectable de angular/core para poder hacer uso del Decorator
import { Injectable } from '@angular/core';

//Importamos el tipo de objeto Product el componente 
import { Product } from './app.component';

//Declaramos 
@Injectable()
export class ListService {
    //Nombre de la BD
    static DATABASE_NAME = 'shoppingListDB';
    static DATABASE_VERSION = 2;
    //Nombre del Store o Tabla de items
    static ITEMS_TABLE = 'items';

    //Objeto de IndexedDB  
    db;
    storeReady = false;

    //Mini BD de productos con sus cantidades
    itemsDB: Product[] = [
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

    //Listado de Items activos en la lista.
    items = [];  

    //Método Constructor sin parametros necesario para lograr la inyeccion e instanciamietno 
    //del servicio en los componentes donde se necesite   
    constructor() {
        //Inicializamos IndexedDB
        this.initIndexedDB();
     }

    //Método para obtener del servicio los items activos en la lista
    //Este método devuelve una Promises con lo cual podemos manejar de 
    //ser necesario peticiones asincronas   
    getItems(): Promise<Product[]> {
        //Obtenemos todos los items de la base de datos
        return Promise.resolve(this.items);
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

    //Método para aregar items a la lista de items activos
    //Este método devuelve una Promises con lo cual podemos manejar de 
    //ser necesario peticiones asincronas
    addProduct(newProduct: Product) : Promise<Product[]> {      
        //Creamos un nueva instancia del Product
        let newProd: Product = new Product();
        //Agregamos al nuevo producto, el nombre y la cantidad informada por el usuario
        newProd.productName = newProduct.productName;
        newProd.cantidad = newProduct.cantidad;

        //Agregamos el nuevo item (producto, cantidad) a la IndexedDB
        this.addProductToDB(newProd);

        this.items.push(newProd);
         
        //resolvemos la Promise retornando los items activo incluyendo el item agreagdo
        return Promise.resolve(this.items);
    }

    initIndexedDB(){
        //Obtenemos una referencia del servicio  
        var self = this;
        if (!window.indexedDB) {
            window.alert("Su navegador no soporta una versión estable de indexedDB.");
            return;
        } else {
            var request = window.indexedDB.open(ListService.DATABASE_NAME, ListService.DATABASE_VERSION);
            request.onupgradeneeded = function(event) {
                self.db = request.result;
                if(self.db != null) {
                    self.createItemsStore();
                }
            };
            request.onerror = function(event) {
              window.alert("onError" + request.error);
            };
            request.onsuccess = function(event) {
                self.db = request.result;
                self.loadAllItems();
            };
        }
    }

    createItemsStore() {
        // Creamos el Items Store, el cual funciona como una tabla para almacenar 
        //los datos de proudctos y acntidades
        var objectStore = this.db.createObjectStore(ListService.ITEMS_TABLE, { autoIncrement : true });
        objectStore.createIndex("productName", "productName", { unique: true });
        objectStore.createIndex("cantidad", "cantidad", { unique: false });
        objectStore.transaction.oncomplete = function(event) {
            this.storeReady = true;
        }
    }

    addProductToDB(newProd: Product){
        var self = this;
        // Almacenamos los valores del nuevo producto y su cantidad en el Items Store 
        var itemObjectStore = this.db.transaction(ListService.ITEMS_TABLE, "readwrite").objectStore(ListService.ITEMS_TABLE);
        var req = itemObjectStore.add(newProd);
        req.onsuccess = function(event) {
            //window.alert("addProductToDB onSuccess" + req.result);
        };

        req.onerror = function(event) {
            window.alert("addProductToDB onError" + req.error);
        };
    }

    loadAllItems() {
        var self = this;
        var itemObjectStore = self.db.transaction(ListService.ITEMS_TABLE, "readonly").objectStore(ListService.ITEMS_TABLE);
        itemObjectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
            self.items.push(cursor.value);
            cursor.continue();
          }
          else {
            //window.alert("Got all customers: " + self.items);
          }
        };
    }
}