import React from "react";
import { useFormik, ErrorMessage } from "formik";
import { validate } from "../validations";
import { InputField } from "components/common";
// import { InputField } from "./";

const Formik = () => {
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
      },
      validate,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <form
      style={{ width: "50%", margin: "auto", padding: "1rem" }}
      onSubmit={handleSubmit}
    >
      <InputField
        inputLabel="First Name"
        name="firstName"
        id="firstName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.firstName}
        error={touched.firstName && errors.firstName ? errors.firstName : null}
        inputType="text"
      />
      <InputField
        inputLabel="Last Name"
        name="lastName"
        id="lastName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.lastName}
        error={touched.lastName && errors.lastName ? errors.lastName : null}
        inputType="text"
      />
      <InputField
        inputLabel="Email"
        name="email"
        id="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        error={touched.email && errors.email ? errors.email : null}
        inputType="text"
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Formik;
