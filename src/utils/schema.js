import * as Yup from "yup";

export const login = Yup.object({
  email: Yup.string()
    .trim()
    .required("The email field is required")
    .email("The  email is invalid"),
  password: Yup.string()
    .trim()
    .required("The password field cannot be empty")
    .min(8, "Password should be minimum of 8 character"),
});

export const signup = Yup.object({
  username: Yup.string()
    .trim()
    .required("The username field is required")
    .min(5, "Username should be minimum of 5 character"),
  email: Yup.string()
    .trim()
    .required("The email field is required")
    .email("The  email is invalid"),
  password: Yup.string()
    .trim()
    .required("The password field cannot be empty")
    .min(8, "Password should be minimum of 8 character"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Password does not match")
    .required("The password field cannot be empty"),
});
