#!/bin/bash

# Ir al directorio del script
cd "$(dirname "$0")"
echo 'Inicio' 


# varaibles
CONFIG="/microservicios/config/"
NAME_CONTAINER="api_consultas"
NAME_IMAGE="api-consultas"

PORT_EXPOSE=8002

docker build -t "$NAME_IMAGE" .
echo 'Compilado correctamente'

docker rm -f "$NAME_CONTAINER"

docker run --name "$NAME_CONTAINER" --restart=always \
        --env-file /microservicios/sql/.env \
        --network=redis \
        -v "$CONFIG"apiConsultas.json:/dist/json/configuracion.json \
        -v "$CONFIG"rabbit.json:/dist/json/rabbit.json \
        -v "$CONFIG"redis.json:/dist/json/redis.json \
        -dp "$PORT_EXPOSE":3000 "$NAME_IMAGE"
echo 'Successfull service'