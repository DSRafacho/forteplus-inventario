const csv = require('csvtojson')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db.sqlite3')
const fs = require('fs')
// const rnfs = require('react-native-fs')
const { Parser } = require('json2csv')

const processCsvDataToSql = async (param) => {
    const produtos = await csv().fromFile('./prod_inventario.csv');

    if (param === 'populate') {

        for (let item = 0; item < produtos.length; item++) {
            var produto = produtos[item];
            var before = db.prepare('INSERT INTO produtos (codigo, codigo_barras, descricao, desc_unidade) VALUES (?,?,?,?)')

            before.run(produto.codigo, produto.codigo_barra, produto.descricao, produto.desc_unidade)
            before.finalize()
        }
    }
    else if (param === 'export') {
        db.all(
            "SELECT * FROM produtos",
            (error, data) => {
                fs.writeFileSync(
                    `export.csv`,
                    new Parser(
                        {
                            fields:
                                [
                                    "codigo",
                                    "codigo_barras",
                                    "descricao",
                                    "desc_unidade"
                                ]
                        }
                    ).parse(data),
                    error => { if (error) throw new error }
                )
            }
        )
    }
    else param == undefined ? console.log("Nenhum parametro foi passado") : console.log(`O parametro '${param}' não é válido`)

    db.close()
}


//processCsvDataToSql(process.argv.slice(2)[0])
export { processCsvDataToSql }
