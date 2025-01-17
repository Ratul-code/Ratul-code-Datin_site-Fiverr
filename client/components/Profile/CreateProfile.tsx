import { TextareaAutosize, TextField } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import instance from "../../utils/axios";
import { CgProfile } from "react-icons/cg";
import { HiOutlineCheckCircle } from "react-icons/hi";
import * as Yup from "yup";
import Button from "../Button";
import profile from "./Profile.module.css";
import { country_list } from "../../utils/country";
import { useAppSelector } from "../../redux/hooks";
interface profileDataProps {
  profileImage: any;
  bio: string;
  country: string;
  state: string;
  city: string;
  hobby?: string;
  seeking: string;
  minAge: string;
  maxAge: string;
}
const profileValidateSchema = Yup.object().shape({
  bio: Yup.string()
    .required("Bio is required")
    .max(100, "Bio cannot exceed more than 40 characters"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  hobby: Yup.string().trim(),
  seeking: Yup.string().required("Seeking is required"),
  minAge: Yup.number().required("Minimum age is required"),
  maxAge: Yup.string().required("Maximum age is required"),
});
const CreateProfile = () => {
  const [proImage, setProImage] = useState<any>();
  const [step, setStep] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>();
  const {user} = useAppSelector(state=>state);
  const formik: FormikProps<profileDataProps> = useFormik<profileDataProps>({
    initialValues: {
      profileImage: undefined,
      bio: "",
      country: "",
      state: "",
      city: "",
      hobby: "",
      seeking: "",
      minAge: "",
      maxAge: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log({...values})
      const data = new FormData();
      data.append("profileImage",values.profileImage);
      console.log(data);
      await instance.post("/user/createProfile",{...values},{
        headers:{
          Authorization:user.token,
          'Content-Type': `multipart/form-data`
        }
      }).then(res=>console.log(res.data))
      .catch(err=>{
        console.log(err);
      })
      // resetForm();
      // setProImage(undefined)
    },
    validationSchema: profileValidateSchema,
  });
  return (
    <>
      <h1 className="text-2xl text-center font-semibold mt-2">
        Create Your Profile
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-screen max-w-[700px] pt-8 pb-1 flex flex-col "
      >
        {step === 1 ? (
          <>
            <h1 className="text-xl font-bold tracking-wider mb-2">
              1.Add Your Profile Picture
            </h1>
            <div className="flex flex-col  w-full items-center">
              <label
                className="w-[200px] h-auto cursor-pointer flex flex-col items-center hover:scale-105 transition-all duration-200 ease-out shadow-2xl  rounded-lg my-3 relative  overflow-hidden justify-between "
                htmlFor="profileImage"
              >
                <div
                  className={`w-[200px] flex justify-center items-center rounded-full h-[200px] overflow-hidden shadow-2xl relative`}
                >
                  <Image
                    src={`${proImage || "/assets/blankcard.png"}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition={"top"}
                  />
                </div>
                <div
                  className={`flex w-full px-2 justify-between items-center mt-2 bg-black text-white h-[50px]`}
                >
                  <p className="text-lg">
                    {formik.values.profileImage
                      ? "Choose Another ?"
                      : "Add Your Image"}
                  </p>
                  {formik.values.profileImage ? (
                    <HiOutlineCheckCircle size={26} color={"#fff"} />
                  ) : (
                    <CgProfile size={26} color={"#fff"} />
                  )}
                </div>
                <input
                  onBlur={() => formik.handleBlur("profileImage")}
                  onChange={(e: any) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setProImage(reader.result);
                      }
                    };
                    formik.setFieldValue("profileImage", e.currentTarget.files[0]);
                    reader.readAsDataURL(e.currentTarget.files[0]);
                  }}
                  name="profileImage"
                  className="hidden"
                  id="profileImage"
                  type="file"
                />
              </label>
              {!proImage&&<p className="text-red-600 text-lg">{errorMsg}</p>}
            </div>

            <h1 className="text-xl font-bold tracking-wider my-2">
              2.Add Your Brief Bio
            </h1>

            <div className="w-full flex flex-col items-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                name="bio"
                id="bio"
                value={formik.values.bio}
                onChange={formik.handleChange("bio")}
                onBlur={formik.handleBlur("bio")}
                placeholder="Write a short description about yourself"
                style={{
                  width: "96%",
                  border: "2px solid black",
                  padding: "0.8rem",
                  fontSize: "19px",
                }}
              />
              <div className="w-full">
                <p className="pl-[1rem] font-semibold mt-1 text-red-600">
                  {formik.errors.bio}
                </p>
              </div>
            </div>

            <div className="w-full flex justify-end mt-7">
              <Button
                fullWidth
                type="button"
                onClick={() => {
                  if(!proImage){
                    setErrorMsg("Provide Your Profile Image")
                  }
                  if (formik.values.bio &&proImage) {
                    setStep(step + 1);
                  }
                }}
                bg="#000"
              >
                {" "}
                NEXT{" "}
              </Button>
            </div>
          </>
        ) : step === 2 ? (
          <div className="px-2">
            <h1 className="text-xl font-bold tracking-wider mb-2">
              3. Add Information About Yourself.
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-7 px-4">
              <div className="flex w-[230px] flex-col text-lg font-semibold">
              
                 <label className="text-lg capitalize mt-[-o.8px]" htmlFor="country">
                  Country
                </label>
                <select 
                name="country"
                id="country"
                value={formik.values.country}
                onChange={formik.handleChange("country")}
                onBlur={formik.handleBlur("country")}
                className="font-normal w-full focus:border-[3px] py-2 px-2 border-[2px] border-solid border-black rounded-md"
                 >
                  {country_list?.map((country:string,index)=>(
                    <option key={index}>{country}</option>
                  ))}
                </select>
                <p className="mt-1 h-[5px] text-red-600">
                  {formik.touched.country?formik.errors.country:""}
                </p>
              </div>

              <div className="flex flex-col text-lg font-semibold">
                <label className="text-lg  capitalize" htmlFor="state">
                  state
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formik.values.state}
                  onChange={formik.handleChange("state")}
                  onBlur={formik.handleBlur("state")}
                  className="font-normal focus:border-[3px] py-1 px-2 border-[2px] border-solid border-black rounded-md"
                />
                 <p className="mt-1 h-[5px] text-red-600">
                  {formik.touched.state?formik.errors.state:""}
                </p>
              </div>
              <div className="flex flex-col text-lg font-semibold">
                <label className="text-lg  capitalize" htmlFor="city">
                  city
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formik.values.city}
                  onChange={formik.handleChange("city")}
                  onBlur={formik.handleBlur("city")}
                  className="font-normal focus:border-[3px] py-1 px-2 border-[2px] border-solid border-black rounded-md"
                />
                 <p className="mt-1 h-[5px] text-red-600">
                  {formik.touched.city?formik.errors.city:""}
                </p>
              </div>
              <div className="flex flex-col text-lg font-semibold">
                <label className="text-lg capitalize " htmlFor="hobby">
                  hobby
                </label>
                <input
                  type="text"
                  name="hobby"
                  id="hobby"
                  value={formik.values.hobby}
                  onChange={formik.handleChange("hobby")}
                  onBlur={formik.handleBlur("hobby")}
                  className="font-normal focus:border-[3px] py-1 px-2 border-[2px] border-solid border-black rounded-md"
                />
                 <p className="mt-1 h-[5px] text-red-600">
                  {formik.touched.hobby?formik.errors.hobby:""}
                </p>
              </div>
            </div>

            <h1 className="text-xl font-bold tracking-wider mt-8 mb-2">
              4. Add Information About Interests.
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-5 px-4">
            <div className="flex w-[230px] flex-col text-lg font-semibold">
              
              <label className="text-lg capitalize mt-[-o.8px]" htmlFor="seeking">
               Seeking
             </label>
             <select 
             name="seeking"
             id="seeking"
             value={formik.values.seeking}
             onChange={formik.handleChange("seeking")}
             onBlur={formik.handleBlur("seeking")}
             className="font-normal w-full focus:border-[3px] py-2 px-2 border-[2px] border-solid border-black rounded-md"
              >
               <option>Male</option>
               <option>Female</option>
               <option>Any</option>
             </select>
             <p className="mt-1 h-[5px] text-red-600">
               {formik.touched.seeking?formik.errors.seeking:""}
             </p>
           </div>

              <div className="flex flex-col text-lg font-semibold">
                <label className="text-lg  capitalize" htmlFor="minAge">
                  Minimum Age
                </label>
                <input
                  type="number"
                  name="minAge"
                  id="minAge"
                  min={0}
                  value={formik.values.minAge}
                  onChange={formik.handleChange("minAge")}
                  onBlur={formik.handleBlur("minAge")}
                  className="font-normal focus:border-[3px] py-1 px-2 border-[2px] border-solid border-black rounded-md"
                />
                 <p className="mt-1 h-[5px] text-red-600">
                  {formik.touched.minAge?formik.errors.minAge:""}
                </p>
              </div>
              <div className="flex flex-col text-lg font-semibold">
                <label className="text-lg  capitalize" htmlFor="maxAge">
                  Maximum Age
                </label>
                <input
                  type="number"
                  name="maxAge"
                  id="maxAge"
                  min={0}
                  value={formik.values.maxAge}
                  onChange={formik.handleChange("maxAge")}
                  onBlur={formik.handleBlur("maxAge")}
                  className="font-normal focus:border-[3px] py-1 px-2 border-[2px] border-solid border-black rounded-md"
                />
                 <p className="mt-1 h-[5px] text-red-600">
                  {formik.touched.maxAge?formik.errors.maxAge:""}
                </p>
              </div>
            </div>
            <div>

            </div>
            <div className="w-full gap-3 flex justify-between mt-7">
              <Button
                onClick={()=>setStep(state=>state-1)}
                bg="#000"
              >
                {" "}
                Back
              </Button>
              <Button
                
                type="submit"
                bg="#000"
              >
                {" "}
                SHARE MY PROFILE{" "}
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default CreateProfile;
