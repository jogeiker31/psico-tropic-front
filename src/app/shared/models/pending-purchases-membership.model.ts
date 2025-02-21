// To parse this data:
//
//   import { Convert } from "./file";
//
//   const pendingPurchasesBook = Convert.toPendingPurchasesBook(json);


import { BankAccountModel } from './bank-account.model';
import { MembershipModel } from './membership.model';

export interface PendingPurchasesMembership {
  _id: string;
  membership: MembershipModel;
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


