// To parse this data:
//
//   import { Convert } from "./file";
//
//   const notificationModel = Convert.toNotificationModel(json);

export interface NotificationModel {
    _id:          string;
    recipient:    string;
    type:         string;
    message:      string;
    read:         boolean;
    relatedId:    string;
    relatedModel: string;
    createdAt:    Date;
    updatedAt:    Date;
    __v:          number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toNotificationModel(json: string): NotificationModel[] {
        return JSON.parse(json);
    }

    public static notificationModelToJson(value: NotificationModel[]): string {
        return JSON.stringify(value);
    }
}
