// To parse this data:
//
//   import { Convert, Metricas } from "./file";
//
//   const metricas = Convert.toMetricas(json);

export interface Metricas {
    clientes:              number;
    medicamentos:          number;
    variantes:             number;
    compras:               number;
    medicamentoMasVendido: MedicamentoMasVendido[];
    compradores:           Compradore[];
}

export interface Compradore {
    totalCompras: number;
    _id:          string;
    nombre:       string;
    cedula:       string;
}

export interface MedicamentoMasVendido {
    cantidadTotal:   number;
    _id:             string;
    principioActivo: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMetricas(json: string): Metricas {
        return JSON.parse(json);
    }

    public static metricasToJson(value: Metricas): string {
        return JSON.stringify(value);
    }
}
