#!/bin/bash

mongoimport --db fragworld-browser --collection servers \
          --authenticationDatabase admin --username root --password root \
          --drop --file ./import.json --host 0.0.0.0 --port 27017