import * as FileSystem from 'expo-file-system';
import { insertProduct, selectAllProduts } from '../database/sql_runner';

export default async () => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    // const permissions2 = await FileSystem.StorageAccessFramework.

    if (permissions.granted) {
        const uri = permissions.directoryUri;
        
        const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(uri);
        const forteplusFileUri = files.find(file => file.match('forteplus.csv')) as string;

        const csvAsString = await FileSystem.readAsStringAsync(forteplusFileUri).then(csvstr => csvstr)
        const csvAsString2 = csvAsString as unknown
        const csvData = csvAsString2 as string

        var newCsvData = csvData.split('\n')
        newCsvData = newCsvData.filter((_, index) => index > 0)

        for (var i in newCsvData) {
            var strProd = newCsvData[i]
            var arrStrProd = strProd.split(',')

            await insertProduct(arrStrProd)
        }

    }

}