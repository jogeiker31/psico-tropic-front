// To parse this data:
//
//   import { Convert, MetricasMedicamentoMes } from "./file";
//
//   const metricasMedicamentoMes = Convert.toMetricasMedicamentoMes(json);

export interface MetricasMedicamentoMes {
    totalMedicamentos: number;
    detalle:           Detalle[];
}

export interface Detalle {
    cantidad: number;
    nombre:   string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMetricasMedicamentoMes(json: string): MetricasMedicamentoMes {
        return JSON.parse(json);
    }

    public static metricasMedicamentoMesToJson(value: MetricasMedicamentoMes): string {
        return JSON.stringify(value);
    }
}
