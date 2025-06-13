/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"

// type EsType =
//   esbuild.Platform | esbuild.Format
//   | esbuild.Loader
//   | esbuild.LogLevel
//   | esbuild.Charset
//   | esbuild.Drop

function App() {
  const ref = useRef<any>(null)

  const startSevice = async () => {
    ref.current = await esbuild.initialize({
      worker: true,
      wasmURL: './esbuild.wasm',
    })

    ref.current = esbuild
  }

  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  useEffect(() => {
    startSevice()
  }, [])

  const onClick = async () => {
    if (!ref.current) {
      return
    }
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()]
    })
    // console.log(result)
    setCode(result.outputFiles[0].text)
  }

  return (
    <>
      <div>
        <textarea value={input} onChange={event => setInput(event.target.value)} name="" id="" rows={10} cols={50}></textarea>
      </div>
      <button onClick={onClick} type="submit">Submit</button>
      <div>
        <pre>{code}</pre>
      </div>
    </>
  )
}

export default App
