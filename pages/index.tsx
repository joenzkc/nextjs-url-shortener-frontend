export default function Home() {
  return (
    <div className="container bg-cyan-200 w-4/6 ml-auto mr-auto max-w-2xl">
      <div className="bg-slate-400 ml-auto mr-auto">
        <h1 className="text-center font-bold font-mono text-4xl p-10">
          URL Shortener
        </h1>
      </div>
      <div className="bg-red-400 ml-auto mr-auto">
        <p className="text-center font-mono text-lg px-5 pb-5">
          Paste the URL to be shortened here:
        </p>
      </div>
      <div className="bg-blue-300 ml-auto mr-auto w-5/6 max-w-xl px-4 pb-4">
        <form method="post">
          <input
            className="border-2 border-slate-700 rounded-l-md ml-auto mr-auto p-3 w-5/6"
            placeholder="Enter link here"
          ></input>
          <input
            className="border-2 hover:border-gray-500 border-y-slate-700 border-x-slate-700 border-r-slate-700 cursor-pointer bg-blue-500 rounded-r-md p-3 w-2/7"
            type="submit"
          ></input>
        </form>
        <p className="text-center font-sans text-sm mt-2">
          URLShortener is a free tool to shorten URLs and generate short links
        </p>
        <p className="text-center font-sans text-sm">
          URLShortner allows to create a shortened link making it easy to share
        </p>
      </div>
    </div>
  );
}
