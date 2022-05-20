#!/bin/bash
cd ..
echo stopping server...

echo stopping > state

PID=$(pgrep java)

kill $PID
while kill -0 $PID; do 
    sleep 1
done

echo down > state