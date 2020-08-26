import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {
  const [localNote, setlocalNote] = useState({ title: '', content: '' });
  const [isExpanded, setExpanded] = useState(false);

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

  function clickedForm() {
    setExpanded(true);
  }

  return (
    <div>
      <form onClick={clickedForm} className="create-note">
        {isExpanded && (
          <input
            onChange={handleChange}
            value={localNote.title}
            name="title"
            placeholder="Title"
          />
        )}
        <textarea
          onChange={handleChange}
          value={localNote.content}
          name="content"
          placeholder="Take a note..."
          cols="30"
          rows={isExpanded ? 3 : 1}
        ></textarea>
        <Zoom in={isExpanded}>
          <Fab onClick={submitNode}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
