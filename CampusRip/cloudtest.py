import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/functions/hello', json.dumps({
     }), {
       "X-Parse-Application-Id": "aEGq7Uw6GgqbGZo8JWxPQAEYdxSgexrv9zLLXVJu",
       "X-Parse-REST-API-Key": "S1WVhQ1FLsd064wuZHPgZH8VdFgD41NRdhN2gPcn",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print (result)