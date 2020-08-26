import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import notes from '../notes';
import CreateArea from './CreateArea';

function App() {
  const [ourNotes, setNotes] = useState(notes);

  function addNote(newNote) {
    setNotes((prevItems) => {
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
      <CreateArea />
      {ourNotes.map((note, index) => {
        return <Note key={index} title={note.title} content={note.content} />;
      })}
      <Footer />
    </div>
  );
}

export default App;
