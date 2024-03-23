const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router(); // Define the router object
const port = 3000;

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies 
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(router); // Use the defined router object

const studentRepo = require("./repositories/student.repository");
const resUtils = require("./utils/response-utils");

//get all students
router.route("/students").get(async (req, res) => {
  studentRepo
    .getAll()
    .then((result) => {
      res.status(resUtils.getStatus(result))
        .send(resUtils.getResult(result));
    });
});

//get student by id
router.route("/students/:id").get(async (req, res) => {
  const id = req.params.id;

  studentRepo
    .getById(id)
    .then((result) => {
      res.status(resUtils.getStatus(result))
        .send(resUtils.getResult(result));
    });
});

//post new student into table
router.route("/students").post(async (req, res) => {
  const student = req.body;

  studentRepo
    .addStudent(student)
    .then((result) => {
      res.status(resUtils.getStatus(result))
        .send(resUtils.getResult(result));
    });
});

//update mark
router.route("/students/:subject/:id/:mark?").put(async (req, res) => {
  const student = {
    subject: req.params.subject,
    studentId: req.params.id,
    mark: req.params.mark,
  };

  studentRepo
    .createOrUpdateMark(student)
    .then((result) => {
      res.status(resUtils.getStatus(result))
        .send(resUtils.getResult(result));
    });
});

//delete student by id
router.route("/students/:id").delete(async (req, res) => {
  const id = req.params.id;

  studentRepo
    .deleteById(id)
    .then((result) => {
      res.status(resUtils.getStatus(result))
        .send(resUtils.getResult(result));
    });
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});