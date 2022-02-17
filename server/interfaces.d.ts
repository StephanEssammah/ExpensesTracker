export interface Document {
    amount: number;
    category: string;
    date: string;
    comment: string;
    id: number;
}
export interface Day {
    amount: number;
    category: string;
    date: string;
    comment: string;
    id: number;
}
export interface Category {
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
}
