import React from 'react'
import Button from "../Button";
import filterpaper from "./FitlerPaper.module.css"
const FilterPaper = () => {
  return (
    <div className={`${filterpaper.filterpaper} bg-[#0000001f] flex flex-wrap gap-6 justify-evenly items-center mt-[65px] mx-3 rounded-md p-3`}>
        <div className='flex flex-col gap-1'>
            <label htmlFor="seeking" className='text-lg' >Seeking</label>
            <select className={`${filterpaper.select_selected}`} name="seeking" id="seeking">
                <option hidden disabled selected>Select any gender</option>
                <option >Male</option>
                <option >Female</option>
                <option >Any</option>
            </select>
        </div>

        <div className='flex flex-col gap-1'>
        <label className='text-lg' >Age</label>
        <div className='flex items-center gap-2 max-w-[100px]'>
            <input className='w-full' name='minage' type="number" min={0} />
            <input className='w-full' name='maxage' type="number" min={0} />
        </div>
        </div>

        <div className='flex flex-col gap-1'>
        <label htmlFor="country" className='text-lg' >Country</label>
            <select name="country" id="country">
            <option hidden disabled selected>Select any country</option>
                <option >USA </option>
                <option >Cnada</option>
                <option >Germany</option>
            </select>
        </div>
        <div className='flex flex-col gap-1'>
        <label htmlFor="state" className='text-lg' >State/Province</label>
            <select name="state" id="state">
            <option hidden disabled selected>Any state</option>
                <option >Washington </option>
                <option >Berlin</option>
                <option >California</option>
            </select>
        </div>
        <div className='flex flex-col gap-1'>
        <label htmlFor="city" className='text-lg' >City</label>
            <select name="state" id="state">
            <option hidden disabled selected>Any city</option>
                <option >Paris </option>
                <option >Berlin</option>
                <option >Rome</option>
            </select>
        </div>
        <Button bg='#000' btnType='outline' >Search</Button>
    </div>
  )
}

export default FilterPaper