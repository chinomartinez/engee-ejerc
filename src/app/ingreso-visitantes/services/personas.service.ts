import { Injectable } from '@angular/core';
import { IPersona, ISector } from '../models/interfaces';

import personasJSON from "../../../assets/personas.json";
import sectorJSON from "../../../assets/sector.json";

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private _sectores: Array<ISector> = sectorJSON as Array<ISector>;

  private _personas: Array<IPersona> = personasJSON as Array<IPersona>;

  public get personas(): Array<IPersona> {
    return this._personas;
  }

  public get sectores(): Array<ISector> {
    return this._sectores;
  }

  constructor( ) { }

  
  
  

}
