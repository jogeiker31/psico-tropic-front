// To parse this data:
//
//   import { Convert, Metrics } from "./file";
//
//   const metrics = Convert.toMetrics(json);

export interface Metrics {
    users:                     number;
    memberships:               number;
    mApproveds:                number;
    mRejectes:                 number;
    mPending:                  number;
    books:                     number;
    booksBoughts:              number;
    booksPending:              number;
    purchasesByBank:           PurchasesByBank[];
    membershipPurchasesByBank: PurchasesByBank[];
    mostBooksBought:           MostBooksBought[];
}

export interface PurchasesByBank {
    _id:            string;
    totalPurchases: number;
    bankName:       string;
    bankType:       string;
}

export interface MostBooksBought {
    totalBought: number;
    bookId:      string;
    title:       string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMetrics(json: string): Metrics {
        return JSON.parse(json);
    }

    public static metricsToJson(value: Metrics): string {
        return JSON.stringify(value);
    }
}
