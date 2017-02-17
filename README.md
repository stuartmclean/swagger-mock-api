# Swagger Mock-Api

Creates useful mock values based on a swagger.yaml file.
Reloads file on every api call so that changes can be seen without restarting the server.

### Quickstart

run ```npm install```

run ```node server.js```

optional environment params:
* FILE (full file path to the swagger.yaml)
* PORT (default: 8080)

### Docker

get image: ```docker pull stuartmclean/swagger-mock-api```

sample docker command, accessible on port 10010 and reading swagger file from:
/path/to/swagger/dir/swagger.yaml

```
docker run -d \
    -p 10010:8080 \
    stuartmclean/swagger-mock-api \
    -f /path/to/swagger/dir:/app/swagger 
    --delay 1000
```

### Dev

run a useful self-refreshing test server on port 8080: ```gulp```

run tests: ```npm test```
