// To parse this data:
//
//   import { Convert } from "./file";
//
//   const clienteCompras = Convert.toClienteCompras(json);

export interface ClienteCompras {
    compras: Compra[];
    date:    string;
}

export interface Compra {
    _id:          string;
    doctor:       Doctor;
    cliente:      string;
    tipoCliente:  string;
    medicamentos: Medicamento[];
    numero_orden: string;
    createdAt:    Date;
    updatedAt:    Date;
    __v:          number;
    recipe?:      string;
}

export interface Doctor {
    _id:             string;
    nombre_apellido: string;
    cedula:          string;
}

export interface Medicamento {
    id:       ID;
    cantidad: number;
}

export interface ID {
    _id:              string;
    principio_activo: PrincipioActivo;
    marca:            string;
}

export interface PrincipioActivo {
    _id:              string;
    principio_activo: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toClienteCompras(json: string): ClienteCompras[] {
        return JSON.parse(json);
    }

    public static clienteComprasToJson(value: ClienteCompras[]): string {
        return JSON.stringify(value);
    }
}
