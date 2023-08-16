import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export default (passport: any) => {
  // // =========================================================================
  // // GOOGLE =================================================================
  // // =========================================================================
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "",
        clientSecret: "",
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
