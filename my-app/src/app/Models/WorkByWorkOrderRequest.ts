export interface WorkByWorkOrderRequest {
    empresa:string,
    idManoObra:number,
    idOrdenServicio:number,
    comentarios:string,
    NumeroHoras:number,
    costoxHora:number,
    total:number,
    usuario:string|undefined
}