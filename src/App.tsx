import { useEffect, useState } from "react"
import * as esbuild from 'esbuild-wasm'
function App() {

  const startSevice = async () => {
    const service = await esbuild.initialize({
      worker: true,
      wasmURL: './esbuild.wasm'
    })
    console.log(service)
  }

  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  useEffect(() => {

  }, [])

  const onClick = () => {
    // setCode(input)
    console.log(input)
  }

  return (
    <>
      <div>
        <textarea value={input} onChange={event => setInput(event.target.value)} name="" id="" rows={10} cols={50}></textarea>
      </div>
      <button onClick={onClick} type="submit">Submit</button>
      <div>
        <pre>{'./esbuild.wasm'}</pre>
      </div>
    </>
  )
}

export default App
