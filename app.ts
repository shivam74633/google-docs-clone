import express from "express";
import path from "path";
import session from "express-session";
import socialRoutes from "./socialLogin/routes/index";
import passportSession from "./startup/passportSession";
import routes from './routes/index';

let app;

async function init() {
 
  app = express();

  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
    })
  );

  // Passport Session
  passportSession(app);
  
  // setup routes
  const modulePath = path.join(__dirname, "modules");
  await routes(app, "routes", modulePath);

  // Social Login Routes
  socialRoutes(app);

  const host = "http://localhost";
  const port = 3000;

  app.listen(3000, () => {
    console.info(`app online @ ${host}:${port}`)
  });
}

// run app
init().catch((e) => {
  throw e;
});

module.exports.app = app;

