const { Client } = require('pg');
require('dotenv').config();

let client = {}, statusConnecPostgresql = {
    CONNECT: "connect",
    END: "end",
    RECONNECT: "reconnecting",
    ERROR: "error"
}

const handleEventConnection = ({
    connectionPostgresql
}) => {
    connectionPostgresql.on(statusConnecPostgresql.CONNECT, () => {
        console.log(`connection Postgresql - connection status: connected`);
    })

    connectionPostgresql.on(statusConnecPostgresql.END, () => {
        console.log(`connection Postgresql - connection status: disconnected`);
    })

    connectionPostgresql.on(statusConnecPostgresql.RECONNECT, () => {
        console.log(`connection Postgresql - connection status: reconnecting`);
    })

    connectionPostgresql.on(statusConnecPostgresql.ERROR, (err) => {
        console.log(`connection Postgresql - connection status: error ${err}`);
    })
}

const initPostgresql = () => {
    const instancePostgresql = new Client({
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      // ssl: true,
    });
    client.instanceConnect = instancePostgresql;
    handleEventConnection({
        connectionPostgresql: instancePostgresql
    })

    client.instanceConnect.connect();
    return client;
}

const getPostgresql = () => client

const closePostgresql = () => {

}

module.exports = {
  initPostgresql,
  getPostgresql,
  closePostgresql
}

