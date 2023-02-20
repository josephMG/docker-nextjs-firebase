#!/bin/bash

# docker-compose run --rm frontend yarn build
docker-compose run --rm firebase firebase deploy --only hosting
