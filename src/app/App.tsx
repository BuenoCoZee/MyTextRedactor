import { useState } from "react";
import { useNotes } from "../features/notes/hooks/useNotes";
import { NoteList } from "../features/notes/components/NoteList/NoteList";
import { Sidebar } from "../features/notes/components/Sidebar/Sidebar";
import { NoteEditor } from "../features/notes/components/NoteEditor/NoteEditor";

import type { Tab } from "../features/notes/types";

import "./App.css";

function App() {
  const { notes, addNote, deleteNote, toggleField, updateNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const filteredNotes = notes.filter((note) => {
    switch (activeTab) {
      case "all":
        return true;

      case "favorites":
        return note.isFavorite === true;

      case "archive":
        return note.isArchived === true;
    }
  });

  return (
    <div className="page-layout">
      <div className="column-wrapper">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <button
          onClick={() => {
            const newId = crypto.randomUUID();

            addNote({
              id: newId,
              title: "Заметка",
              content: "Текст заметки",
              isFavorite: false,
              isArchived: false,
            });

            setSelectedNoteId(newId);
            setIsEditing(true);
          }}
        >
          Создать
        </button>
      </div>

      {isEditing && selectedNoteId ? (
        <NoteEditor
          note={notes.find((note) => note.id === selectedNoteId)!}
          onSave={(id, title, content) => {
            updateNote(id, title, content);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <NoteList
          notes={filteredNotes}
          deleteNote={deleteNote}
          selectedNoteId={selectedNoteId}
          onSelectNote={setSelectedNoteId}
          toggleField={toggleField}
          setIsEdit={setIsEditing}
        />
      )}
    </div>
  );
}

export default App;
