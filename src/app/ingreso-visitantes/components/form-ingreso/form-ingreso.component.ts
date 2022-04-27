import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

//Propios
import { IHistorial, IPersona, IRenaper, ISector } from "../../models/interfaces";
import { HistorialService } from "../../services/historial.service";
import { PersonasService } from "../../services/personas.service";
import { RenaperService } from "../../services/renaper.service";

@Component({
  selector: "form-ingreso",
  templateUrl: "./form-ingreso.component.html",
  styleUrls: ["./form-ingreso.component.css"],
})
export class FormIngresoComponent implements OnInit {
  //Privates
  private _fecha: Date = new Date();
  private _personas: Array<IPersona> = new Array();
  private _defaultRenaper: IRenaper = {
    dni: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
  }

  private _renaper: IRenaper;

  //GetySeters
  public get personas(): Array<IPersona> {
    return this._personas;
  }
  public set personas(value: Array<IPersona>) {
    this._personas = value;
  }

  public get fechaHoy(): string {
    return this._fecha.toLocaleDateString();
  }

  public get horaActual(): string {
    return this._fecha.toLocaleTimeString("es-AR", {
      minute: "2-digit",
      hour: "2-digit",
    });
  }

  public get renaper(): IRenaper {
    return this._renaper;
  }
  public set renaper(value: IRenaper) {
    this._renaper = value;
  }


  //Formulario
  formVisita: FormGroup;

  constructor(private fB: FormBuilder, private servPersonas: PersonasService, private servRenaper: RenaperService, private histoServ: HistorialService) {
    
    this.formVisita = this.fB.group({
      dni: [0, [Validators.required, Validators.min]],
      nroTarjIngreso: ["", [Validators.required, Validators.min, Validators.max]],
      sector: ["", Validators.required],
      visitaA: ["", Validators.required],
    });

    this._renaper = this._defaultRenaper;
  }

  ngOnInit(): void {
    this.setSectores();
  }

  setSectores(): Array<ISector> {
    return this.servPersonas.sectores;
  }

  onClickConsultarDNI(): void {
    let { dni } = this.formVisita.controls;
    if (dni.status !== "INVALID") {
      this.renaper = this.servRenaper.renapers.find(x => x.dni == dni.value) || this._defaultRenaper;
    }
    else{
      this.renaper = this._defaultRenaper;
    }
  }

  onChangeSector(event: Event) {
    let element = event.target as HTMLSelectElement;
    if (element) {
      let id = +element.value;
      this.setPersonas(id);
    }
  }

  setPersonas(idSector: number): void {
    this.personas = this.servPersonas.personas.filter((x) => x.sector.id === idSector);
  }

  onSubmit(event: Event){
    if(this.formVisita.status === "VALID"){
      let visitaA  = this.formVisita.controls["visitaA"];
      let persona = this.personas.find(x => x.id === +visitaA.value) 

      if(persona){

        let visita:IHistorial = {
          fechaIngreso: this.fechaHoy,
          horaIngreso: this.horaActual,
          renaper: this.renaper,
          visitaA: persona,
        }

        this.histoServ.addVisita(visita)
      } 
    }
  }

  validateFormComplete(): boolean{
    let {dirty, touched} = this.formVisita;
    return this.validateForm() && (dirty);
  }

  validateForm(): boolean{
    return this.formVisita.invalid;
  }
}
