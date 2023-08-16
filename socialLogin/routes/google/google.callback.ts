import passport from "passport";
import express from "express";

const router = express.Router();

router.get("", (req, res, next) => {
  try {
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/login",
    })(req, res, next);

  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.use((req, res, next) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(req.user)

    res.redirect("/")

});

export default router;
