import React, { useState } from 'react';
import { TbEditCircle } from 'react-icons/tb';

const EditableParagraph = ({ placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(placeholder);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    // Here you can add logic to save the updated text to your backend
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="relative">
      {isEditing ? (
        <div>
          <textarea
            value={text}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleUpdate}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleEdit}
            className="text-2xl p-1 text-gray-500 hover:text-gray-700"
            style={{float:'left'}}
          >
            <TbEditCircle />
          </button>
          <h1 className="text-2xl font-bold mb-4">{text}</h1>
          
        </div>
      )}
    </div>
  );
};

export default EditableParagraph;