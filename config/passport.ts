import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export default (passport: any) => {
  // // =========================================================================
  // // GOOGLE =================================================================
  // // =========================================================================
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "60511277946-kgmiqeu9rvbg4ta0p1onk24d8mc74gt7.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/api/auth/google/callback",
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) {
        const user: any = {};
        user.name = profile.displayName;
        user.socialId = profile.id;
        user.socialAccount = "Google";
        user.email = profile.emails ? profile.emails[0].value : null;
        user.imageUrl = profile.photos ? profile.photos[0].value : null;
        return done(null, user);
      }
    )
  );
};
