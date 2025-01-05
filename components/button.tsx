"use client";

import { deleteLink } from "@/lib/firebase/delete-link";
import { copyToClipboard } from "@/lib/utils/common";
import { encryptData } from "@/lib/utils/crypto";

interface Props {
  text: string;
  type: "copy" | "delete";
  url?: string;
  setConfirmDelete?: any;
}

export default function Button({ text, type, url, setConfirmDelete }: Props) {
  const classes =
    type === "copy"
      ? "border p-1.5 px-5 text-sm tracking-wide transition-colors hover:bg-green-500/40"
      : "border border-red-700 bg-red-700 p-1.5 px-5 text-sm tracking-wide transition-colors hover:bg-red-700/40";

  const hadndleClick = async () => {
    if (type === "copy") {
      console.log("copy button");
      await copyToClipboard(url as string);
    } else {
      console.log("delete button");
      setConfirmDelete(true);
    }
  };

  return (
    <button onClick={hadndleClick} className={classes}>
      {text}
    </button>
  );
}
