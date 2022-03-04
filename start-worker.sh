#!/bin/bash
# watch -n 10 echo "create server snapshots"
export TERM=linux;
watch -n 10 node src/worker.js;

