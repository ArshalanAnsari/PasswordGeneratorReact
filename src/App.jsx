import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')


  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += '1234567890';
    if(charAllowed) str += '!@#$%^&*();>/';

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1);

      pass += str.charAt(char)

    }

  setPassword(pass);

  }, [length,numAllowed,charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,6)
  
  },[password])

   
  useEffect(()=>{
    passwordGenerator();
  }
  , [length,numAllowed,charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-lg bg-gray-800 mx-auto my-10 px-4 py-4 text-center text-2xl text-orange-500 rounded-lg shadow-md'>
        <h1 className='text-white my-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg  overflow-hidden mb-4 '>
          <input 
            type="text"
            value={password}
            placeholder='Password'
            className='w-full outline-none px-3 py-1 '
            readOnly
            ref={passwordRef}
          />
          <button 
           className='flex items-centercenter outline-none bg-blue-700 text-white px-4 py-0.75 shrink-0'
           onClick={copyPasswordToClipBoard}>
          copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-2'>
            <input 
             type="range" 
             min={6}
             max={50}
             value={length}
             className='cursor-pointer'
             onChange= {(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex item-center gap-x-2'>
            <input 
             type="checkbox" 
             defaultChecked={numAllowed}
             className='cursor-pointer'
             onChange= {() => {
              setNumAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className='flex item-center gap-x-2'>
            <input 
             type="checkbox" 
             defaultChecked={charAllowed}
             className='cursor-pointer'
             onChange= {()=>{
              setCharAllowed((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
