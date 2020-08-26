import React, { useState } from 'react';

function CreateArea(props) {
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

  function submitNode(event) {
    props.handleAdd(localNote);
    setlocalNote({ title: '', content: '' });
    event.preventDefault();
  }
  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          value={localNote.title}
          name="title"
          placeholder="Title"
        />
        <textarea
          onChange={handleChange}
          value={localNote.content}
          name="content"
          placeholder="Take a note..."
          cols="30"
          rows="3"
        ></textarea>
        <button onClick={submitNode}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
