import { db } from "@/lib/firebase";
import { query, orderBy, collection, onSnapshot } from "firebase/firestore";
import { LINKS_SUBCOLLECTION, USERS_COLLECTION } from "../utils/constants";
import { Link } from "@/lib/classes/link";

// export const getLinksData = async (user: string, setLinksData: Function) => {
//   const LinksQuery = query(
//     collection(db, USERS_COLLECTION, user, LINKS_SUBCOLLECTION),
//     orderBy("createdAt", "desc"),
//   );

//   try {
//     const unsubscribe = onSnapshot(LinksQuery, async (snapshot: any) => {
//       let docsList: Link[] = [];
//       for (const doc of snapshot.docs) {
//         docsList.push(doc.data() as Link);
//       }
//       setLinksData(docsList);
//     });

//     return unsubscribe;
//   } catch (error: any) {
//     console.error("Error fetching link data:", error?.message || error);
//     return null;
//   }
// };

export const getLinksData = async (user: string, setLinksData: Function) => {
  try {
    const LinksQuery = query(
      collection(db, USERS_COLLECTION, user, LINKS_SUBCOLLECTION),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(LinksQuery, (snapshot) => {
      const docsList: Link[] = snapshot.docs.map((doc) => doc.data() as Link);
      setLinksData(docsList);
    });

    return unsubscribe; // This is the unsubscribe function
  } catch (error: any) {
    console.error("Error fetching link data:", error?.message || error);
    return null;
  }
};
