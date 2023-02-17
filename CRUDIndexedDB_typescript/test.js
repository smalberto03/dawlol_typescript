import React, { useEffect } from 'react'
import IndexedDb from './indexedDb'

const Test = () => {
    useEffect(() => {
        const runIndexDb = async () => {
            const indexedDb = new IndexedDb('test');
            await indexedDb.createObjectStore(['books', 'students']);
            await indexedDb.putValue('books', { name: 'Juego de tronos' });
            await indexedDb.putBulkValue('books', [{ name: 'A Song of Fire and Ice' }, { name: 'Harry Potter y la cámara de los secretos' }]);
            await indexedDb.getValue('books', 1);
            await indexedDb.getAllValue('books');
            await indexedDb.deleteValue('books', 1);
        }
        runIndexDb();
    }, []);
    return (<React.Fragment></React.Fragment>)
}

export default Test;