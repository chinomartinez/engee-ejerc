import { Injectable } from '@angular/core';

import renaperJSON from '../../../assets/renaper.json'
import { IRenaper } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RenaperService {

  private _renapers: Array<IRenaper> = renaperJSON as Array<IRenaper>;

  public get renapers(): Array<IRenaper> {
    return this._renapers;
  }
  
  constructor() { }
}
