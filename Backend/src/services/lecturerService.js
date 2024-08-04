const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerLecture = async ({ name, email, lecturer_id, username }) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const lecturer = await prisma.lecturer.create({
    data: {
      lecturer_id,  
      name,
      email,
      role: user.role,
      user_id: user.user_id,
    },
  });

  return lecturer;
};

const getLecturerData = async (data) => {
  const user = await prisma.user.findUnique({
    where : {
      username : data.username
    }
  })

  const lecturer = await prisma.lecturer.findUnique({
    where : {
      user_id : user.user_id
    },
    include : {
      user : true
    }
  })
  
  if(!lecturer) {
    throw new Error("Lecturer not found !")
  }

  return lecturer
}

module.exports = {
  registerLecture,
  getLecturerData
};
