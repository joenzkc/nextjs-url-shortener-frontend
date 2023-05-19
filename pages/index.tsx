import axios from "axios";
import React from "react";
export default function Home() {
  const [shortenedUrl, setShortenedUrl] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidUrl(url)) {
      setIsValid(false);
      console.log("URL is invalid");
      return;
    }
    setIsValid(true);
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL + "url/random";
    const request = {
      url,
    };
    const response = await axios.post(backend, request);
    const generatedUrl = response.data.shortened_url;
    setShortenedUrl(`${process.env.NEXT_PUBLIC_API_URL}${generatedUrl}`);
  };
  const validInputForm: string =
    "border-2 border-slate-700 rounded-l-md ml-auto mr-auto p-3 w-5/6";
  const invalidInputForm: string =
    "border-2 rounded-l-md mx-auto p-3 w-5/6 text-pink-600 focus: border-pink-500 focus:ring-pink-500 border-pink-600";

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

  function copyUrl() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shortenedUrl);
      console.log(`Copied the text ${shortenedUrl}`);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.textContent = shortenedUrl;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  return (
    <div className="container bg-cyan-200 w-4/6 ml-auto mr-auto max-w-2xl">
      <div className="bg-slate-400 ml-auto mr-auto">
        <h1 className="text-center font-bold font-mono text-4xl p-10">
          URL Shortener
        </h1>
      </div>
      <div className="bg-blue-200 ml-auto mr-auto">
        <p className="text-center font-mono text-lg px-5 pb-5">
          Paste the URL to be shortened here:
        </p>
      </div>
      <div className="bg-blue-300 ml-auto mr-auto w-5/6 max-w-xl px-4 pb-4">
        <form method="post" onSubmit={handleSubmit}>
          <input
            className={isValid ? validInputForm : invalidInputForm}
            placeholder="Enter link here"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          ></input>
          <input
            className="border-2 hover:border-gray-500
            border-y-slate-700
            border-x-slate-700 
            border-r-slate-700 
            cursor-pointer 
            bg-blue-500 
            rounded-r-md 
            p-3 
            w-1/6 
          hover:text-slate-600"
            type="submit"
          ></input>
          {!isValid ? (
            <p className="text-center font-sans text-xs text-pink-600 mt-1">
              Invalid url
            </p>
          ) : (
            ""
          )}
        </form>
        <p className="text-center font-sans text-sm mt-2">
          URLShortener is a free tool to shorten URLs and generate short links
        </p>
        <p className="text-center font-sans text-sm">
          URLShortener allows to create a shortened link making it easy to share
        </p>
      </div>
      {shortenedUrl != "" ? (
        <div className="mx-auto bg-teal-300 w-5/6 max-w-xl px-4 pb-4">
          <p className="text-center">Your shortened URL is:</p>
          <input
            className="border-2 border-slate-700 rounded-l-md ml-auto mr-auto p-3 w-5/6 disabled:bg-gray-200"
            type="text"
            disabled
            value={shortenedUrl}
            readOnly
          />
          <input
            className="border-2 hover:border-gray-500
            border-y-slate-700
            border-x-slate-700 
            border-r-slate-700 
            cursor-pointer 
            bg-slate-400 
            rounded-r-md 
            p-3 
            w-1/6   
          hover:text-slate-600"
            value="Copy"
            onClick={copyUrl}
          ></input>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
