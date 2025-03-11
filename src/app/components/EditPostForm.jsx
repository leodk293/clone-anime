"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EditPostForm = ({ title, content, id }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const router = useRouter();
  const { data: session } = useSession();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          userId: session?.user?.id,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      alert("Post has been updated successfully");
      //router.refresh();
      router.push("/comments");
    } catch (error) {
      console.error(`Error updating comment ${error.message}`);
    }
  }

  return (
    <div className="mt-[60px] flex flex-col max-w-[70rem] mx-auto">
      <h1 className="text-2xl font-bold text-black">Edit Post</h1>
      <form
        onSubmit={handleSubmit}
        className=" mt-5 w-full flex flex-col gap-5"
      >
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className=" text-xl shadow font-bold p-2 outline-none rounded-[5px] bg-[#f1f1f1]"
          placeholder="Enter the title"
          type="text"
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className=" text-xl font-semibold shadow p-2 outline-none rounded-[5px] bg-[#f1f1f1]"
          placeholder="Write your post ..."
          name=""
          id=""
        ></textarea>
        <button
          type="submit"
          className="text-white shadow text-xl font-semibold px-4 py-2 rounded-[5px] w-[200px] border border-transparent bg-blue-700"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
