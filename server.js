require('dotenv').config();
const app = require('./src/app')



const {PORT} = process.env;




const server = app.listen( PORT, () => {
    console.log(`WSV start with port ${PORT}`);
})
