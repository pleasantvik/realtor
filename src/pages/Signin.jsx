import React from "react";
import loginImg from "resources/images/login.jpg";
export const Signin = () => {
  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Sign in</h1>
      <div>
        <div>
          <img src={loginImg} alt="A cage under lock" />
        </div>
        <form>Form</form>
      </div>
    </section>
  );
};
