const config = require("../data_access/db-config");
const queries = require("./sql-queries");
const sql = require("mssql");
const studentValidator = require("./student.validator");
const httpCodes = require("../utils/httpCodes");
const studentSubject = require("./subject.enum");

sql.on("error", (err) => {
  console.error(err);
});

//get all students
async function getAll() {
  try {
    const connection = await sql.connect(config);

    const response = await connection
      .request()
      .query(queries.students.getAll)
      .then((response) => {
        return response?.recordset ?? [];
      });

    return {
      status: httpCodes.success,
      message: `Student list successfully fetched.`,
      data: response,
    }
  } catch (error) {
    return getError(error);
  }
}

//get student by id
async function getById(studentId) {
  try {
    const connection = await sql.connect(config);

    if (!(await checkIfStudentExists(studentId, connection))) {
      return {
        status: httpCodes.notFound,
        message: `Student with Id=${studentId} does not exist.`,
      }
    }

    const response = await connection
      .request()
      .input("studentId", sql.Int, studentId)
      .query(queries.students.getById)
      .then((response) => {
        return response?.recordset ?? [];
      });

    return {
      status: httpCodes.success,
      message: `Student with Id=${studentId} has been retrieved.`,
      data: response[0],
    };
  } catch (error) {
    return getError(error);
  }
}

//create new student
async function addStudent(student) {
  try {
    const validationResult = studentValidator.validate(student);
    if (validationResult.isValid !== true) {
      return {
        status: httpCodes.badRequest,
        message: validationResult?.message,
      };
    }

    const connection = await sql.connect(config);

    const createResponse = await connection
      .request()
      .input("firstName", sql.VarChar(50), student.firstName)
      .input("lastName", sql.VarChar(50), student.lastName)
      .input("historyMark", sql.Int, student.historyMark)
      .input("mathMark", sql.Int, student.mathMark)
      .input("physicalEduMark", sql.Int, student.physicalEduMark)
      .query(queries.students.addStudent)
      .then((response) => {
        return response.recordset[0];
      });

    const getResponse = await getById(createResponse.StudentId);

    if (getResponse.status !== httpCodes.success) {
      return getResponse;
    }

    return {
      status: httpCodes.created,
      message: "Student added successfully.",
      data: getResponse.data,
    }
  } catch (error) {
    return getError(error);
  }
}

//update students mark
async function createOrUpdateMark(data) {
  const { studentId, mark, subject } = data;
  
  let sqlQuery = undefined;
  switch (data.subject) {
    case studentSubject.history:
      sqlQuery = queries.students.createOrUpdateHistoryMark;
      break;
    case studentSubject.math:
      sqlQuery = queries.students.createOrUpdateMathMark;
      break;
    case studentSubject.physicalEdu:
      sqlQuery = queries.students.createOrupdatePhysicalEduMark;
      break;
    default:
      throw new Error('Not supported subject!');
  }

  const response = await updateMark(data, sqlQuery);

  if (response.status === httpCodes.success) {
    response.message = `Student's with Id=${studentId} mark in ${subject} has been successfully set to ${mark ?? '(empty)'}.`;
  }

  return response;
}

async function updateMark(student, updateQuery) {
  try {
    const { studentId, mark } = student;

    const validationResult = studentValidator.validMark(mark);
    if (validationResult.isValid !== true) {
      return {
        status: httpCodes.badRequest,
        message: validationResult?.message,
      };
    }

    const connection = await sql.connect(config);

    if (!(await checkIfStudentExists(studentId, connection))) {
      return {
        status: httpCodes.notFound,
        message: `Student with Id=${studentId} does not exist`,
      }
    }

    await connection
      .request()
      .input("studentId", sql.Int, studentId)
      .input("mark", sql.Int, mark)
      .query(updateQuery)
      .then(_ => {
        return;
      });

    const getResponse = await getById(studentId);

    if (getResponse.status !== httpCodes.success) {
      return getResponse;
    }

    return {
      status: httpCodes.success,
      data: getResponse.data,
    }
  } catch (error) {
    return getError(error);
  }
}

//delete student by id
async function deleteById(studentId) {
  try {
    const connection = await sql.connect(config);

    if (!(await checkIfStudentExists(studentId, connection))) {
      return {
        status: httpCodes.notFound,
        message: `Student with Id=${studentId} does not exist`,
      }
    }

    const result = await connection
      .request()
      .input("studentId", sql.Int, studentId)
      .query(queries.students.deleteById);
console.log(result);
    return {
      status: httpCodes.success,
      message: `Student with Id=${studentId} has been deleted successfully.`,
    }
  } catch (error) {
    return getError(error);
  }
}

async function checkIfStudentExists(studentId, connection) {
  try {
    const response = await connection
      .request()
      .input("studentId", sql.Int, studentId)
      .query(queries.students.exists)
      .then((response) => {
        return response.recordset[0];
      });

    return response.Exists;
  } catch (error) {
    return false;
  }
}

function getError(error) {
  console.error(error);
  return {
    status: httpCodes.serverError,
    error: error,
  }
}

module.exports = {
  getAll: getAll,
  getById: getById,
  addStudent: addStudent,
  createOrUpdateMark: createOrUpdateMark,
  deleteById: deleteById,
};
