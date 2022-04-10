import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const db = SQLite.openDatabase("database.db");
async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
    
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    
    // file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252Fforteplus-inventario-8c19b29c-290d-4677-a6e3-b7973b30fca0/
    await FileSystem.downloadAsync(
        Asset.fromModule(require('C:\\Users\\davis\\Dev\\barcode-reader\\database.db')).uri,
        FileSystem.documentDirectory + 'SQLite/database.db'
    )

    return SQLite.openDatabase('database.db');
}


export default db;
export { openDatabase }
