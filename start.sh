echo starting server...

su -c './startServerScreen.sh' joshua
echo starting > state

while ! nc -z localhost 25565; do sleep 1; done

echo up > state
echo done!