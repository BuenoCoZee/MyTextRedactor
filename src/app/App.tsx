import { useState } from "react";
import { useNotes } from "../features/notes/hooks/useNotes";
import { NoteList } from "../features/notes/components/NoteList/NoteList";
import { Sidebar } from "../features/notes/components/Sidebar/Sidebar";
import { NoteEditor } from "../features/notes/components/NoteEditor/NoteEditor";
import { Toolbar } from "../features/notes/components/Toolbar/Toolbar";

import type { Tab, Note } from "../features/notes/types";

import "./App.css";

function App() {
  const { notes, addNote, deleteNote, toggleField, updateNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [editingContent, setEditingContent] = useState<string>("");

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

  const handleSave = () => {
    if (editingTitle.replace(/^\s+/, "") === "") return;
    if (selectedNoteId !== null)
      updateNote(selectedNoteId!, editingTitle, editingContent);

    if (selectedNoteId === null) {
      addNote({
        id: crypto.randomUUID(),
        title: editingTitle,
        content: editingContent,
        isFavorite: false,
        isArchived: false,
      });
    }

    setIsEditing(false);
    setSelectedNoteId(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedNoteId(null);
  };

  const handleCreateNote = () => {
    setEditingTitle("");
    setEditingContent("");

    setSelectedNoteId(null);
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setEditingTitle(note.title);
    setEditingContent(note.content);
    setIsEditing(true);
  };

  return (
    <div className="page-layout">
      <div className="column-wrapper">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="column-wrapper">
        <Toolbar
          isEditing={isEditing}
          onCreateNote={handleCreateNote}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        {isEditing ? (
          <NoteEditor
            title={editingTitle}
            content={editingContent}
            onTitleChange={setEditingTitle}
            onContentChange={setEditingContent}
          />
        ) : (
          <NoteList
            notes={filteredNotes}
            deleteNote={deleteNote}
            onSelectNote={handleEditNote}
            toggleField={toggleField}
            setIsEdit={setIsEditing}
          />
        )}
      </div>
    </div>
  );
}

export default App;
