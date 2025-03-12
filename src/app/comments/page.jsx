"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const { data: session, status } = useSession();
  const authorId = session?.user?.id;

  const router = useRouter();

  async function getAllComments() {
    try {
      const response = await fetch(`http://localhost:3001/api/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setComments([]);
        throw new Error(`Failed to fetch comments : ${response.status}`);
      }

      const result = await response.json();
      setComments(result);
      //console.log(result);
    } catch (error) {
      console.error("Failed to fetch comments", error);
      setComments([]);
    }
  }

  async function deleteComment(commentId, userId) {
    if (userId !== authorId) {
      alert("You are not allowed to delete this comment");
      return;
    } else {
      const confirmed = confirm("Are you sure you want to delete");
      if (confirmed) {
        try {
          if (userId !== authorId) {
            alert("You are not allowed to delete this comment");
          } else {
            const response = await fetch(
              `http://localhost:3001/api/posts?id=${commentId}&userId=${userId}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              throw new Error(`Failed to delete comment : ${response.status}`);
            }
            router.refresh();
            getAllComments();
          }
        } catch (error) {
          console.error("Failed to delete comment", error);
        }
      }
    }
  }

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className=" mt-[60px] flex flex-col max-w-[70rem] mx-auto">
      <header className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl sm:text-3xl text-gray-900">
          Share your thoughts with others
        </h1>
        <div className="h-1 rounded-full bg-blue-500 w-24 sm:w-32" />
      </header>
      <div className=" flex flex-col gap-5 mt-10 ">
        <div className=" flex flex-row justify-between">
          <h1 className="text-2xl font-bold self-center text-black md:text-4xl">
            Comments
          </h1>
          <Link className=" self-center" href={"/add-comment"}>
            <button className=" border border-transparent bg-black px-4 py-2 text-white font-semibold rounded-[50px]">
              Add a comment
            </button>
          </Link>
        </div>

        {comments.length && comments.length > 0 ? (
          comments.map((comment) => (
            <div
              className=" border border-gray-400 px-10 py-5 shadow rounded-[5px] flex flex-row justify-between"
              key={comment._id}
            >
              <div className=" flex flex-row gap-2">
                <Image
                  src={comment.userImage}
                  alt={comment.author.fullName}
                  width={50}
                  height={50}
                  className=" self-center object-cover rounded-[50%]"
                />
                <div className=" flex flex-col">
                  <p className="font-bold">{comment.author.fullName}</p>
                  <div className=" flex flex-col">
                    <p className=" font-extrabold">{comment.title}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>

              <div className=" self-center flex flex-row gap-4">
                <button
                  onClick={() => deleteComment(comment._id, comment.author._id)}
                >
                  <MdDelete size={30} />
                </button>
                {comment.author._id === authorId ? (
                  <Link href={`/edit-post/${comment._id}`}>
                    <button>
                      <FaEdit size={30} />
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      alert("You are not allowed to edit this comment");
                    }}
                  >
                    <FaEdit size={30} />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className=" text-xl text-center font-semibold md:h-[10rem]">
            No comments yet, be the first
          </p>
        )}
      </div>
    </div>
  );
}
