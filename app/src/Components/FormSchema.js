import * as yup from "yup";

const FormSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default FormSchema;
