import passport from "passport";
import express from "express";

const router = express.Router();

router.get('', (req, res, next) => {
  try {
    passport.authenticate("google", {
      scope: ["email"],
    })(req, res, next);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;