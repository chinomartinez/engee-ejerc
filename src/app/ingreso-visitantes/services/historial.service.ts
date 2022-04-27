import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import historialJSON from '../../../assets/historial.json'
import { IHistorial} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private allHistorial: Array<IHistorial> = historialJSON as Array<IHistorial>;
  private historialByRenaper: Array<IHistorial> = historialJSON as Array<IHistorial>;

  private $Historia = new Subject<IHistorial[]>();


  constructor() { }

  getHistorial(): Observable<IHistorial[]> {
    return this.$Historia.asObservable();
  }

  getHistorialRenaper(dniVisitante: string){ 

    let historialByRenaper = this.allHistorial.filter(x => x.renaper.dni === dniVisitante);    
    this.$Historia.next(historialByRenaper);
  }

  addVisita(visita: IHistorial){
    visita.id = Math.floor(Math.random() * 10)
    this.allHistorial.push(visita);

    this.getHistorialRenaper(visita.renaper.dni)
  }

  removeVisita(idHistoria: number, dni: string){
    if(this.allHistorial.length > 0){

      let filter = this.allHistorial.filter(x => x.id !== idHistoria)
      if(filter){
        this.allHistorial = filter;
        
        this.getHistorialRenaper(dni)
      }
    }
  }

}
