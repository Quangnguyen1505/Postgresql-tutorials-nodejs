const { Pool } = require('pg');
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
const postgresql_URI = process.env.POSTGRES_URI;
const initPostgresql = () => {
    const instancePostgresql = new Pool({
      connectionString: postgresql_URI
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

