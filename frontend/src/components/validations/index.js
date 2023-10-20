const credentialsValidate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  } else if (values.username.length > 8) {
    errors.username = "Username exceed the character limit";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length > 8) {
    errors.password = "Password exceed the character limit";
  }
  return errors;
};

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export { credentialsValidate, validate };
