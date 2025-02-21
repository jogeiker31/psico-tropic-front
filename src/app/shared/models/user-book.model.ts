// To parse this data:
//
//   import { Convert, BookModel } from "./file";
//
//   const bookModel = Convert.toBookModel(json);

export interface UserBookModel {
  _id: string;
  book: Book;
  user: UserData;
  favorite: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Book {
  _id: string;
  categorie: Categorie;
  name: string;
  author: string;
  description: string;
  cover: string;
  file: string;
  deleted: boolean;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Categorie {
  _id: string;
  name: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toBookModel(json: string): UserBookModel {
    return JSON.parse(json);
  }

  public static bookModelToJson(value: UserBookModel): string {
    return JSON.stringify(value);
  }
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  enabled: boolean;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
