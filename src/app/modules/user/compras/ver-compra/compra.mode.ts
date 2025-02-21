export interface Compra {
    _id:          string;
    doctor:       Doctor;
    cliente:      Cliente;
    tipoCliente:  string;
    medicamentos: Medicamento[];
    numero_orden: string;
    recipe:       string;
    createdAt:    Date;
    updatedAt:    Date;
    __v:          number;
}

export interface Cliente {
    _id:             string;
    cedula:          string;
    createdAt:       Date;
    updatedAt:       Date;
    __v:             number;
    direccion:       string;
    nombre_apellido: string;
    telefono:        string;
}

export interface Doctor {
    _id:                 string;
    nombre_apellido:     string;
    cedula:              string;
    codigo_farmaceutico: string;
    codigo_colaborador:  string;
    nombre_usuario:      string;
    role:                string;
    deleted:             boolean;
    createdAt:           Date;
    updatedAt:           Date;
    __v:                 number;
}

 interface Medicamento {
    id:       ID;
    cantidad: number;
}

 interface ID {
    _id:                 string;
    principio_activo:    PrincipioActivo;
    foto:                string;
    marca:               string;
    presentacion:        string;
    numero_tabletas:     string;
    importado:           boolean;
    descripcion:         string;
    documento_requerido: string;
    createdAt:           Date;
    updatedAt:           Date;
    __v:                 number;
    deleted:             boolean;
}

 interface PrincipioActivo {
    _id:              string;
    principio_activo: string;
    limite:           number;
    createdAt:        Date;
    updatedAt:        Date;
    __v:              number;
}
