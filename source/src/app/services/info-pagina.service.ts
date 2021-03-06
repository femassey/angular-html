import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})

export class InfoPaginaService {
  cargada = false;

  info: InfoPagina = {};
  equipo: any = [];

  constructor( private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Leer archivo json.
    this.http.get('assets/data/data-pagina.json').subscribe( ( resp: InfoPagina ) => {
      this.cargada = true;
      this.info = resp;
    } );
  }

  private cargarEquipo() {
    // Leer archivo json.
    this.http.get('https://angular-html-5bb79.firebaseio.com/equipo.json').subscribe( ( resp: any[] ) => {
      this.equipo = resp;
    });
  }
}
