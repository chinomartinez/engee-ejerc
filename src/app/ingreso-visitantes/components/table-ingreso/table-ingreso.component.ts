import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IHistorial, IPersona, IRenaper } from '../../models/interfaces';
import { HistorialService } from '../../services/historial.service';

@Component({
  selector: 'table-ingreso',
  templateUrl: './table-ingreso.component.html',
  styleUrls: ['./table-ingreso.component.css']
})
export class TableIngresoComponent implements OnInit, OnChanges {

  private _historial: Array<IHistorial> = new Array<IHistorial>();
  
  public get historial(): Array<IHistorial> {
    return this._historial;
  }
  public set historial(value: Array<IHistorial>) {
    this._historial = value;
  }

  @Input("renaper") renaper!: IRenaper;

  constructor(private histoServ: HistorialService) {    
  }
  

  ngOnInit(): void {
    this.histoServ.getHistorial().subscribe(x => {
      this.historial = x;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    let renaper = changes["renaper"].currentValue as IRenaper;
    if(!renaper){
      return;
    }

    this.getHistorialByRenaper(renaper.dni);   
    
  }

  getHistorialByRenaper(dni: string){
    return this.histoServ.getHistorialRenaper(dni);
  }

  onClickRow(event: Event){
    let element = event.target as HTMLElement;
    if(element.tagName === "BUTTON" && element.id && element.classList.contains("btn-delete")){
      let val = confirm("¿Esta seguro de eliminar registro")
      if(val){
        this.histoServ.removeVisita(+element.id,this.renaper.dni)
      }      
    }
  }
  
}
