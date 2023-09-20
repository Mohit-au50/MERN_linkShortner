import React, { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

axios.defaults.baseURL = "https://link-short-payw.onrender.com";

const App = () => {
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { link };
      const res = await axios.post("/generate-link", data);
      console.log(res);
      if (res.status === 224) {
        setShortLink(res.data.shortLink);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <main className="relative w-full h-screen bg-orange-300 flex flex-col justify-between items-center">
      <header className="h-20 w-full">
        <nav className="flex items-center h-full px-4 sm:px-7 container mx-auto">
          <h1 className="font-bold tracking-wide text-2xl sm:text-3xl text-orange-700">
            Shorty
          </h1>
        </nav>
      </header>
      {copied && (
        <>
          <p className="w-full h-12 flex items-center px-4 sm:px-7 bg-green-200 text-green-800 font-semibold absolute top-20">
            Copied to clipboard
          </p>
        </>
      )}
      <div className="w-full h-full p-4">
        <div className="w-full h-full container mx-auto grid place-items-center">
          <div className="max-w-md w-full">
            <form onSubmit={handleSubmit} className="flex gap-5">
              <input
                type="text"
                className="outline-0 border-2 rounded w-full h-12 px-3 placeholder:text-orange-700"
                placeholder="Paste your link"
                onChange={(e) => setLink(e.target.value)}
              />
              <button className="px-5 py-2 rounded bg-orange-700 text-orange-200 uppercase tracking-wider font-semibold">
                send
              </button>
            </form>
            {shortLink && (
              <>
                <CopyToClipboard
                  text={shortLink}
                  onCopy={handleOnCopy}
                  className="hover:bg-green-200 w-full h-12 border-2 hover:border-green-200 rounded mt-5 bg-white text-orange-700 flex items-center px-3"
                >
                  <p>{shortLink}</p>
                </CopyToClipboard>
              </>
            )}
          </div>
        </div>
      </div>

      <footer className="h-20 w-full">
        <nav className="flex items-center justify-center h-full px-4 sm:px-7">
          <h1 className="font-bold tracking-wide text-orange-700">
            &lt;/&gt; by
            <a
              href="http://github.com/Mohit-au50"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1"
            >
              Mohit
            </a>
          </h1>
        </nav>
      </footer>
    </main>
  );
};

export default App;
