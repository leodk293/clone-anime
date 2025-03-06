import React, { useState } from "react";

const CommentBox = ({ username, comment, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    console.log("Updated Comment:", editedComment);
    setIsModalOpen(false);
  };

  return (
    <div className="border border-transparent shadow p-4 rounded-[5px] bg-gray-50 flex flex-col gap-2">
      <p className="font-semibold">
        Posted By : <span className="font-bold">{username}</span>
      </p>
      <h1 className=" text-2xl font-bold">{title}</h1>
      <p>{comment}</p>
      <div className="flex flex-row gap-4">
        <button
          onClick={handleEditClick}
          className="w-[100px] border border-transparent font-bold bg-blue-800 px-3 py-1 rounded-[5px] text-white"
        >
          Edit
        </button>
        <button className="w-[100px] border border-transparent font-bold bg-red-800 px-3 py-1 rounded-[5px] text-white">
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white flex flex-col gap-2 w-full max-w-[40rem] p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Edit Comment</h2>
            <input
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={editedTitle}
              className="w-full p-2 border border-transparent bg-[#f1f1f1] outline-none rounded-md"
            />
            <textarea
              placeholder="Comment"
              className="w-full p-2 border border-transparent bg-[#f1f1f1] outline-none rounded-md"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-3 py-1 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-3 py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
