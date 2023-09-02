import React from 'react'
import { TextField } from '@mui/material';

const AddDeliveryDriver = () => {
    return (
        <>
            <div className='flex flex-col align-items w-full min-h-[85vh]' >
                <div className='px-[20px] h-[64px] font-bold text-xl w-full flex justify-center items-center gap-[20px]'>
                    Add Delivery Driver
                </div>
                <div className='flex justify-center grid grid-cols-2 gap-4 p-10'>
                    <div class="p-4 flex justify-center">
                        <TextField label="First Name" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div class="p-4 flex justify-center">
                        <TextField label="Last Name" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div class="col-span-2 p-4">
                        <TextField label="Email" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div class="p-4 flex justify-center">
                        <TextField label="NIC Number" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div class="p-4 flex justify-center">
                        <TextField label="License Number" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div class="p-4 flex justify-center">
                        <TextField label="Address" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div class="p-4 flex justify-center">
                        <TextField label="Vehicle Number" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div class="col-span-2 flex justify-center pt-5">
                    <button type='submit' className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Add Delivery Driver
                    </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddDeliveryDriver;
