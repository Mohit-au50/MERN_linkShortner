"use client";

import CreateLinkModel from "@/components/create-link-model";
import LinkCard from "@/components/link-card";
import { Link } from "@/lib/classes/link";
import { getLinksData } from "@/lib/firebase/get-links-data";
import { Suspense, useEffect, useState } from "react";

export default function UserPage() {
  const [linksData, setLinksData] = useState<Link[]>([]);

  useEffect(() => {
    let unsubscribe: any | null = null;
    const fetchData = async () => {
      unsubscribe = await getLinksData("mohit", setLinksData);
    };

    fetchData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <section>
      <div className="wrapper h-full py-5">
        <h1 className="text-3xl font-bold">User Page</h1>
        <CreateLinkModel />

        <div className="mt-4 space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            {linksData &&
              linksData.map((link) => (
                <LinkCard key={link.linkId} linkData={link} />
              ))}
          </Suspense>
        </div>
      </div>
    </section>
  );
}
