// To parse this data:
//
//   import { Convert, MembershipModel } from "./file";
//
//   const membershipModel = Convert.toMembershipModel(json);

export interface MembershipModel {
    user:      string;
    status:    string;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMembershipModel(json: string): MembershipModel {
        return JSON.parse(json);
    }

    public static membershipModelToJson(value: MembershipModel): string {
        return JSON.stringify(value);
    }
}
