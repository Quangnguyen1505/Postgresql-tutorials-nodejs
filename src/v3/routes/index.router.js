const express = require('express');
const router = express.Router();


router.get('/checkstatus', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'api ok'
    })
})

const { getPostgresql } = require('../databases/init.postgresql');

(async () => {
  const { instanceConnect: PostgresqlClient } =  getPostgresql();
  let insertRow = await PostgresqlClient.query('INSERT INTO manager_test(id) VALUES(25)');
  console.log(`Inserted ${insertRow.rowCount} row`);
  // await PostgresqlClient.end();
})();

module.exports = router;