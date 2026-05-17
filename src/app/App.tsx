import "./App.css";
import { useNotes } from "../features/notes/hooks/useNotes";
import { NoteList } from "../features/notes/components/NoteList/NoteList";
import { useState } from "react";

function App() {
  const { notes, addNote, deleteNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  return (
    <>
      <NoteList
        notes={notes}
        addNote={addNote}
        deleteNote={deleteNote}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
      />
    </>
  );
}

export default App;
