import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'node:fs';
import { createDataLoaders } from './dataloaders.js';
import { resolvers } from './resolvers.js';

const typeDefs = readFileSync(
    new URL('./schema.graphql', import.meta.url),
    'utf8'
);

// 4. INICIALIZACIÓN DEL SERVIDOR
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT ?? 4000) },
    context: async () => createDataLoaders()
});
console.log(`🚀 Servidor listo en Académico listo en: ${url}`);