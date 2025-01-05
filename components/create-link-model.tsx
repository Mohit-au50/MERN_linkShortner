"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Link } from "@/lib/classes/link";
import { encryptData } from "@/lib/utils/crypto";

const generateUniqueId = () => {
  return nanoid(7);
};

export default function CreateLinkModel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [link, setLink] = useState<Link>(new Link());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLink({
      ...link,
      [name]: value,
    });
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!link.linkName || !link.linkUrl) {
      setError("Both name and URL are required");
      setIsLoading(false);
      return;
    }

    if (
      !link.linkUrl.startsWith("http://") &&
      !link.linkUrl.startsWith("https://")
    ) {
      setError("URL must start with http:// or https://");
      setIsLoading(false);
      return;
    }

    // Prepare the link data
    const linkData = {
      linkId: Date.now().toString(),
      linkName: link.linkName,
      linkUrl: link.linkUrl,
      linkAlias: generateUniqueId(),
      linkTotalClicks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // Prepare the user data
    const user = { user: "mohit" };

    // Encrypt the data
    const encryptedData = encryptData(linkData);
    const encryptedUser = encryptData(user);

    try {
      // Send the encrypted data to the API
      const response = await fetch("/api/create-link", {
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
        setLink(new Link());
        setError("");
        setIsModalOpen(false);
      }
    } catch (error: any) {
      console.error("Error creating new link:", error?.message || error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  // handle cancel
  const handleCancel = () => {
    setIsModalOpen(false);
    setLink(new Link());
    setError("");
  };

  return (
    <article>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
      >
        Create New Link
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Create New Link
            </h2>
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Link Name
                </label>
                <input
                  type="text"
                  id="linkName"
                  name="linkName"
                  value={link.linkName}
                  onChange={handleChange}
                  placeholder="Enter link name"
                  className="mt-1 block h-10 w-full rounded border p-3 text-black outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700"
                >
                  Link URL
                </label>
                <input
                  type="url"
                  id="linkUrl"
                  name="linkUrl"
                  value={link.linkUrl}
                  onChange={handleChange}
                  placeholder="Enter link URL"
                  className="mt-1 block h-10 w-full rounded border p-3 text-black outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isLoading ? "please wait..." : "Create Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </article>
  );
}
