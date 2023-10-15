import  { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {

    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const {id} = useParams()

  let navigate = useNavigate();
  
const handleSubmit = (e) => {
    e.preventDefault()
    if(password === repassword){
      axios.post(`http://localhost:8080/admin/reset/${id}`, {password})
    .then(res => {
        if(res.data.Status === "Success") {
          alert("Password changed successfully")
            navigate('/')
           
        }
    }).catch(err => console.log(err))

    }else{
      alert("Password mismatch")
    }
    
}



    return (
      <>
        <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center bg-cyan-700"
      style={{
        // backgroundImage: `url('https://www.chashmay.com.pk/images/blogs/8738Thickvs.ThinSunglassesFrames.jpg')` // Replace with the actual path to your background image
        backgroundColor:"#0e7490"

      }}
    >
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Password
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="mt-6 space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="password"
                    autoComplete="email"
                    required
                    className="block p-5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                        setPassword(e.target.value);
                     }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Re-enter Password
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="password"
                    autoComplete="email"
                    required
                    className="block w-full p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                        setRepassword(e.target.value);
                     }}
                  />
                </div>
              </div>
              <div className="flex justify-center">
  
              <div>
                <button
                  type="submit"
                onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send
                </button>
                
              </div>
              </div>
            </form>

          </div>
        </div>
        </div>
      </>
    )
  }