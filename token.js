var request = require("request");

var options = { method: 'POST',
  url: 'https://api.us.onelogin.com/auth/oauth2/v2/token',
  headers: 
   { 'Postman-Token': 'e9ccf561-4f36-4351-8229-5c793929ec3a',
     'cache-control': 'no-cache',
     Authorization: 'Basic ODFmNTEzMzllYTM4NjU5NmRmMGM3YzZmMGU0YWI3YmZiYzkzYzQ5OWZkYmZkNDE1ZjU2YjU1MTg1OGE3YTA5Nzo1M2RiODgzZjAxMGE4OTc4NWJlOWY3OGY0MWViM2FjMTRhZjJmZGQxNGM2YjFhYWU0NGIwYmNiMGU3OGEyOTk1',
     'Content-Type': 'application/json' },
  body: { grant_type: 'client_credentials' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
