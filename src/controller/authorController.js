const AuthorModel = require("../models/authorModel")
const emailValidator = require('express-validator')
const jwt= require ("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        const { email } = req.body 

        const verifyEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(author.email)) ? true : false
        
        if (!verifyEmail) {
            return res.status(400).send({ msg: "email not valid" })
        } else {
            let authorCreated = await AuthorModel.create(author)
            res.status(200).send({ data: authorCreated })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


const authorLogin = async function (req, res) {
    try {
        let userName = req.body.email;
        let password = req.body.password;
        let author = await AuthorModel.findOne({ email: userName, password: password })
        console.log(author)
        if (!author)
        return res.send({ status: false, msg: "username or the password is not corerct" });

        if (author) {

            let token = jwt.sign(
                {
                    authorId: author._id
                },
                "First project"
            );
            res.setHeader("x-auth-token", token);
            res.send({ status: true, data: token });
        }
      
}
 catch (error) {
} res.status(500).send({ status: false, msg: "user not found" })};

module.exports.createAuthor = createAuthor
module.exports.authorLogin = authorLogin