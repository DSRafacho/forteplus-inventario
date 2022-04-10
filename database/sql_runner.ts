import db from "./db";
import querys from "./querys";

const insertProduct = async (productsArray: string[]) =>
    db.transaction(
        tx => tx.executeSql("INSERT INTO produtos", productsArray,
            (_, { rows }) => {
                // console.log(rows);
            }    
        )
    );


const selectAllProduts = (setProducts: Function) => {
    // console.log("");
    
    db.transaction(
        tx => {
            tx.executeSql(
                querys.SELECT_ALL(),
                // querys.SELECT(),
                [],
                (_, { rows }) => {
                    setProducts(rows);
                    // console.log(rows);
                }
            )

        }
    );
}

const createTable = () => db.transaction(tx => tx.executeSql(querys.CREATE) );

export { insertProduct, selectAllProduts, createTable }