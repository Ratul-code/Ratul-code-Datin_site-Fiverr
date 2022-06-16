import React from "react";
import Button from "../../Button";
const index = () => {
  return (
    <div className="flex flex-col gap-10 w-full max-w-[1200px] mx-auto items-center justify-between">
      <div className="text-center">
        <h1 className="text-3xl leading-[35px] tracking-wide uppercase">
          singles are admired and appreciated here much more than other sites.
        </h1>
        <div className="w-[30%] h-[5px] rounded-[7px] mt-6 mx-auto bg-secondary"></div>
      </div>

      
      <div className="w-full flex justify-center gap-6 items-start">
        <div className="">
          <h1 className="text-lg font-bold">
            MY SLOGAN – A TRUSTED ONLINE DATING SITE FOR SINGLES
          </h1>
          <p className="mt-3 w-full text-lg max-w-[450px]">
          <span className="font-semibold uppercase">my slogan</span>  is the first platform to use a proprietary matching system we developed to match you with highly compatible singles. <span className="font-semibold uppercase">my slogan</span> matching is based on using its 32 DIMENSIONS® model to match couples based on features of compatibility found in thousands of successful relationships.
          </p>
          {/* <p className="mt-3 w-full text-lg max-w-[450px]">
          eharmony is committed to helping singles find love every day and we are confident in our ability to do so. eharmony matches single women and men for lasting and fulfilling relationships.
          </p>
          <p className="mt-3 w-full text-lg max-w-[450px]">
          Traditional Internet dating can be challenging for those singles looking for love that lasts – but eharmony is not a traditional dating site. Of all the single men or women you may meet online, very few will be compatible with you specifically, and it can be difficult to determine the level of compatibility of a potential partner through methods of other dating services – swiping profile photos, browsing classified ads or online personals. Our Compatibility Matching System does the work for you by narrowing the field from thousands of single prospects to match you with a select group of compatible matches with whom you can build a quality relationships.
          </p> */}
        </div>
        <div>
        <h1 className="text-lg font-bold">
        FREE ONLINE DATING ADVICE AND COMMUNITY
          </h1>
          <p className="mt-3 w-full text-lg max-w-[450px]">
          We at <span className="font-semibold uppercase">my slogan</span> want you to find love and romance and to make it last. To assist you in this quest, we offer free dating advice at Love and Harmony. Meet people in our online dating community and receive advice from our relationship experts.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
            <h1 className="uppercase text-3xl font-bold">Four EASY STEPS TO FIND THE RIGHT MATCH</h1>
            <ol className="list-disc text-2xl ">
              <li className="ml-4" >Complete our compatibility quiz to get quality connections based on key areas of personality.</li>
              <li className="ml-4" >Answer some basics to help us narrow down people who meet your personal criteria.</li>
              <li className="ml-4" >Review the profiles of everyone who we’ve determined to be a right match for you.</li>
              <li className="ml-4" >Pick a membership that fits your needs and start communicating at your own pac.</li>
            </ol>
          </div>

    </div>
  );
};

export default index;
