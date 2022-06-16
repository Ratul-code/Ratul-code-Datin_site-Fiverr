import React from "react";
import AuthenticationLayout from "../components/AuthenticationLayout";
import { FormikProps, useFormik } from "formik";
import Button from "../components/Button";
import * as Yup from "yup";
import router from "next/router";
import loginPage from "../styles/Login.module.css";
interface loginProps {
  email: string;
}

const loginValidateSchema = Yup.object().shape({
  email:Yup.string().email().required("email is required"),
})

const ForgotPassword = () => {
  const formik: FormikProps<loginProps> = useFormik<loginProps>({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {console.log(values)},
    validationSchema:loginValidateSchema
  });
 
  return (
    <AuthenticationLayout>
     <div className={`text-[#fff] flex flex-col w-full h-full items-center justify-center mx-auto ${loginPage.login_body}`}>
    <div className={`${loginPage.bounce_left}  bg-[rgba(255,255,255,0.11)] w-full max-w-[500px] h-full max-h-[600px] flex flex-col justify-center border-solid rounded-3xl py-8 px-4`}>

   
    {/* <h1 className="text-center text-[#a98046] uppercase text-3xl font-semibold tracking-wide w-full" >Forgot Password</h1> */}


    <form onSubmit={formik.handleSubmit} className="mt-7 flex flex-col gap-8 w-full p-4">
        <div className="flex flex-col gap-1">
            <label htmlFor="email" className="uppercase font-semibold">Email</label>
            <input className=" bg-transparent outline-none  focus:border-[#fff] px-4 py-3 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]" id="email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur} />
            <p className="text-red-500 ml-2">{formik.touched.email&&formik.errors.email}</p>
        </div>
        <Button type="submit" bg="#a98046" fontSize="lg">SEND OTP</Button>
    </form>

    </div>
  </div>
    </AuthenticationLayout>
  );
};

export default ForgotPassword;
