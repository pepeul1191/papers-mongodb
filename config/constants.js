var dotenv = require('dotenv');

module.exports = () => {
  dotenv.config();
  if(process.env.ENV == 'local'){
    return {
      base_url: 'http://localhost:3000/',
      static_url: 'http://localhost:3000/',
      socket_url: 'ws://localhost:3000/',
      static: 'dev',
      csrf: {
        secret: 'mpt/sr6eS2AlCRHU7DVThMgFTN08pnfSDf/C94eZx7udfm0lvgaYWLYJttYPKzGKDTlXwVU/d2FOxbKkgNlsTw==',
        key: 'csrf_val'
      },
    };
  }else if(process.env.ENV == 'heroku'){
    return {
      base_url: 'http://heroke.com',
      static_url: 'http://heroke.com',
      socket_url: 'ws://heroke.com',
      static: 'dev',
      csrf: {
        secret: 'mpt/sr6eS2AlCRHU7DVThMgFTN08pnfSDf/C94eZx7udfm0lvgaYWLYJttYPKzGKDTlXwVU/d2FOxbKkgNlsTw==',
        key: 'csrf_val'
      },
    };
  }else{

  }
}
