import React, { useState } from 'react';

function CreateArea() {
  const [localNote, setlocalNote] = useState({ title: '', content: '' });

  function handleChange(event) {
    const { name, value } = event.target;

    setlocalNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  return (
    <div>
      <form>
        <input onChange={handleChange} name="title" placeholder="Title" />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          cols="30"
          rows="3"
        ></textarea>
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
