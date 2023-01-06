import httpServer from "./server";
import mongo from "./mongo";

//import "dotenv-defaults/config.js";


mongo.connect();
const port = process.env.PORT || 4000;

httpServer.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
