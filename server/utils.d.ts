import { Document } from './interfaces';
export declare const sortTransactions: (document: Array<Document>) => Document[];
export declare const getDocument: (req: any, month: string) => Promise<import("mongodb").WithId<import("bson").Document>>;
export declare const addExpense: (month: string, expense: object) => Promise<void>;
export declare const generateGraphData: (document: Array<Document>) => any[];
export declare const splitDataIntoCategories: (document: Array<Document>) => {
    total: number;
    home: {
        value: number;
        transactions: number;
    };
    groceries: {
        value: number;
        transactions: number;
    };
    travel: {
        value: number;
        transactions: number;
    };
    other: {
        value: number;
        transactions: number;
    };
};
export declare const deleteExpense: (req: any) => Promise<void>;
export declare const updateExpense: (req: any) => Promise<void>;
