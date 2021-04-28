import React, { useMemo, useState } from 'react'
import { useToasts } from 'react-toast-notifications';
import GithubImg from './static/github-mark.png'
import { CopyIcon } from './components/icons'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function App() {

  const { addToast } = useToasts();

  const [URLparams, setURLparams] = useState({
    url: "https://",
    selector: "",
    format: "png",
    isCloudUpload: false
  })

  const [data, setData] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  const codeString = useMemo(() => {
    return `
    fetch("/api/?${Object.entries(URLparams).filter(([key, val]) => val).map(([key, val]) => `${key}=${val}`).join('\n    &')
      }")
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); `
  }, [URLparams])

  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    addToast('Copied! ', { appearance: 'success', autoDismiss: true });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const { data } = await axios.get("/api/", { params: URLparams })
      setData(data)
      addToast('Shotted!', { appearance: 'success', autoDismiss: true });
    } catch (e) {
      let { response: { data } } = { ...e }
      setData(data)
      addToast(`Ups!, ${data?.message}`, { appearance: 'error', autoDismiss: true });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto">
      <header className="border-gray-300 border-solid border-b py-2 flex justify-between">
        <h1 className="font-semibold">Container Shot</h1>
        <a rel="noreferrer" target="_blank" href="https://github.com/yulafezmesi/element-shot">
          <img width="25" height="25" src={GithubImg}></img>
        </a>
      </header>
      <div className="grid grid-cols-editor gap-3 py-4">
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <div className="flex flex-wrap">
            <label className="block mb-1" for="formGridCode_card">URL*</label>
            <input value={URLparams.url} type="url" autoFocus onChange={(e) => setURLparams({ ...URLparams, url: e.target.value })} required className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" />
          </div>
          <div className="flex flex-wrap">
            <label title="DOM selectors">
              <a rel="noreferrer" tabIndex={-1} target="_blank" href="https://www.w3schools.com/cssref/css_selectors.asp" className="flex mb-1 items-center" for="formGridCode_card">
                <span>Selector</span>
                <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z" fill="#111" /></svg>
              </a>
            </label>
            <input onChange={(e) => setURLparams({ ...URLparams, selector: e.target.value })} required className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" />
          </div>
          <div className="flex flex-wrap">
            <label title="Perhaps you may want delete dom element before capture element screen" className="block mb-1" for="formGridCode_card">Selector to be deleted</label>
            <input onChange={(e) => setURLparams({ ...URLparams, selectorToBeDeleted: e.target.value ? e.target.value : null })} className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" />
          </div>
          <div className="flex flex-wrap">
            <label className="block mb-1" for="formGridCode_card">Format</label>
            <select onChange={(e) => setURLparams({ ...URLparams, format: e.target.value })} className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" >
              <option value="png">png</option>
              <option value="jpeg">jpeg</option>
            </select>
          </div>
          <div className="flex flex-wrap space-y-4 md:space-y-0">
            <div className="w-full pr-2 md:w-1/2">
              <label className="block mb-1" for="formGridCode_month">Width</label>
              <input onChange={(e) => setURLparams({ ...URLparams, width: e.target.value ? e.target.value : null })} className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" id="formGridCode_month" />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block mb-1" for="formGridCode_month">Height</label>
              <input onChange={(e) => setURLparams({ ...URLparams, height: e.target.value ? e.target.value : null })} className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" id="formGridCode_month" />
            </div>
          </div>
          <div className="w-full mt-0">
            <label className="block mb-1" for="formGridCode_year">Padding </label>
            <input defaultValue="0" type="range" onChange={(e) => setURLparams({ ...URLparams, padding: e.target.value })} className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" />
          </div>
          <div className="flex flex-wrap">
            <label className="text-gray-700 flex items-center select-none">
              <input onChange={(e) => {
                setURLparams({ ...URLparams, isCloudUpload: e.target.checked ? true : '' })
              }} type="checkbox" value="" />
              <span className="ml-1">Cloud Upload</span>
            </label>
          </div>
          <button type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 transition ease-in-out duration-150">
            {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>}
            {!isLoading ? "Let's try" : 'Processing'}
          </button>
        </form>
        <div className="grid-container max-h-80">
          <div className="relative code-snipped">
            <span onClick={() => copyToClipboard(codeString)} title="Copy to clipboard" role="button" className="absolute right-5 top-1" >
              <CopyIcon />
            </span>
            <SyntaxHighlighter
              language="javascript" style={tomorrowNightEighties}>
              {codeString}
            </SyntaxHighlighter>
          </div>
          <div className="relative json-snipped grid">
            <span onClick={() => copyToClipboard(data)} title="Copy to clipboard" role="button" className="absolute right-5 top-1" >
              <CopyIcon />
            </span>
            <SyntaxHighlighter
              language="json" style={tomorrowNightEighties}>
              {JSON.stringify(data, null, 4)}
            </SyntaxHighlighter>
          </div>
          <section className="image-wrapper">
            <img src={data?.data?.url ? data.data.url : `data:image/${URLparams.format}; base64, ${data?.data}`}></img>
          </section>
        </div>
      </div>
    </div>
  );

}

export default App;
