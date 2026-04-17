import React,{useState} from "react"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"

const Login=()=>{
    const {setShowUserLogin,setUser,axios,navigate}=useAppContext() 

    const [name,setName]=useState("")
    const [mail,setMail]=useState("")
    const [password,setPassword]=useState("")
    const [state,setState]=useState("login")

    const updateName=(e)=>{setName(e.target.value)}
    const updateMail=(e)=>{setMail(e.target.value)}
    const updatePassword=(e)=>{setPassword(e.target.value)}
    const updateState=()=>{
        setName("")
        setMail("")
        setPassword("")
        setState(state=="login"?"signup":"login")
    }
    const onSubmitHandler = async (e) => {
    try {
        e.preventDefault();

        const url =
            state === "signup"
                ? "/api/user/register"
                : "/api/user/login";

        const { data } = await axios.post(url, {
            name,
            email: mail,
            password
        });

        if (data.success) {
            navigate('/');
            setUser(data.user);
            setShowUserLogin(false);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
    };


    return(
        <div className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50' onClick={()=>setShowUserLogin(false)}>
        <form onClick={(e)=>e.stopPropagation()} onSubmit={(e)=>onSubmitHandler(e)}
        className='flex flex-col gap-4  m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white'>
            
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span>{state==='login'?' Login':' Sign Up'}
            </p>

            {state=='signup' &&
            <div className="w-full">
                <p>Name</p>
                <input type="text"  placeholder="type here"  value={name} onChange={updateName}
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" required/>
            </div>}

            <div>
                <p>Email</p>
                <input type="email"  placeholder="type here"  value={mail} onChange={updateMail}
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" required/>
            </div>

            <div>
                <p>Password</p>
                <input type="password"  placeholder="type here"  value={password} onChange={updatePassword}
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" required/>
            </div>
            
            <div>
                {state==='login'?
                (<p>Create an account?<span onClick={updateState} className="text-primary cursor-pointer">click here</span></p>)
                :
                (<p>Already have account?<span onClick={updateState} className="text-primary cursor-pointer">click here</span></p>)
                }
            </div>
            <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">{state==='login'?'Login':'Create Account'}</button>
        </form>
        </div>        
    )
}

export default Login