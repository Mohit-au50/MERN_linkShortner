import { deleteLink } from "@/lib/firebase/delete-link";
import { decryptData } from "@/lib/utils/crypto";

export async function POST(request: Request) {
  const { user, data } = await request.json();
  const rawJsonUser = await decryptData(user);
  const rawJsonData = await decryptData(data);

  try {
    const res = await deleteLink(rawJsonUser.user, rawJsonData.linkAlias);
    if (!res) {
      throw new Error("Link creation Failed");
    }

    return new Response("Link created successfully", { status: 200 });
  } catch (error: any) {
    console.error("Api response failed!", error?.message || error);
    return new Response(`Api response failed! ${error?.message || error}`, {
      status: 500,
    });
  }
}
