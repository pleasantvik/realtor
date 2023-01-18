import { useFormik } from "formik";
import { forgotPassword } from "utils/schema";

import loginImg from "resources/images/lock.jpg";
import { Link } from "react-router-dom";
import { Oauth } from "components/Oauth";

export const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPassword,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <section className="bg-gray-200">
      <h1 className="text-3xl text-center pt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] md:mb-6 mb-12">
          <img
            src={loginImg}
            alt="A cage under lock"
            className="w-[80%] mx-auto rounded-2xl"
          />
        </div>
        <div className="w-[80%] mx-auto md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label htmlFor="email" className="text-[#c69963] font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                {...formik.getFieldProps("email")}
                placeholder="Email address"
                autoComplete="off"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>

            <div className="flex justify-between flex-col sm:flex-row whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-[#c69963] hover:text-[#b28451] transition duration-200 ease-in-out font-bold"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-[#101d2c] text-[#f9f7f6] px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#162331] transition duration-200 ease-in-out hover:shadow-lg"
            >
              Send Password Reset Email
            </button>
            <div className="my-4 before:border-t flex before:flex-1 items-center before:border-[#aaa] after:border-t after:flex-1  after:border-[#aaa]">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Oauth />
          </form>
        </div>
      </div>
    </section>
  );
};
