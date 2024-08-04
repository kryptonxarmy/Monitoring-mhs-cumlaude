const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')

const createUser = async ({username, password, role}) => {

  const saltRounds = 10
  const hashsedPassword = await bcrypt.hash(password, saltRounds)     

  const user = await prisma.user.create({
    data : {
      username,
      password_hash : hashsedPassword,
      role
    }
  });

  return user
};

const loginUser = async ({ username, password }) => {
  const user = await prisma.user.findUnique({
    where: { username: username }
  });

  if (!user) {
    return new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return user;
};

const getUserData = async (data) => {
  const user = await prisma.user.findUnique({
      where : {
          username : data.username
      },
      include : {
        student : true,
        lecturer : true
    }
  })

  if(!user){
      throw new Error('user not found !')
  }

  return user
}

const getAllUser = async () => {
  const data = await prisma.user.findMany()
  return data
}



module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getUserData
}
