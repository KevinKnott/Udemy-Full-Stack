import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import notes from '../notes';
import CreateArea from './CreateArea';

function App() {
  const [ourNotes, setNotes] = useState(notes);

  return (
    <div>
      <Header />
      <CreateArea />
      {ourNotes.map((note) => {
        return (
          <Note key={note.key} title={note.title} content={note.content} />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
