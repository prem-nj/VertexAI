import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

function App() {

  
  const handleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
 
    const token=await data.user.getIdToken()
  }
  
  

 
  return (
    <>
      
      <div  className='bg-gray-300  w-full h-screen  flex items-center justify-center '>

      <div className='rounded-2xl border-red-200'>
        <h1 className= " rounded-2xl text-3xl  p-2 mt-4 " >hello</h1>
        
          <button className="bg-amber-400 rounded-2xl text-3xl  p-2 mt-4" onClick={handleLogin}> continue with google .... </button>
          <div className='rounded-full bg-amber-600 w-15 p-5 h-15 text-center mt-5  flex items-center justify-center  border-5 border-blue-200'>
          <p className='text-2xl  text-black-500  text-center' >knr</p>
          </div>
        </div>


        <div>
        </div>
        
      </div>

            

      
      

    </>
  )
}

export default App
