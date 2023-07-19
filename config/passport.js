const GoogleStrategy = require("passport-google-oauth20").Strategy;

const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "252835876115-83lmf7n80pv0tr8ojebibg0gmlmpi1ao.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

// GITHUB_CLIENT_ID = "your id";
// GITHUB_CLIENT_SECRET = "your id";
FACEBOOK_APP_ID = "217899804473753";
FACEBOOK_APP_SECRET = "e014bcfcd530277716d8126663d37255";
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        const email = profile.emails[0].value;
        console.log('profile',profile)
        console.log('accessToken', accessToken)
        done(null, profile);
      }
    )
  );



passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
