// To parse this data:
//
//   import { Convert } from "./file";
//
//   const pendingPurchasesBook = Convert.toPendingPurchasesBook(json);

import { BankAccountModel } from '../../../shared/models/bank-account.model';
import { Book, UserBookModel } from '../../../shared/models/user-book.model';

export interface PendingPurchasesBook {
  _id: string;
  userBook: UserBookModel;
  bank: BankAccountModel;
  referenceNumber: string;
  transactionDate: Date;
  receiptImage: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  rejectionReason: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toPendingPurchasesBook(json: string): PendingPurchasesBook[] {
    return JSON.parse(json);
  }

  public static pendingPurchasesBookToJson(
    value: PendingPurchasesBook[]
  ): string {
    return JSON.stringify(value);
  }
}
