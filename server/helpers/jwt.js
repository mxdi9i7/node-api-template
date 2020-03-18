import expressJwt from 'express-jwt';
import Users from '../models/User';
export const config = {
  secret: 'pwitter',
};

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/auth/login',
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await Users.findOne({ phone: payload.phone });

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}

export default jwt;
