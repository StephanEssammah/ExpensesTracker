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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/addExpense', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, category, date, comment } = req.body.expense;
    const fullDate = new Date(date);
    const month = fullDate.toLocaleString('en-GB', { month: 'long' });
    const expense = {
        amount,
        category,
        'date': fullDate.toLocaleDateString('en-GB'),
        comment,
        id: Date.now()
    };
    yield (0, utils_1.addExpense)(month, expense);
    res.status(201);
    res.end();
}));
app.get('/expenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.query.month !== "string") {
        throw new Error("Query param 'month' has to be of type string");
    }
    const month = req.query.month.toString();
    const document = yield (0, utils_1.getDocument)(req, month);
    const graphData = (0, utils_1.generateGraphData)(document[month]);
    const categories = (0, utils_1.splitDataIntoCategories)(document[month]);
    res.status(200);
    res.json({ graphData, categories });
}));
app.get('/history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.query.month !== "string") {
        throw new Error("Query param 'month' has to be of type string");
    }
    const month = req.query.month.toString();
    const document = yield (0, utils_1.getDocument)(req, month);
    if (document[month] === undefined) {
        res.status(200);
        res.json([]);
        return;
    }
    const sorted = (0, utils_1.sortTransactions)(document[month]);
    res.status(200);
    res.json(sorted);
}));
app.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.deleteExpense)(req);
    res.status(200).end();
}));
app.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.updateExpense)(req);
    res.status(200).end();
}));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Server started on port ${port}`));
//# sourceMappingURL=server.js.map