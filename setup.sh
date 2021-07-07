#!/bin/bash
set -e
docker-compose pull
docker-compose build
docker-compose rm -v --force
docker-compose up -d --force-recreate
docker exec todo_dev_be yarn
docker-compose stop
