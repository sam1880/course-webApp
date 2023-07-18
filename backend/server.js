const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

app = express()

app.use(bodyParser.json())
app.use(cors())

const PORT = 3000

var courses = []

function getCourses(req,res){
    res.status(200).send(courses)
}

function postCourses(req, res){
    var courseObj = {
        id: Math.floor(Math.random() * 100000),
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    }
    courses.push(courseObj)
    console.log(courseObj)
    res.status(201).json(courseObj)
}

app.get("/courses", getCourses)
app.post("/courses", postCourses)

app.listen(PORT, () => console.log(`server is running at ${PORT}`))