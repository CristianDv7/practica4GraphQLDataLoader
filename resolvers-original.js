import { db } from './database.js';

// Version ingenua: ejecuta una consulta de facturas por cada cliente.
export const resolvers = {
    Query: {
        clientes: async () => await db.fetchAllClientes()
    },
    Cliente: {
        facturas: async (parent) =>
            await db.fetchFacturasByClienteId(parent.id)
    }
};
