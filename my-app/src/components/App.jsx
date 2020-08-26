import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';

function App() {
  const [ourNotes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevItems) => {
      console.log(...prevItems, newNote);
      return [...prevItems, newNote];
    });
  }

  function removeNote(id) {
    setNotes((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea handleAdd={addNote} />
      {ourNotes.map((note, index) => {
        return <Note key={index} title={note.title} content={note.content} />;
      })}
      <Footer />
    </div>
  );
}

export default App;
