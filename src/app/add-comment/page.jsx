"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

export default function AddPost() {
  const { data: session, status } = useSession();
  const authorId = session?.user?.id;
  const userImage = session?.user?.image;
  //console.log(session);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const notify = () => {
    toast.success("Comment added successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  async function addComment() {
    try {
      const response = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          authorId,
          userImage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to add comment:", errorData);
        alert("Failed to add comment.");
        return;
      }
      notify();

      //alert("Comment added successfully");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment.");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "unauthenticated") {
      alert("Please sign in to add a new post.");
      return;
    }

    await addComment();

    setTimeout(() => {
      router.push("/comments");
    }, 1000);
  }

  return (
    <div className="mt-[60px] flex flex-col max-w-[70rem] mx-auto">
      <h1 className="text-2xl font-bold">Add a new comment</h1>
      <form onSubmit={handleSubmit} className="mt-5 w-full flex flex-col gap-5">
        <input
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          required
          className="text-xl shadow font-bold p-2 outline-none rounded-[5px] bg-[#f1f1f1]"
          placeholder="Enter the title"
          type="text"
        />
        <textarea
          onChange={(event) => setContent(event.target.value)}
          value={content}
          required
          className="text-xl font-semibold shadow p-2 outline-none rounded-[5px] bg-[#f1f1f1]"
          placeholder="Write your post..."
        ></textarea>
        <button
          type="submit"
          className="text-white shadow text-xl font-semibold px-4 py-2 rounded-[5px] w-[200px] border border-transparent bg-blue-700"
        >
          Submit
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
