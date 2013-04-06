start mongod.exe --rest --dbpath ./db
start node --web-port=8080 "D:\dev\nodejs\node_modules\node-inspector\bin\inspector.js" %*
start node --debug-brk app
start "C:\Program Files (x86)\Google\Chrome\Application" http://localhost:8080/debug?port=5858
sleep 5s
start "C:\Program Files (x86)\Google\Chrome\Application" http://localhost:3000/