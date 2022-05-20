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

echo starting server...

su -c './startServerScreen.sh' joshua
echo starting > state

while ! nc -z localhost 25565; do sleep 1; done

echo up > state
echo done!