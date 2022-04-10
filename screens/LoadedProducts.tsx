import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { connect } from "react-redux";

import { RootTabScreenProps } from '../types';
import { Button } from 'react-native';
import { selectAllProduts } from '../database/sql_runner';
import db, { openDatabase } from '../database/db';
import querys from '../database/querys';
import read_file from '../system/read_file';
import * as FileSystem from 'expo-file-system';

interface Prod {
    codigo: string
    codigo_barras: string
    descricao: string
    desc_unidade: string
}

function LoadedProducts(
    { navigation }: RootTabScreenProps<'LoadedProducts'>,
    // { codigo, codigo_barras, descricao, desc_unidade }: Prod,
) {

    var [products, setProducts] = useState([])
    var [productsLenght, setProductsLenght] = useState(0)


    /*
        Fazer um sistema de filtro por código, unidade e descrição_unidade
        Páginação
        Tela de loading
    */

    useEffect(
        () => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        querys.SELECT_ALL(), [],
                        (_, { rows }) => {
                            const dados = rows._array as unknown
                            const newDados = dados as Prod[]

                            // @ts-ignore
                            setProducts(newDados)
                            setProductsLenght(newDados.length)
                        }
                    )
                }
            );
        }, []
    )

    const renderItem = ({ item }: { item: Prod }) => {
        return (
            <TouchableOpacity
                style={styles.productsContainer}
                onPress={
                    () => {
                        navigation.navigate(
                            'Modal',
                            {
                                codigo: item.codigo,
                                codigo_barras: item.codigo_barras,
                                descricao: item.descricao,
                                desc_unidade: item.desc_unidade
                            }
                        )
                    }
                }
            >
                <View style={styles.productView}>
                    <View style={styles.productCode}><Text>{item.codigo}</Text></View>
                    <View style={styles.productInfo}><Text> {item.descricao} - {item.desc_unidade}</Text></View>
                </View>
            </TouchableOpacity>
        )
    }

    const noProductsView = (
        <View style={styles.noProductsContent}>
            <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>Ooops, nenhum produto foi encontrado...</Text>
            <Text style={{ fontSize: 18, marginTop: 32 }}>Verifique se o arquivo produtos.csv está na pasta 'Forteplus' de seu celular ou se a pasta correta foi selecionada.</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {
                products.length > 0
                    ? <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20, paddingTop: 20 }}>

                        <TouchableOpacity style={{ width: 115, backgroundColor: "#888", display: 'flex', padding: 8, alignItems: 'center', }}
                            onPress={
                                async () => {
                                    await openDatabase()
                                        .then(
                                            db =>
                                                db.transaction(
                                                    tx => tx.executeSql(querys.SELECT_ALL(), [],
                                                        async (tx_, results) => {
                                                            var newCsvContent = ""
                                                            var i = 0

                                                            newCsvContent += "codigo,descricao,codigo_barras,desc_unidade\n"

                                                            results.rows._array.forEach(
                                                                (data: Prod) => {
                                                                    newCsvContent += `${data.codigo},${data.descricao},${data.codigo_barras},${data.desc_unidade}\n`
                                                                    i++
                                                                }
                                                            )

                                                            const acessFolder = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

                                                            if (acessFolder.granted) {
                                                                // const fortFolderUri = await FileSystem.StorageAccessFramework.getUriForDirectoryInRoot(acessFolder.directoryUri)

                                                                await FileSystem.StorageAccessFramework.createFileAsync(
                                                                    acessFolder.directoryUri,
                                                                    'produtos-exportados',
                                                                    'text/csv',
                                                                ).then(
                                                                    async SAF_URI => {
                                                                        await FileSystem.StorageAccessFramework.writeAsStringAsync(
                                                                            SAF_URI,
                                                                            newCsvContent,
                                                                        )
                                                                    }
                                                                )
                                                                
                                                            }
                                                        }
                                                    )
                                                )
                                        )
                                    return
                                }
                            }
                        >
                            <Text>Exportar Dados</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: 125, backgroundColor: "#222", display: 'flex', padding: 8, alignItems: 'center', }} onPress={() => { }}>
                            <Text>Importar Novo CSV</Text>
                        </TouchableOpacity>

                    </View>
                    : <></>
            }
            <Text style={{ color: "#222", fontSize: 20, textAlign: 'center', marginVertical: 15 }}>Produtos carregados: {productsLenght}</Text>
            {
                products.length > 0
                    ? <FlatList
                        data={products}
                        renderItem={renderItem}
                        keyExtractor={(item: Prod) => item.codigo}
                    />
                    : noProductsView
            }
        </View>
    )
}


function mapStateToProps(state: { main: object }) {
    return {
        main: state.main,
    }
}
function mapDispatchToProps(dispatch: any) {
    return {
        setProductData: (productData: any) => dispatch({ payload: productData, type: "SET_ALL" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadedProducts)

const styles = StyleSheet.create(
    {
        noProductsContent: {
            display: 'flex',
            flex: 1,

            borderRadius: 15,
            padding: 15,
        },

        productsContainer: {
            display: 'flex',
            marginHorizontal: 15,
            flexDirection: "row"
        },
        container: {
            flex: 1,
        },
        productView: {
            flex: 1,
            display: "flex",
            flexDirection: "row",

            backgroundColor: "#184768",
            marginVertical: 15,

            borderBottomLeftRadius: 18,
            borderTopLeftRadius: 18,
            borderBottomRightRadius: 5,
            borderTopRightRadius: 5,
        },
        productCode: {
            width: "20%",
            backgroundColor: "#073657",
            borderBottomLeftRadius: 18,
            borderTopLeftRadius: 18,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            padding: 5,
            paddingLeft: 15,
        },
        productInfo: {
            width: "80%",
            backgroundColor: "#184768",

            textAlign: "center",

            paddingLeft: 10,
            paddingVertical: 5,
        },
    }
)
