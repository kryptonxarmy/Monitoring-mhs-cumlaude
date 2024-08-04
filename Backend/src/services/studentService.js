const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const registerStudent = async ( { student_id, name, email, doswal, dosbing, username } ) => {
    const user = await prisma.user.findUnique({
        where : {
            username
        }
    })

    const data = await prisma.student.create({
        data : {
            student_id,
            name,
            email,
            advisor_id : doswal,
            supervisor_id : dosbing,
            user_id : user.user_id
        }
    })

    return data
}

const getStudentData = async (data) => {
    const user = await prisma.user.findUnique({
        where : {
            username : data.username
        }
    })

    const student = await prisma.student.findUnique({
        where : {
            user_id : user.user_id
        },
        include : {
            user : true
        }
    })

    if(!student){
        throw new Error('student not found !')
    }

    return student
}

module.exports = {
    registerStudent,
    getStudentData
}

