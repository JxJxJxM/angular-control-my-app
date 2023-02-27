import { DocumentLine } from "./DocumentLine";
import { ValeDataInfo } from "./ValeDataInfo";
import { ValeDataInfoAutoAbasto } from "./ValeDataInfoAutoAbasto";

export interface AutoAbastoRequest {
    empresa:number | undefined;
    objType:number;
    Comments:String;
    DocumentLines:DocumentLine[] | null;
    valeDataInfo:ValeDataInfo | ValeDataInfoAutoAbasto | null;
  }