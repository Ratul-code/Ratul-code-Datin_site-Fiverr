import React, { useState } from "react";
import AuthenticationLayout from "../components/AuthenticationLayout";
import { FormikProps, useFormik } from "formik";
import Button from "../components/Button";
import * as Yup from "yup";
import { useRouter } from "next/router";
import loginPage from "../styles/Login.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAccessToken } from "../redux/slices/userSlice";
import instance from "../utils/axios";
interface loginProps {
  email: string;
  password: string;
  remember:boolean
}

const loginValidateSchema = Yup.object().shape({
  email:Yup.string().email().required("email is required"),
  password:Yup.string().required("password required")
})

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state=>state);
  const [errormsg,setErrorMsg] = useState<string>()
  const formik: FormikProps<loginProps> = useFormik<loginProps>({
    initialValues: {
      email: "",
      password: "",
      remember:false
    },
    onSubmit: async (values,{resetForm}) => {
      try {
        const {data} =  await instance.post("https://ave-dating-site.herokuapp.com/auth/login",{
          ...values
        });
        dispatch(getAccessToken(data.token))
      } catch (error:any) {
        setTimeout(()=>{
          setErrorMsg("")
        },5000)
        setErrorMsg(error.response.data?.error)
      }
      resetForm();
    },
    validationSchema:loginValidateSchema
  });
  if(user.token){
    router.replace("/feed")
    return
  }
  return (
    <AuthenticationLayout>
     <div className={`text-[#fff] flex flex-col w-full h-full items-center justify-center mx-auto ${loginPage.login_body}`}>
    <div className={`${loginPage.bounce_left}  bg-[rgba(255,255,255,0.11)] mx-2 w-full max-w-[500px] h-full max-h-[600px] flex flex-col justify-center border-solid rounded-3xl py-8 px-4`}>

   
    <h1 className="text-center text-[#a98046] uppercase text-3xl font-semibold tracking-wide w-full" >Sign in</h1>
    <p className=" text-center mt-2 text-red-400">{errormsg}</p>


    <form onSubmit={formik.handleSubmit} className="mt-7 flex flex-col gap-8 w-full p-4">
        <div className="flex flex-col gap-1">
            <label htmlFor="email" className="uppercase font-semibold">Email</label>
            <input className=" bg-transparent outline-none  focus:border-[#fff] px-4 py-3 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]" id="email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur} />
            <p className="text-red-500 ml-2">{formik.touched.email&&formik.errors.email}</p>
        </div>
        <div className="flex flex-col gap-1">
        <label htmlFor="password" className="uppercase font-semibold">password</label>
            <div>
            <input className=" bg-transparent outline-none  focus:border-[#fff] px-4 py-3 text-[#a98046] w-full border-[#a98046] border-[1px] border-solid rounded-[7px]"  id="password" name="password" type="password" value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur}  />
            <p className="text-red-500 ml-2">{formik.touched.password&&formik.errors.password}</p>
            </div>
        </div>
        <div className="flex gap-2 justify-between w-full px-2 flex-wrap">
          <div>
            <div className="flex gap-2 items-center">
            <input id="remember" name="remember" className="bg-black  cursor-pointer" type="checkbox" checked={formik.values.remember} onChange={formik.handleChange("remember")} />
            <label htmlFor="remember">Remember Me</label>
            </div>
            <p className="hidden sm:flex text-sm text-gray-400">Dont check if you are public/shared device</p>
          </div>
            <p onClick={()=>{router.push("/forgotpassword")}} className="underline cursor-pointer hover:text-[#a98046]" >Forgot Password?</p>
        </div>
        <Button type="submit" bg="#a98046" fontSize="lg">LOG IN</Button>
        <p className="text-lg text-white text-center mt-[-15px]">Dont Have an account?{" "}<span className="underline cursor-pointer hover:text-[#a98046]" onClick={()=>{router.replace("/register")}}>Join Now</span></p>
    </form>

    </div>
  </div>
    </AuthenticationLayout>
  );
};

export default Login;
