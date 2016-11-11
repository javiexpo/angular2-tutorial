//Importamos el objeto Injectable de angular/core para poder hacer uso del Decorator
import { Injectable } from '@angular/core';

//Importamos el tipo de objeto Product el componente 
import { Product } from './app.component';

//Importamos el serivio AngularIndexedDB del modulo angular2-indexeddb que hemos instalado 
import {AngularIndexedDB} from '../node_modules/angular2-indexeddb/angular2-indexeddb';

//Declaramos 
@Injectable()
export class ListService {
    //Nombre de la BD
    static DATABASE_NAME = 'shoppingListDB';
    //Nombre del Store o Tabla de items
    static ITEMS_TABLE = 'items';

    //Isntancia del Servicio AngularIndexedDB 
    db: AngularIndexedDB;

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
        //Creamos la BD Indexed
        this.db = new AngularIndexedDB(ListService.DATABASE_NAME, 1);

        //Creamos un Store (especie de tabla) para almacenar los prouctos de la lista con sus cantidades 
        // y un ID autoincremental que los identifique como unicos dentro de la Store 
        this.db.createStore(1, (evt) => {
            let objectStore = evt.currentTarget.result.createObjectStore(
                ListService.ITEMS_TABLE, { keyPath: "id", autoIncrement: true });
            objectStore.createIndex("productName", "productName", { unique: false });
            objectStore.createIndex("cantidad", "cantidad", { unique: true });
        });
     }

    //Método para obtener del servicio los items activos en la lista
    //Este método devuelve una Promises con lo cual podemos manejar de 
    //ser necesario peticiones asincronas   
    getItems(): Promise<Product[]> {
        //Obtenemos todos los items de la base de datos
        this.db.getAll('items').then((items) => {
            console.log(items);
            this.items = items;
        }, (error) => {
            console.log(error);
        });
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
    addProduct(newProduct: Product): Promise<Product[]> {      
        //Creamos un nueva instancia del Product
        let newProd: Product = new Product();
        //Agregamos al nuevo producto, el nombre y la cantidad informada por el usuario
        newProd.productName = newProduct.productName;
        newProd.cantidad = newProduct.cantidad;

        //Agregamos el nuevo item (producto, cantidad) a la IndexedDB 
        this.db.add('items', newProd, null).then(() => {
            //Agregamos en nuevo producto a la lista
            this.items.push(newProd);
        }, (error) => {
            console.log(error);
        });
        //resolvemos la Promise retornando los items activo incluyendo el item agreagdo
        return Promise.resolve(this.items);
    }
}