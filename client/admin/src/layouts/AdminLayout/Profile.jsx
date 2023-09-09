import {useState,useEffect} from 'react'
import { TextField } from '@mui/material';
import axios from "axios";

const AdminProfile = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nic,setNic]=useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");

    var admin = JSON.parse(localStorage.getItem("AdminInfo"));
    const id = admin._id


    useEffect(() => {
        function GET() {
          axios
            .get(`http://localhost:8080/admin/get/${id}`)
            .then((res) => {
                setFirstname(res.data.admin.firstname)
  setLastname(res.data.admin.lastname)
  setEmail(res.data.admin.email)
  setPassword(res.data.admin.password)
setNic(res.data.admin.nic)
setAddress(res.data.admin.address)
setPhone(res.data.admin.phone)
              
            })
            .catch((err) => {
              alert(err.message);
            });
        }
    
        GET();
      }, []);
      // setFirstname(admin.firstname)
  // setLastname(admin.lastname)
  // setEmail(admin.email)
//   setPassword(admin.password)
// setNic(admin.nic)
// setAddress(admin.address)
// setPhone(admin.phone)
// setImage(admin.image)


async function updateData(e) {
    e.preventDefault();


    const updateAdmin = {firstname,
      lastname,
      email,
      password,
      nic,
      address,
      phone,
      

    };
      await axios
      .put(
        `http://localhost:8080/admin/update/${admin._id}`,
        updateAdmin
      )
      .then((res) => {
        if (res.data === "Done") {
          alert("Admin updated successfully ");
          window.location.replace("/profile");
        } else {
          alert("Couldn't update profile");
          window.location.replace("/admin");
        }
      })
      .catch((msg) => {
        alert(msg);
      });

    }

    
    async function deleteData(e){
        e.preventDefault();
          axios
            .delete(
              `http://localhost:8080/admin/delete/${admin._id}`
            )
            .then((res) => {
              if (res.data === "success") {
                
                window.location.replace("/signUp");
              } else if (res.data === "failed") {
                alert("Error deleting your profile");
              }
            })
            .catch((err) => {
              alert(err);
            });
        }
  
    
    return (
        <>
            <div className='flex flex-col align-items w-full min-h-[85vh]' >
                <div className='px-[20px] h-[64px] font-bold text-xl w-full flex justify-center items-center gap-[20px]'>
                    My profile
                </div>
                <div className='flex justify-center grid grid-cols-2 gap-4 p-10'>

            
                    <div className="p-4 flex justify-center">
                        <TextField label="First Name" value = {firstname} variant="outlined" style={{ width: '100%' }} onChange={(e) => {
          setFirstname(e.target.value);
        }}/>
                    </div>
                    <div className="p-4 flex justify-center">
                        <TextField label="Last Name" value = {lastname} variant="outlined" style={{ width: '100%' }} onChange={(e) => {
          setLastname(e.target.value);
        }} />
                    </div>
                    <div className="col-span-2 p-4">
                        <TextField label="Email" variant="outlined" value = {email} style={{ width: '100%' }} onChange={(e) => {
          setEmail(e.target.value);
        }} />
                    </div>
                    <div className="p-4 flex justify-center">
                        <TextField label="NIC Number" variant="outlined" value = {nic} style={{ width: '100%' }} onChange={(e) => {
          setNic(e.target.value);
        }}/>
                    </div>
                    <div className="p-4 flex justify-center">
                        <TextField label="Phone Number" variant="outlined"value = {phone} style={{ width: '100%' }} onChange={(e) => {
          setPhone(e.target.value);
        }} />
                    </div>
                    <div className="col-span-2 p-4">
                        <TextField label="Address" variant="outlined" value = {address} style={{ width: '100%' }} onChange={(e) => {
          setAddress(e.target.value);
        }}/>
                    </div>
                    
                    
                    <button type='submit' onClick = {updateData} className="w-48 ml-80 bg-transparent text-cyan-600 ml-100 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Update
                    </button>

                    <button type='submit' onClick = {deleteData} className="w-48 mr-80 bg-transparent text-rose-700 border-rose-700 hover:bg-rose-700 hover:text-white font-semibold  py-2 px-4 border border-rose-700 hover:border-transparent rounded">
                       Delete
                    </button>
                    
                </div>
            </div>

        </>
    );
}

export default AdminProfile;
