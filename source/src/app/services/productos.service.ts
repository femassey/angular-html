import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return  new Promise( ( resolve ) => {
      this.http.get('https://angular-html-5bb79.firebaseio.com/productos_idx.json').subscribe((resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  public getProducto( id: string ) {
    return this.http.get(`https://angular-html-5bb79.firebaseio.com/productos/${ id }.json`);
  }

  public buscarProducto( termino: string ) {
    if (this.productos.length === 0) {
      // Cargar productos.
      this.cargarProductos().then( () => {
        // Ejecutar despues de tener los productos, aplicar filtro.
        this.filtrarProductos( termino );
      });
    } else {
      // Aplicar filtro.
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string ) {
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }
    });
  }
}
