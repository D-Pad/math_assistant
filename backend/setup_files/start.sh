#!/bin/bash

cd /app


LOG_PATH=/app/server_logs

[[ ! -d $LOG_PATH ]] && mkdir -p $LOG_PATH

python main.py > $LOG_PATH/http.log 2>&1 &


# Keep the container running
sleep infinity


