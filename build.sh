#!/bin/bash

docker-compose run --rm frontend npm run build
docker-compose run --rm firebase firebase deploy --only hosting
