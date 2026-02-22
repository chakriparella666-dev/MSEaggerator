const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// ──── Local Strategy ────
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return done(null, false, { message: 'No account with that email.' });
      }
      if (!user.password) {
        return done(null, false, { message: 'This account uses Google login. Please sign in with Google.' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// ──── Google OAuth Strategy ────
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id') {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(`Google OAuth callback for: ${profile.emails[0].value}`);
        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          console.log('User found by Google ID');
          return done(null, user);
        }

        // Check if user exists with same email
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          console.log('User found by email, linking Google ID');
          user.googleId = profile.id;
          user.avatar = profile.photos[0]?.value || '';
          await user.save();
          return done(null, user);
        }

        // Create new user
        console.log('Creating new user from Google profile');
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value || '',
          role: 'owner' // Default role for Google login
        });
        console.log(`User created from Google: ${user._id}`);
        return done(null, user);
      } catch (err) {
        console.error('Google Strategy Error:', err);
        return done(err);
      }
    }
  ));
}

module.exports = passport;
