"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = express_1.default();
exports.app.use(express_1.default.json());
const cors_1 = __importDefault(require("cors"));
exports.app.use(cors_1.default({ origin: true }));
const checkout_1 = require("./checkout");
exports.app.post("/checkout/", runAsync(async ({ body }, response) => {
    response.send(await checkout_1.createStripeCheckoutSession(body.line_items));
}));
/**
 * Catch  async errors when awaiting promises
 */
function runAsync(callback) {
    return (request, response, next) => {
        callback(request, response, next).catch(next);
    };
}
//# sourceMappingURL=api.js.map