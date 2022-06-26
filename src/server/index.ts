import { ServerApp } from "./Network/App";

/*const app: Application = 
app.use(express.static(path.join(__dirname, "../../public")));
app.get("/bundle.js", (request, response) => {
  response.sendFile(path.join(__dirname, "../../dist/client/bundle.js"));
});

var server: http.Server | https.Server;
var url: string;
if (process.argv.length >= 2 && process.argv[2] == "dev") {
  server = getLocalServer();
  url = "localhost:3000";
} else {
  server = getRemoteServer();
  url = "server.natehroylance.com:3000";
}

var serverClass: ServerClass = new ServerClass(server);
serverClass.start(3000, url);

function getLocalServer(): http.Server {
  return http.createServer(app);
}
function getRemoteServer(): https.Server {
  return https.createServer(
    {
      cert: fs.readFileSync("/etc/letsencrypt/live/server.natehroylance.com/cert.pem"),
      key: fs.readFileSync("/etc/letsencrypt/live/server.natehroylance.com/privkey.pem"),
    },
    app
  );
}*/

let is_development: boolean = false;
if (process.argv.length >= 2 && process.argv[2] == "dev") {
  is_development = true;
}

let app: ServerApp = new ServerApp(is_development);
app.init();
