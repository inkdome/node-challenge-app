#!/bin/bash

mongoimport --db inkdome --collection styles --file /docker-entrypoint-initdb.d/styles.json
mongoimport --db inkdome --collection tattooers --file /docker-entrypoint-initdb.d/tattooers.json
mongoimport --db inkdome --collection rankings --file /docker-entrypoint-initdb.d/rankings.json
