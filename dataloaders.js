import DataLoader from 'dataloader';
import { db } from './database.js';

export const createDataLoaders = () => ({
    facturaLoader: new DataLoader((clienteIds) =>
        db.fetchFacturasByClienteIdsBatch(clienteIds)
    )
});
