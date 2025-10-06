import Logo from '../assets/img/logo.svg?react';
import TempToggleBtn from "./TempToggleBtn.jsx";


function UnitBar(){


    return(
        <>
            <div className='flex justify-between p-4 mb-10'>
                    <Logo className="absolute left-2 z-10 w-42"/>
                    <TempToggleBtn/>
            </div>
            <h1 className='text-center p-4 text-white text-6xl font-medium mb-8'>How's the sky looking today?</h1>
        </>
    )
}

export default UnitBar