// SQL Server configuration
const config = {
    user: 'sa',
    password: '1234',
    server: '127.0.0.1', 
    database: 'book',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};
module.exports = config