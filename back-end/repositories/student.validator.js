function validate(student) {
  if (!student) {
    return {
      isValid: false,
      message: "Bad request.",
    };
  }

  if (!isValidFirstName(student.firstName)) {
    return {
      isValid: false,
      message: "First name should start with a capital letter and contain only lowercase Latin letters.",
    };
  }

  if (!isValidLastName(student.lastName)) {
    return {
      isValid: false,
      message: "Last name should start with a capital letter and contain only lowercase Latin letters.",
    };
  }

  if (!isValidMark(student.historyMark) || !isValidMark(student.mathMark) || !isValidMark(student.physicalEduMark)) {
    return {
      isValid: false,
      message: "Mark should be between 1 and 6.",
    };
  }

  return {
    isValid: true,
  }
}

function validMark(mark) {
  if (isValidMark(mark)) {
    return {
      isValid: true,
    }
  }

  return {
    isValid: false,
    message: "Mark should be between 1 and 6.",
  };
}

function isValidFirstName(firstName) {
  const regex = /^[A-Z][a-z]+$/;
  return regex.test(firstName);
}

function isValidLastName(lastName) {
  const regex = /^[A-Z][a-z]+$/;
  return regex.test(lastName);
}

function isValidMark(mark) {
  if (mark === undefined || mark === null) {
    return true;
  }

  return mark >= 1 && mark <= 6;
}

module.exports = {
  validate,
  validMark: validMark,
};