//Importamos el objeto Injectable de angular/core para poder hacer uso del Decorator
import { Injectable } from '@angular/core';

//Importamos el tipo de objeto Product el componente 
import { Product } from './app.component';

//Declaramos 
@Injectable()
export class ListService {
    //Nombre de la BD
    static DATABASE_NAME = 'shoppingListDB';
    //Vrsión de la Base da datos
    static DATABASE_VERSION = 2;
    //Nombre del Store o Tabla de items
    static ITEMS_TABLE = 'items';

    //Objeto de IndexedDB  
    db;

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
        //Agregamos el nuevo item (producto, cantidad) al array de Items 
        this.items.push(newProd);
         
        //resolvemos la Promise retornando los items activo incluyendo el item agreagdo
        return Promise.resolve(this.items);
    }

    initIndexedDB(){
        //Obtenemos una referencia del servicio  
        var self = this;
        //Verificamos si el Browser en el que se ejecuta la aplicacion soporta IndexedDB
        if (!window.indexedDB) {
            //En caso de que no soporte lo notificamos con alert al usuario
            window.alert("Su navegador no soporta una versión estable de indexedDB.");
            return;
        } else {
            //En caso de que el Browser si soporte IndexedBD creamos/instaciamos nuestra BD 
            //con el método open pasandole el nombre y la versión de la misma
            var request = window.indexedDB.open(ListService.DATABASE_NAME, ListService.DATABASE_VERSION);
            //Definimos un callback del evemto onupgradeneeded para saber cuando esta lista 
            //la BD para craer el o los Store necesarios     
            request.onupgradeneeded = function(event) {
                self.db = request.result;
                if(self.db != null) {
                    //Llamamos al método para crear el o los Stores
                    self.createItemsStore();
                }
            };
            //Definimos un callback del evento onerror para saber si ha ocurrido algun error y 
            //notificarlo al usario con un alert
            request.onerror = function(event) {
              window.alert("onError" + request.error);
            };
            //Definimos un callback del evento onsuccess para saber que hemos instanciado la BD correctamente 
            request.onsuccess = function(event) {
                self.db = request.result;
                //Llamamos la método para leer todos los items (Productos y Cantidades) que tenemos almacenados
                self.loadAllItems();
            };
        }
    }

    createItemsStore() {
        // Creamos el Items Store, el cual funciona como una tabla para almacenar 
        //los datos de proudctos y acntidades
        var objectStore = this.db.createObjectStore(ListService.ITEMS_TABLE, { autoIncrement : true });
        //Definimos un campo o indice para guardar los nombres de los produtos 
        objectStore.createIndex("productName", "productName", { unique: true });
        //Definimos un campo o indice para guardar las cantidades de los produtos
        objectStore.createIndex("cantidad", "cantidad", { unique: false });
        //Implementamos un callback para el evento oncomplete con la finalidad de saber cuando 
        //se ha logrado crear el Store 
        objectStore.transaction.oncomplete = function(event) {
            //Aqui el store ya ha esta creado y listo para ser usado
        }
    }

    addProductToDB(newProd: Product){
        var self = this;
        //Almacenamos los valores del nuevo producto y su cantidad en el Items Store
        //mediante un objeto transaction al Store items de tipo readwrite
        var itemObjectStore = this.db.transaction(ListService.ITEMS_TABLE, "readwrite").objectStore(ListService.ITEMS_TABLE);
        //Con el objeto del Items Store creamos una peticion de tipo inserción de datos usando el método add del objectStore   
        var req = itemObjectStore.add(newProd);
        //Implementamos un callback para el evento onsuccess para saber cuando hemos agregado con éxito el nuevo objeto Product 
        req.onsuccess = function(event) {
            //Aqui sabemos que se ha agregado con éxito
        };

        //Implementamos un callback para el evento onerror para saber si ha ocurrido algun error durante la inserción del objeto
        //y en caso tal lo notificamos al usaurio con un alert
        req.onerror = function(event) {
            window.alert("addProductToDB onError" + req.error);
        };
    }

    loadAllItems() {
        var self = this;
        //Obtenemos una referencia del Store items mediante una transaction al Store items de tipo readonly
        //ya que lo que buscamos es solo leer el contenido del mismo
        var itemObjectStore = self.db.transaction(ListService.ITEMS_TABLE, "readonly").objectStore(ListService.ITEMS_TABLE);
        //Con la referencia del Store item abrimos un cursor para iterar sobre cada uno de los obejto Product 
        //que contiene el Store y lo agreamos a nuetro array de items   
        itemObjectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
            self.items.push(cursor.value);
            cursor.continue();
          }
          else {
            //Aqui ya hemos culminado de iterar sobre todos los Items guardado
          }
        };
    }
}