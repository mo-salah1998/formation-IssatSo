


import React, { useState } from 'react';

const AddPostForm = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')


  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      setTitle('')
      setContent('')
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = [].map(user => (
    <option key={user.id} value={user.id}>
      {user?.name}
    </option>
  ))

  return (
    <section className="max-w-2xl p-8 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-[#F16E00] mb-6">Add a New Post</h2>
      <form className="space-y-4">
        {/* Post Title */}
        <div>
          <label htmlFor="postTitle" className="block mb-1 font-medium text-gray-700 text-md">
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F16E00] focus:border-transparent"
            placeholder="Enter your post title"
          />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="postAuthor" className="block mb-1 font-medium text-gray-700 text-md">
            Author:
          </label>
          <select
            id="postAuthor"
            value={userId}
            onChange={onAuthorChanged}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F16E00] focus:border-transparent"
          >
            <option value="">Select an author</option>
            {usersOptions}
          </select>
        </div>

        {/* Content */}
        <div>
          <label htmlFor="postContent" className="block mb-1 font-medium text-gray-700 text-md">
            Content:
          </label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F16E00] focus:border-transparent"
            rows="5"
            placeholder="Write your content here..."
          />
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
          className={`w-full py-2 px-4 text-white font-medium rounded-md ${
            !canSave
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#ff7900] hover:bg-[#F16E00] focus:ring-2 focus:ring-[#ff7900]'
          }`}
        >
          Save Post
        </button>
      </form>
    </section>

  )
}

export default AddPostForm; 