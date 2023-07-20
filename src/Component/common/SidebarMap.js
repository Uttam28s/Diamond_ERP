import React from 'react'
import { useNavigate } from 'react-router-dom'

const SidebarMap = ({ title, data }) => {
    const navigate = useNavigate()
    let active = localStorage.getItem('sidebar-key')
    return (
        <>
            <div className="ms-4 font-semibold mt-5 mb-3 text-green text-xs ">
                {title}
            </div>
            {
                data.map((val, index) => (
                    <div key={index} onClick={() => {navigate(val?.path); localStorage.setItem('sidebar-key', val?.key)}} className="w-full">
                        <div
                            className={`flex justify-start items-center text-black p-2 ps-[10px] m-1 me-2 ms-2 font-sans cursor-pointer  ${val?.key === active ? "ps-3 bg-gray-200 text-black rounded-md font-semibold border-l-4 border-black" : "border-l-4 border-white"}`}
                        >
                            <div className='mr-2' >
                                {val?.icon}
                            </div>
                            {val.title}
                        </div>
                    </div>
                ))}
        </>
    )
}

export default SidebarMap;