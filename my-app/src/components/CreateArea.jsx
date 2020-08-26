import React from 'react';

function CreateArea() {
  return (
    <div>
      <form>
        <input name="title" placeholder="Title" />
        <textarea
          name="content"
          placeholder="Take a note..."
          cols="30"
          rows="3"
        ></textarea>
      </form>
    </div>
  );
}

export default CreateArea;
