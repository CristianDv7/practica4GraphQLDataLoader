import { db } from './database.js';

export const resolvers = {
    Query: {
        clientes: async () => await db.fetchAllClientes()
    },
    Cliente: {
        facturas: async (parent, _, context) =>
            await context.facturaLoader.load(parent.id)
    }
};
