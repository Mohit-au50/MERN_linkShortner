import { db } from "@/lib/firebase";
import { getDoc, doc, updateDoc, increment } from "firebase/firestore";
import { LINKS_SUBCOLLECTION, USERS_COLLECTION } from "../utils/constants";

export const getLinkDataAndUpdateCount = async (linkId: string) => {
  const docRef = doc(
    db,
    USERS_COLLECTION,
    "mohit",
    LINKS_SUBCOLLECTION,
    linkId,
  );
  try {
    const docSnap = await getDoc(docRef);

    // If no documents exist, return null
    if (!docSnap.exists()) {
      console.log("No links found.");
      return null;
    }

    // get the link data
    const result = docSnap.data();

    // update the link data
    await updateDoc(docRef, {
      linkTotalClicks: increment(1),
    });

    return result;
  } catch (error: any) {
    console.error("Error fetching link data:", error?.message || error);
    return null;
  }
};
