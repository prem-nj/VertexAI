import React, { useEffect } from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { login } from './features/login';
import { Route ,Routes,BrowserRouter} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import {me} from "./features/me"
import { useDispatch } from 'react-redux';
import { setuserData } from './redux/userSlice';
function App() {

  
  // const handleLogin = async () => {
  //   const result = await signInWithPopup(auth, googleProvider);
  //   const token = await result.user.getIdToken()
  //   const data = await login(token);
  //   console.log(data)
  // }

  const dispatch=useDispatch()
  useEffect( () => {
    const fetch = async () => {
      const data = await me()
      dispatch(setuserData(data))
    }
    fetch()
  },[])

 
  return (
    <>
      
      {/* <div  className='bg-gray-300  w-full h-screen  flex items-center justify-center '>

      <div className='rounded-2xl border-red-200'>
        <h1 className= " rounded-2xl text-3xl  p-2 mt-4 " >hello</h1>
        
          <button className="bg-amber-400 rounded-2xl text-3xl  p-2 mt-4" onClick={handleLogin}> continue with google .... </button>
          <div className='rounded-full bg-amber-600 w-15 p-5 h-15 text-center mt-5  flex items-center justify-center  border-5 border-blue-200'>
          <p className='text-2xl  text-black-500  text-center' >knr</p>
          </div>
        </div>


        <div>
        </div>
        
      </div>*/}

            
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>} /> 
        </Routes>
        
      
      </BrowserRouter>
      
      

    </>
  )
}

export default App
