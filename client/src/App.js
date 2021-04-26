import React, { useMemo, useState } from 'react'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function App() {

  const [URLparams, setURLparams] = useState({
    url: "https://",
    selector: "",
    format: "png"
  })

  const [data, setData] = useState({})

  const codeString = useMemo(() => {
    return `
    fetch("http://localhost:3000/api/?${Object.entries(URLparams).filter(([key, val]) => val).map(([key, val]) => `${key}=${val}`).join('\n    &')
      }")
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); `
  }, [URLparams])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("/api/", { params: URLparams })
    setData(data)
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-editor gap-3 py-4">
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <div className="flex flex-wrap">
            <div className="w-full">
              <label className="block mb-1" for="formGridCode_card">URL*</label>
              <input value={URLparams.url} type="url" autoFocus onChange={(e) => setURLparams({ ...URLparams, url: e.target.value })} required className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full">
              <label title="DOM selectors">
                <a target="_blank" href="https://www.w3schools.com/cssref/css_selectors.asp" className="flex mb-1 items-center" for="formGridCode_card">
                  <span>Selector </span>
                  <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z" fill="#111" /></svg>
                </a>
              </label>
              <input onChange={(e) => setURLparams({ ...URLparams, selector: e.target.value })} required className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full">
              <label className="block mb-1" for="formGridCode_card">Format</label>
              <select onChange={(e) => setURLparams({ ...URLparams, format: e.target.value })} className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" >
                <option value="png">png</option>
                <option value="jpeg">jpeg</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap space-y-4 md:space-y-0">
            <div className="w-full px-2 md:w-1/2">
              <label className="block mb-1" for="formGridCode_month">Width</label>
              <input onChange={(e) => setURLparams({ ...URLparams, width: e.target.value })} className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" id="formGridCode_month" />
            </div>
            <div className="w-full px-2 md:w-1/2">
              <label className="block mb-1" for="formGridCode_month">Height</label>
              <input onChange={(e) => setURLparams({ ...URLparams, height: e.target.value })} className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" id="formGridCode_month" />
            </div>
          </div>
          <div className="w-full">
            <label className="block mb-1" for="formGridCode_year">Padding </label>
            <input defaultValue="0" type="range" onChange={(e) => setURLparams({ ...URLparams, padding: e.target.value })} className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full">
              <label className="text-gray-700 flex items-center">
                <input onChange={(e) => {
                  setURLparams({ ...URLparams, isCloudUpload: e.target.checked ? true : '' })
                }} type="checkbox" value="" />
                <span className="ml-1">Cloud Upload</span>
              </label>
            </div>
            <input value="Let's try" type="submit" className="h-10 px-5 my-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"></input>
          </div>
        </form>
        <SyntaxHighlighter
          language="javascript" style={tomorrowNightEighties}>
          {codeString}
        </SyntaxHighlighter>
        <SyntaxHighlighter
          language="json" style={tomorrowNightEighties}>
          {JSON.stringify(data, null, 4)}
        </SyntaxHighlighter>
      </div>
      <img src={`data:image/png; base64,` + data.data}></img>
    </div>
  );
}

export default App;
