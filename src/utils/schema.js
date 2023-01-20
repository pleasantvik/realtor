import * as Yup from "yup";

export const login = Yup.object({
  email: Yup.string()
    .trim()
    .required("The email field is required")
    .email("The  email is invalid"),
  password: Yup.string()
    .trim()
    .required("The password field cannot be empty")
    .min(6, "Password should be minimum of 6 character"),
});

export const signup = Yup.object({
  username: Yup.string()
    .trim()
    .required("The username field is required")
    .min(3, "Username should be minimum of 3 character"),
  email: Yup.string()
    .trim()
    .required("The email field is required")
    .email("The  email is invalid"),
  password: Yup.string()
    .trim()
    .required("The password field cannot be empty")
    .min(6, "Password should be minimum of 6 character"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Password does not match")
    .required("The password field cannot be empty"),
});

export const forgotPassword = Yup.object({
  email: Yup.string()
    .trim()
    .required("The email field is required")
    .email("The  email is invalid"),
});

export const updateProfile = Yup.object({
  username: Yup.string().trim().required("The email field is required"),
  email: Yup.string()
    .trim()
    .required("The email field is required")
    .email("The  email is invalid"),
});
export const createList = Yup.object({
  type: Yup.string(),
  offer: Yup.string(),
  parks: Yup.string(),
  furnished: Yup.string(),
  propertyName: Yup.string()
    .trim()
    .required("The name of property cannot be empty")
    .min(10, "Property name must be minimum of 10 characters")
    .max(32, "Property name must be maximum of 32 characters"),
  address: Yup.string().trim().required("The address field cannot be empty"),
  description: Yup.string()
    .trim()
    .required("The description field cannot be empty"),
  beds: Yup.number()
    .required("Bedroom number is required")
    .min(1, "Bedspace cannot be lesser than 1"),
  bathrooms: Yup.number()
    .required("Bathroom number is required")
    .min(1, "Bathroom cannot be lesser than 1"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price cannot be lesser than 1"),
  discountPrice: Yup.number()
    .required("discount price is required")
    .min(1, "discount price cannot be lesser than 1")
    .max(Yup.ref("price"), "Cannot exceed price"),
});
