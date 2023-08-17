import React, { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

axios.defaults.baseURL = "http://localhost:8080";

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
    <div className="w-full h-screen grid place-items-center bg-gray-700">
      {copied && (
        <>
          <p className="w-full h-[3rem] flex items-center justify-start bg-green-200 text-green-800 font-semibold absolute top-0 px-7">
            Copied to clipboard
          </p>
        </>
      )}

      <div className="w-[300px]">
        <form onSubmit={handleSubmit} className=" w-[300px] flex gap-4">
          <input
            type="text"
            className="outline-0 border-0 rounded w-full h-[3rem] px-3"
            placeholder="Past your link"
            onChange={(e) => setLink(e.target.value)}
          />
          <button className="px-5 py-2 rounded bg-teal-600">send</button>
        </form>
        {shortLink && (
          <>
            <CopyToClipboard
              text={shortLink}
              onCopy={handleOnCopy}
              className="hover:bg-green-200 w-full h-[3rem] rounded mt-5 bg-white flex items-center px-3"
            >
              <p>{shortLink}</p>
            </CopyToClipboard>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
