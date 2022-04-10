const querys = {
    SELECT_ALL: (limit:number=25, offset:number=0) => `SELECT * FROM produtos LIMIT ${limit} OFFSET ${offset}`,
    SELECT_ONE: (code: string | number) => `SELECT * FROM produtos WHERE codigo=${code}`,
    CREATE: 'CREATE TABLE IF NOT EXISTS produtos ( codigo INT, codigo_barras INT, descricao VARCHAR(200), desc_unidade VARCHAR(12) )',
    
    DELETE: 'DELETE FROM produtos *',
    INSERT: 'INSERT INTO produtos (codigo,codigo_barra,descricao,desc_unidade) VALUES (?, ? ,?, ?);',
    
    // ALTER: 'ALTER TABLE produtos RENAME COLUMN unidade TO desc_unidade ',
    // ALTER_2: 'ALTER TABLE produtos RENAME COLUMN codigo_barra TO codigo_barras',
}

export default querys