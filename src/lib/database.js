import Store from 'electron-store';
import Datastore from 'nedb';
import path from 'path';

export default class Database {
    constructor(collection) {
        this.store = new Store();
        const dbPath = path.join(this.store.path, '..', 'data', `dbox${collection}.dat`);
        this.db = new Datastore({ filename: dbPath, autoload: true });
    }

    getInstance() {
        return this.db;
    }

    getStore() {
        return this.store;
    }
}
