#!/bin/bash

mongoimport --db fragworld-browser --collection servers \
          --authenticationDatabase admin --username root --password root \
          --jsonArray --drop --file /db/seed/servers.json

mongoimport --db fragworld-browser --collection games \
          --authenticationDatabase admin --username root --password root \
          --jsonArray --drop --file /db/seed/games.json