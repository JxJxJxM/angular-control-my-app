export interface WorkByWorkOrder {
    id: number,
    empresa: string,
    idManoObra: number,
    idOrdenServicio: number,
    comentarios: string,
    numeroHoras: number,
    costoxHora: number,
    total: number,
    usuario: string,
    timestamp: string
}