export default function Home() {
  return (
    <div className="flex-auto grid place-items-center">
      <h1 className="font-mono text-center text-xl font-bold mt-3 mb-3 text-blue-600">
        URL Shortener
      </h1>
      <div className="box-border w-4/6 h-32 border-2">
        <h1 className="text-center font-mono text-lg font-bold">
          Enter your URL below:{" "}
        </h1>
      </div>
    </div>
  );
}
