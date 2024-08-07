import React, { useState , useEffect} from 'react';
import { TbEditCircle } from 'react-icons/tb';

const EditableParagraph = ({ onDataSend, placeholder }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(placeholder);
  
  useEffect(() => {
    // Function to update string based on attribute
    function updateString() {
      setText(placeholder)
    }

    // Call the function when attribute changes
    updateString();
  }, [placeholder]); 

  const handleEdit = () => {
    setIsEditing(true);
    
  };

  const handleUpdate = () => {
    setIsEditing(false);
    onDataSend(text.split(":")[1])
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
            id=""
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
          <h1 className="text-2xl font-bold mb-4"> {text}</h1>
          
        </div>
      )}
    </div>
  );
};

export default EditableParagraph;