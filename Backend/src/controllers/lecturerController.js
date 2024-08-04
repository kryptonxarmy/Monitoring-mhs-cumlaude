const lecturerServices = require('../services/lecturerService')

const registerLecturer = async (req,res) => {
    const  { name, email, lecturer_id, username } = req.body

    try {
        const data = await lecturerServices.registerLecture({
            name, email, lecturer_id, username
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(401).send(error.message)
    }
    
}

const getLecturerData = async (req, res) => {
    const username = req.user

    try {
      const data = await lecturerServices.getLecturerData(username)
      res.status(200).send(data)
    } catch (error) {
        res.status(401).send('Error : ' + error.message)
    }
}

module.exports = {
    registerLecturer,
    getLecturerData
}