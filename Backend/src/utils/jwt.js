const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const secret_key = process.env.JWT_SECRET || 'default_secret';

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.user_id,
      username: user.username,
      role: user.role,
    },
    secret_key,
    { expiresIn: '12h' }
  );
};

const saveToken = async (userId, token) => {
  await prisma.token.create({
    data: {
      user_id: userId,
      token: token
    }
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        return reject(new Error("Invalid or expired token"));
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken
};
