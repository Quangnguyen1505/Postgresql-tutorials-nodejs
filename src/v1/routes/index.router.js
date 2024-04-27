const express = require('express');
const router = express.Router();

router.get('/checkstatus', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'api ok'
    })
})

const { getClient } = require('../databases/init.postgresql');

(async () => {
  const client = await getClient();
  const name = process.argv[2] ?? 'john';
//   let insertRow = await client.query('INSERT INTO manager_test(id) VALUES(25)');
//   console.log(`Inserted ${insertRow.rowCount} row`);
  await client.end();
})();

module.exports = router;