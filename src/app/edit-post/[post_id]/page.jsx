import React from "react";
import EditPostForm from "@/app/components/EditPostForm";

async function getCommentById(id) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error getting comment ${error.message}`);
  }
}

export default async function EditPost({ params }) {
  const id = params.post_id;
  //const { post } = await getCommentById(id);
  const { title, content } = await getCommentById(id);
  return (
    <>
      <EditPostForm id={id} title={title} content={content} />
    </>
  );
}
