const RNFS = require('react-native-fs');

const path = RNFS.DocumentDirectoryPath + '/test.txt';

// write the file
async function writter() {
    await RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
        .then((success: any) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err: any) => {
            console.log(err.message);
        });

}

export { writter }

