const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'root',
  database: 'mydb',
  password: '',
  port: 3000,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  user: 'root',
  database: 'mydb',
  password: '',
  port: 3000,
})

client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})