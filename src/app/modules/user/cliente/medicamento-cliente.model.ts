// To parse this data:
//
//   import { Convert } from "./file";
//
//   const clienteMedicamentos = Convert.toClienteMedicamentos(json);

export interface ClienteMedicamentos {
    cantidadTotal:   number;
    principioActivo: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toClienteMedicamentos(json: string): ClienteMedicamentos[] {
        return JSON.parse(json);
    }

    public static clienteMedicamentosToJson(value: ClienteMedicamentos[]): string {
        return JSON.stringify(value);
    }
}
