var request = require('request');
request.post({
               uri: 'https://api.mailgun.net/v3/sandbox56790f523167444fbbe3822b2e537e46.mailgun.org/messages',
               form: {
                 from: 'postmaster@sandbox56790f523167444fbbe3822b2e537e46.mailgun.org',
                 to: 'tlrnalra@gmail.com',
                 subject: 'Test',
                 text: 'Hi'
               }
             },
             function (err, res, body) {
               console.log(body);
             }).auth('api', 'key-28d4e5ffab333bb5d68dddf91b83b07f');