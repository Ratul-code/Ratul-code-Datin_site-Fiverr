import React, { useState } from "react";
import AuthenticationLayout from "../components/AuthenticationLayout";
import { FormikProps, useFormik } from "formik";
import Button from "../components/Button";
import * as Yup from "yup";
import router from "next/router";
import loginPage from "../styles/Login.module.css";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAccessToken } from "../redux/slices/userSlice";
interface loginProps {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  age?: number|string;
  gender: string;
  username: string;
}

const loginValidateSchema = Yup.object().shape({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().min(6,"Your password must have at least 6 character").required("password required"),
  firstname:Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required("firstname is required"),
  lastname:Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required("lastname is required"),
  username:Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required("username is required"),
  gender:Yup.string().required("must select a gender"),
  age:Yup.number().max(60,"Your age cannot exceed 60").required("age is required")
});

const Register = () => {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state=>state);
  const [errormsg,setErrorMsg] = useState<string>()
  const formik: FormikProps<loginProps> = useFormik<loginProps>({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      age: "",
      gender: "",
      username: "",
    },
    onSubmit: async (values,{resetForm}) => {
      try {
        const {data} =  await axios.post("http://localhost:8000/auth/register",{
          ...values
        });
        dispatch(getAccessToken(data.token))
      } catch (error:any) {
        console.log(error)
        setTimeout(()=>{
          setErrorMsg("")
        },5000)
        setErrorMsg(error.response.data?.error)
      }
      resetForm();
    },
    validationSchema: loginValidateSchema,
  });
  if(user.token){
    router.replace("/feed")
    return
  }
  return (
    <AuthenticationLayout>
      <div
        className={`text-[#fff] flex flex-col w-full h-full items-center justify-center mx-auto ${loginPage.login_body}`}
      >
        <div
          className={`${loginPage.bounce_left} border-[#a98046] bg-[rgba(255,255,255,0.11)]  w-full max-w-[500px] flex flex-col justify-center border-solid rounded-3xl py-8 px-4`}
        >
          <h1 className="text-center text-[#a98046] uppercase text-3xl font-semibold tracking-wide w-full">
            Sign up
          </h1>
          <p className=" text-center mt-2 text-red-400">{errormsg}</p>

          <form
            onSubmit={formik.handleSubmit}
            className="mt-7 flex flex-col gap-3 w-full p-4"
          >
            <div className="w-full flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstname" className="uppercase font-semibold">
              firstname
              </label>
              <input
                className=" bg-transparent outline-none  focus:border-[#fff] px-4 py-3 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]"
                id="firstname"
                name="firstname"
                type="text"
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur}
              />
              <p className="text-red-500 ml-2">
                {formik.touched.firstname && formik.errors.firstname}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastname" className="uppercase font-semibold">
              lastname
              </label>
              <input
                className=" bg-transparent outline-none  focus:border-[#fff] px-4 py-3 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]"
                id="lastname"
                name="lastname"
                type="text"
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur}
              />
              <p className="text-red-500 ml-2">
                {formik.touched.lastname && formik.errors.lastname}
              </p>
            </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="uppercase font-semibold">
                username
              </label>
              <input
                className=" bg-transparent outline-none  focus:border-[#fff] px-4 py-3 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]"
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange("username")}
                onBlur={formik.handleBlur}
              />
              <p className="text-red-500 ml-2">
                {formik.touched.username && formik.errors.username}
              </p>
            </div>
            <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="gender" className="uppercase font-semibold">
                gender
              </label>
              <select
                className=" bg-transparent outline-none  focus:border-[#fff] cursor-pointer px-6 py-4 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange("gender")}
                onBlur={formik.handleBlur}
              >
                <option hidden selected >
                Select a gender
                </option>
                <option>
                Male
                </option>
                <option>
                Female
                </option>
                <option>
                Others
                </option>
              </select>
              <p className="text-red-500 ml-2">
                {formik.touched.gender && formik.errors.gender}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="uppercase font-semibold">
                age
              </label>
              <input
                className=" bg-transparent outline-none  focus:border-[#fff] px-4 py-3 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]"
                id="age"
                name="age"
                type="number"
                value={formik.values.age}
                min={0}
                onChange={formik.handleChange("age")}
                onBlur={formik.handleBlur}
              />
              <p className="text-red-500 ml-2">
                {formik.touched.age && formik.errors.age}
              </p>
            </div>

            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="uppercase font-semibold">
                Email
              </label>
              <input
                className=" bg-transparent outline-none  focus:border-[#fff] px-4 py-3 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]"
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur}
              />
              <p className="text-red-500 ml-2">
                {formik.touched.email && formik.errors.email}
              </p>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="password" className="uppercase font-semibold">
                password
              </label>
              <div>
                <input
                  className=" bg-transparent outline-none  focus:border-[#fff] px-4 py-3 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]"
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur}
                />
                <p className="text-red-500 ml-2">
                  {formik.touched.password && formik.errors.password}
                </p>
              </div>
            </div>
            <Button type="submit" bg="#a98046" fontSize="lg">
             REGISTER
            </Button>
            <p className="text-lg text-white text-center">
              Already Have an account?{" "}
              <span
                className="underline cursor-pointer hover:text-[#a98046]"
                onClick={() => {
                  router.replace("/login");
                }}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default Register;
