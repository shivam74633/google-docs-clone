import passport from "passport";
import passportSetup from "../config/passport";

export default (app: any) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user: any, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj: any, cb) {
    cb(null, obj);
  });

  passportSetup(passport);
};
