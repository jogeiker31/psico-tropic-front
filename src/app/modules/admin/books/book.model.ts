// To parse this data:
//
//   import { Convert } from "./file";
//
//   const bookModel = Convert.toBookModel(json);

export interface BookModel {
    _id:         string;
    categorie:   Categorie;
    name:        string;
    author:      string;
    description: string;
    cover:       string;
    file:        string;
    deleted:     boolean;
    price:       number;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}

export interface Categorie {
    _id:       string;
    name:      string;
    enabled:   boolean;
    deleted:   boolean;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBookModel(json: string): BookModel[] {
        return JSON.parse(json);
    }

    public static bookModelToJson(value: BookModel[]): string {
        return JSON.stringify(value);
    }
}
