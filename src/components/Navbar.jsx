import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar bg-cyan-900 pt-3 md:p-0 rounded-b-3xl">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-normal relative md:left-8 gap-2">
            {/* <img className=" h-8" src="src\assets\logo1.png" alt="" /> */}
            <ul className="flex flex-col md:flex-row font-semibold items-center relative md:left-4 w-full">
            <img className=" h-8" src="src\assets\logo1.png" alt="" />

                <li className="mt-2 md:mt-0 flex justify-center px-6 py-5 h-full w-full md:w-auto text-cyan-50 hover:cursor-pointer transition-all duration-200 hover:bg-cyan-600 hover:text-white">Home</li>
                <li className="flex justify-center px-7 py-5 h-full w-full md:w-auto text-cyan-50 hover:cursor-pointer transition-all duration-200 hover:bg-cyan-600 hover:text-white">Learn</li>
                <li className="flex justify-center px-7 py-5 h-full w-full md:w-auto text-cyan-50 hover:cursor-pointer transition-all duration-200 hover:bg-cyan-600 hover:text-white">Documentation</li>
                <li className="flex justify-center px-7 py-5 h-full w-full md:w-auto rounded-b-3xl md:rounded-none text-cyan-50 hover:cursor-pointer transition-all duration-200 hover:bg-cyan-600 hover:text-white">Downloads</li>
            </ul>

        </div>       
    
      {/* <div className="h-px bg-cyan-700"></div> */}
    </nav>
  )
}

export default Navbar
