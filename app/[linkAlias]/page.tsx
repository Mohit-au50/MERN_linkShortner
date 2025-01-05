import { getLinkDataAndUpdateCount } from "@/lib/firebase/get-link-data-and-upate-count";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ linkAlias: string }>;
}

export default async function LinkPage({ params }: Props) {
  const { linkAlias } = await params;

  // Fetch link data and update count
  const linkData = await getLinkDataAndUpdateCount(linkAlias);
  console.log(linkData, "linkdata");

  // If the link data is not found, redirect to a 404 page
  if (!linkData) {
    notFound()
  }

  // Redirect to the URL stored in the link data
  if (linkData.linkUrl) {
    redirect(linkData.linkUrl);
  }

  return (
    <section>
      <div className="wrapper h-full py-5">
        <h1>Link page {linkAlias}</h1>
        <p>Redirecting...</p>
      </div>
    </section>
  );
}
