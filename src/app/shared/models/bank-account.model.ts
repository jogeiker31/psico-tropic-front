// To parse this data:
//
//   import { Convert } from "./file";
//
//   const bankAccountModel = Convert.toBankAccountModel(json);

export interface BankAccountModel {
    _id:             string;
    bank:            string;
    deleted:         boolean;
    type:            string;
    createdAt:       Date;
    updatedAt:       Date;
    __v:             number;
    identification?: string;
    mobile?:         string;
    name?:           string;
    bankAccount?:    string;
    bankCode?:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBankAccountModel(json: string): BankAccountModel[] {
        return JSON.parse(json);
    }

    public static bankAccountModelToJson(value: BankAccountModel[]): string {
        return JSON.stringify(value);
    }
}
