"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpense = exports.deleteExpense = exports.splitDataIntoCategories = exports.generateGraphData = exports.addExpense = exports.getDocument = exports.sortTransactions = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MONGO_USER, MONGO_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@salt1.r85z6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(uri);
const collection = client.db("ExpensesTracker").collection("users");
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () { return yield client.connect(); });
connectToDB();
const sortTransactions = (document) => {
    return document.sort((a, b) => {
        const dayOne = a.date.split('/')[0];
        const dayTwo = b.date.split('/')[0];
        return Number(dayTwo) - Number(dayOne);
    });
};
exports.sortTransactions = sortTransactions;
const getDocument = (req, month) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield collection.findOne({ user: 'stephan' }, { projection: { [month]: 1 } });
    if (document === null) {
        throw new Error("No document found");
    }
    return document;
});
exports.getDocument = getDocument;
const addExpense = (month, expense) => __awaiter(void 0, void 0, void 0, function* () {
    yield collection.updateOne({ user: 'stephan' }, { $push: { [month]: expense } });
});
exports.addExpense = addExpense;
const generateGraphData = (document) => {
    const graphData = [];
    if (document === undefined) {
        for (let i = 1; i < 30; i++) {
            graphData.push({ value: 0, date: i });
        }
    }
    else {
        for (let i = 1; i < 30; i++) {
            const amount = document.reduce((prev, curr) => {
                const day = Number(curr.date.split('/')[0]);
                if (day === i)
                    return prev + curr.amount;
                return prev + 0;
            }, 0);
            graphData.push({ value: amount, date: i });
        }
    }
    return graphData;
};
exports.generateGraphData = generateGraphData;
const splitDataIntoCategories = (document) => {
    const categories = {
        home: {
            value: 0,
            transactions: 0,
        },
        groceries: {
            value: 0,
            transactions: 0,
        },
        travel: {
            value: 0,
            transactions: 0,
        },
        other: {
            value: 0,
            transactions: 0,
        }
    };
    if (document === undefined) {
        return {
            total: 0,
            home: {
                value: 0,
                transactions: 0,
            },
            groceries: {
                value: 0,
                transactions: 0,
            },
            travel: {
                value: 0,
                transactions: 0,
            },
            other: {
                value: 0,
                transactions: 0,
            },
        };
    }
    let total = 0;
    document.forEach((expense) => {
        const expenseCategory = expense.category.toLocaleLowerCase();
        total += expense.amount;
        categories[expenseCategory].value += expense.amount;
        categories[expenseCategory].transactions++;
    });
    return Object.assign({ total }, categories);
};
exports.splitDataIntoCategories = splitDataIntoCategories;
const deleteExpense = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield collection.updateOne({ user: 'stephan' }, { $pull: { [req.body.month]: { id: req.body.id } } });
});
exports.deleteExpense = deleteExpense;
const updateExpense = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldExpense, newExpense } = req.body;
    const fullDate = new Date(newExpense.date);
    const month = fullDate.toLocaleString('en-GB', { month: 'long' });
    const expense = {
        amount: newExpense.amount,
        category: newExpense.category,
        date: fullDate.toLocaleDateString('en-GB'),
        comment: newExpense.comment,
        id: oldExpense.id
    };
    yield collection.updateOne({ user: 'stephan' }, { $pull: { [oldExpense.month]: { id: oldExpense.id } } });
    yield collection.updateOne({ user: 'stephan' }, { $push: { [month]: expense } });
});
exports.updateExpense = updateExpense;
//# sourceMappingURL=utils.js.map