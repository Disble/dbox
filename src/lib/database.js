const Store = require('electron-store');
const store = new Store();
const Datastore = require('nedb');
import path from 'path';
const dbPath = path.join(store.path, '..', 'data', 'dboxapps.dat');
const dboxAppsDB = new Datastore({ filename: dbPath, autoload: true });

export default dboxAppsDB;
