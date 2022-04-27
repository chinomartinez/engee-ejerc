export interface ISector{
    id: number,
    nombre: string,
}

export interface IPersona{
    id:number,
    nombre: string,
    apellido: string,
    sector: ISector
}

export interface IRenaper{
    dni:string
    nombre:string,
    apellido:string,
    fechaNacimiento:string,
}

export interface IHistorial{
    id?: number,
    fechaIngreso?: string,
    horaIngreso?: string
    renaper: IRenaper,
    visitaA?: IPersona
}