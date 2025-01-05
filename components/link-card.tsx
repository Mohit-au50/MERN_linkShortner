"use client";

import { format } from "date-fns";
import { Link } from "@/lib/classes/link";
import Button from "@/components/button";
import { useState } from "react";
import { encryptData } from "@/lib/utils/crypto";

interface Props {
  linkData: Link;
}

export default function LinkCard({ linkData }: Props) {
  const linkUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${linkData.linkAlias}`;

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRemoveLink = async () => {
    setIsLoading(true);

    if (!linkData) {
      setError("Link alias is required");
      setIsLoading(false);
      return;
    }
    // Prepare the link data
    const link = {
      linkAlias: linkData.linkAlias as string,
    };
    // Prepare the user data
    const user = { user: "mohit" };

    // Encrypt the data
    const encryptedData = encryptData(link);
    const encryptedUser = encryptData(user);
    try {
      // Send the encrypted data to the API
      const response = await fetch("/api/delete-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: encryptedUser,
          data: encryptedData,
        }),
      });

      if (response.ok) {
        console.log("Link deleted successfully");
        setError("");
        setIsLoading(false);
        setConfirmDelete(false);
      }
    } catch (error: any) {
      console.error("Error deleting link:", error?.message || error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <article className="flex flex-col gap-4 rounded-lg border-2 border-gray-200 p-4 shadow-md">
      <small className="text-gray-400">
        Created At{" "}
        {format(new Date(linkData.createdAt), "dd, MMM yyyy hh:mm:ss a")}
      </small>
      <div className="space-y-2 sm:flex sm:items-center sm:justify-between">
        <div>
          <h2>{linkData.linkName}</h2>
          <p>{linkData.linkUrl}</p>
        </div>
        <div className="text-start">
          <div className="flex items-center justify-start gap-0.5 sm:justify-center">
            <span>{linkData.linkTotalClicks}</span>
            <svg
              viewBox="-4.32 -4.32 32.64 32.64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-7"
            >
              <g
                id="SVGRepo_bgCarrier"
                strokeWidth="0"
                transform="translate(0,0), scale(1)"
              >
                <path
                  transform="translate(-4.32, -4.32), scale(1.02)"
                  d="M16,27.2034888518484C17.989079273403338,26.89310302473843,19.939155399238643,26.78473917187277,21.834000822842903,26.10478583656255C24.04135683677831,25.312690045953133,26.321141738426036,24.57975112105791,27.96705946357794,22.909185002704987C29.846337049348865,21.00176434990216,32.78038036399767,18.487665809271114,31.789695443095347,16C30.615733364070802,13.052114891674908,26.05861071103547,13.540790067978756,23.492788086201685,11.674036781450639C22.202797550528423,10.735509679557058,21.69043969845145,9.13702515880037,20.670573115152752,7.910330064090198C19.147410718511793,6.078270978123244,18.24217125987297,3.4674018651352094,16,2.661714442858571C13.706206100922973,1.8374772729084248,11.110479007858121,2.682826855953179,8.884212801134904,3.6750950357174226C6.5235824160799805,4.727250617202127,3.6776382352018926,5.9891724943368825,2.9623604665280485,8.472715305752653C2.2216632978661184,11.044517770796356,5.267600299210458,13.32449678254564,5.334553628179588,15.999999999999998C5.398872168616503,18.570215171231794,2.586673972097163,20.852783128110378,3.333729142176015,23.312874889393377C4.065810651566782,25.72365760260284,6.602285032628577,27.366013328393088,9.01071599361143,28.105795007593546C11.295186508936983,28.807500583252562,13.638764256904738,27.5719478262704,16,27.2034888518484"
                  fill="#7ed0ec"
                  strokeWidth="0"
                ></path>
              </g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.048"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M17 9V18"
                  stroke="#000000"
                  strokeWidth="2.16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 6V18"
                  stroke="#000000"
                  strokeWidth="2.16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M7 12L7 18"
                  stroke="#000000"
                  strokeWidth="2.16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>
          <p>total click</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p>{`${process.env.NEXT_PUBLIC_BASE_URL}${linkData.linkAlias}`}</p>
        <Button text="Copy" type={"copy"} url={linkUrl} />
        <Button
          text="Delete"
          type={"delete"}
          setConfirmDelete={setConfirmDelete}
        />
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Delete Link
            </h2>
            <p className="text-black">
              Are you sure you want to delete this link?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleRemoveLink}
                className="rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {isLoading ? "please wait..." : "Delete Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
