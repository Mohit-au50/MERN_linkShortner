import { db } from ".";
import { Link } from "@/lib/classes/link";
import { LINKS_SUBCOLLECTION, USERS_COLLECTION } from "../utils/constants";
import { doc, setDoc } from "firebase/firestore";

export const createNewLink = async (user: string, link: Link) => {
  try {
    const docRef = doc(
      db,
      USERS_COLLECTION,
      user,
      LINKS_SUBCOLLECTION,
      link.linkAlias,
    );

    await setDoc(docRef, link);
    console.log("Document written with ID: ", link.linkAlias);
    return true;
  } catch (error: any) {
    console.error("Error creating new link:", error?.message || error);
    return false;
  }
};
