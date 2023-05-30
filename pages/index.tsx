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
    console.log(backend);
    const request = {
      url,
    };
    const response = await axios.post(backend, request);
    const generatedUrl = response.data.shortened_url;
    setShortenedUrl(`${process.env.NEXT_PUBLIC_API_URL}${generatedUrl}`);
  };
  const validInputForm: string =
    "border-2 border-slate-300 rounded-l-md ml-auto mr-auto p-3 w-5/6 hover:border-slate-500 focus:outline-none";
  const invalidInputForm: string =
    "border-2 rounded-l-md mx-auto p-3 w-5/6 text-pink-600 focus:border-pink-500 border-pink-600 focus:outline-none";

  function isValidUrl(url: string): boolean {
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
    return pattern.test(url);
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
    <div className="mx-auto bg-slate-700 w-full">
      <div className="mx-auto w-5/6 max-w-2xl pb-3 pt-20">
        <h1 className="text-center font-bold font-montserrat text-white text-6xl py-10">
          URL Shortener
        </h1>
      </div>
      <div className="mx-auto">
        <p className="text-center text-lg text-slate-400 pb-2 font-montserrat">
          Paste the URL to be shortened here:
        </p>
      </div>
      <div className="mx-auto w-5/6 max-w-xl px-4 pb-4">
        <form
          method="post"
          className="flex justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className={isValid ? validInputForm : invalidInputForm}
            placeholder="Enter link here"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          ></input>
          <button
            className="border-2
            cursor-pointer 
            bg-slate-600
            text-md
            rounded-r-md       
            w-1/6 
            text-white
            p-3
            h-full
            font-montserrat
            text-center
          hover:text-slate-600"
            type="submit"
          >
            Shorten
          </button>
        </form>
        {!isValid ? (
          <p className="text-center font-montserrat text-sm text-pink-600 mt-2">
            Invalid url
          </p>
        ) : (
          ""
        )}
        {/* <p className="text-center font-sans text-sm mt-2">
          URLShortener is a free tool to shorten URLs and generate short links
        </p>
        <p className="text-center font-sans text-sm">
          URLShortener allows to create a shortened link making it easy to share
        </p> */}
      </div>
      {shortenedUrl != "" ? (
        <div className="mx-auto w-5/6 max-w-xl px-4 pb-7">
          <div className="mx-auto">
            <p className="text-center pb-2 text-slate-400 font-montserrat">
              Your shortened URL is:
            </p>
          </div>
          <div className="flex justify-center">
            <input
              className="border-2 border-slate-300 rounded-l-md ml-auto mr-auto p-3 w-5/6 hover:border-slate-500 focus:outline-none bg-gray-400"
              type="text"
              value={shortenedUrl}
              readOnly
            />
            <button
              className="border-2
              cursor-pointer 
              bg-slate-600
              text-md
              rounded-r-md       
              w-1/6 
              text-white
              p-3
              h-full
              font-montserrat
              text-center
            hover:text-slate-600"
              onClick={copyUrl}
            >
              Copy
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
