import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Implementacion original ingenua para demostrar el problema N+1
const CLIENTES_DB = [
    { id: "c-1", nombre: "Corporacion Alfa", sector: "Finanzas" },
    { id: "c-2", nombre: "Logistica Beta", sector: "Transporte" },
    { id: "c-3", nombre: "Industrias Gamma", sector: "Manufactura" }
];

const FACTURAS_DB = [
    { id: "f-1", clienteId: "c-1", monto: 1500.00 },
    { id: "f-2", clienteId: "c-1", monto: 2300.50 },
    { id: "f-3", clienteId: "c-2", monto: 450.00 },
    { id: "f-4", clienteId: "c-3", monto: 8900.00 }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let consultaNumero = 0;

const db = {
    async fetchAllClientes() {
        consultaNumero = 1;
        console.log(`[DB READ #${consultaNumero}] SELECT * FROM clientes;`);
        await delay(200);
        return CLIENTES_DB;
    },

    async fetchFacturasByClienteId(clienteId) {
        consultaNumero += 1;
        console.log(`[DB READ #${consultaNumero}] SELECT * FROM facturas WHERE cliente_id = '${clienteId}';`);
        await delay(200);
        return FACTURAS_DB.filter(factura => factura.clienteId === clienteId);
    }
};

const typeDefs = `#graphql
  type Cliente {
    id: ID!
    nombre: String!
    sector: String!
    facturas: [Factura!]!
  }

  type Factura {
    id: ID!
    monto: Float!
  }

  type Query {
    clientes: [Cliente!]!
  }
`;

const resolvers = {
    Query: {
        clientes: async () => await db.fetchAllClientes(),
    },
    Cliente: {
        facturas: async (parent) => {
            return await db.fetchFacturasByClienteId(parent.id);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT ?? 4001) }
});

console.log(`Servidor original listo en: ${url}`);
