"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = initServer;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
async function initServer() {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    const graphqlServer = new server_1.ApolloServer({
        typeDefs: `
            type Query {
            sayHello : String
            }
        `,
        resolvers: {
            Query: {
                sayHello: () => `Hello from graphql Server`
            },
        },
    });
    await graphqlServer.start();
    app.use('/graphql', (0, express5_1.expressMiddleware)(graphqlServer));
    return app;
}
