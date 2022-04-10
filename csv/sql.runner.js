const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db.sqlite3')


//db.run('CREATE TABLE IF NOT EXISTS produtos ( codigo INT, codigo_barras INT, descricao VARCHAR(200), desc_unidade VARCHAR(12) )')
//db.run('ALTER TABLE produtos RENAME COLUMN unidade TO desc_unidade ')
//db.run('ALTER TABLE produtos RENAME COLUMN codigo_barra TO codigo_barras')
//db.run('DELTE FROM produtos *')
//db.run('')