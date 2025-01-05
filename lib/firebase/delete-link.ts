import { db } from ".";
import { LINKS_SUBCOLLECTION, USERS_COLLECTION } from "../utils/constants";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteLink = async (user: string, linkAlias: string) => {
  const docRef = doc(
    db,
    USERS_COLLECTION,
    user,
    LINKS_SUBCOLLECTION,
    linkAlias,
  );

  try {
    await deleteDoc(docRef);
    console.log("Document successfully deleted with ID:", linkAlias);
    return true;
  } catch (error: any) {
    console.error("Error deleting document:", error?.message || error);
    return false;
  }
};
