//Importamos el objeto Injectable de angular/core para poder hacer uso del Decorator
import { Injectable } from '@angular/core';

//Importamos el tipo de objeto Product el componente 
import { Product } from './app.component';

//Declaramos 
@Injectable()
export class ListService {
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
    constructor() { }

    //Método para obtener del servicio los items activos en la lista
    //Este método devuelve una Promises con lo cual podemos manejar de 
    //ser necesario peticiones asincronas   
    getItems(): Promise<Product[]> {
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
        //Agregamos en nuevo producto a la lista
        this.items.push(newProd);
        //resolvemos la Promise retornando los items activo incluyendo el item agreagdo
        return Promise.resolve(this.items);
    }
}