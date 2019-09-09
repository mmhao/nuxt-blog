const env = process.env.NODE_ENV;

let DB_CONF;
if (env === 'development') {
  DB_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '27017',
    database: 'nuxtblog',
  };
}

if (env === 'production') {
  DB_CONF = {

  };
}


module.exports = DB_CONF;
