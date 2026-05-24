import { useMemo, useState, useRef } from "react";
import { useNotes } from "../features/notes/hooks/useNotes";
import { NoteList } from "../features/notes/components/NoteList/NoteList";
import { Sidebar } from "../features/notes/components/Sidebar/Sidebar";
import { NoteEditor } from "../features/notes/components/NoteEditor/NoteEditor";
import { Toolbar } from "../features/notes/components/Toolbar/Toolbar";

import type { Tab, Note, Filter, FormatType } from "../features/notes/types";
import "./App.css";
import { wrapSelectedText } from "../features/notes/utils/markdown";

function App() {
  const { notes, addNote, deleteNote, toggleField, updateNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [editingContent, setEditingContent] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<Filter>("none");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const displayedNotes = useMemo(() => {
    const searchFilteredNotes = filteredNotes.filter((note) => {
      return note.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (sortBy !== "none") {
      return searchFilteredNotes.sort((a, b) => {
        switch (sortBy) {
          case "createdAtBeginning":
            return +new Date(a.createdAt) - +new Date(b.createdAt);

          case "createdAtEnd":
            return +new Date(b.createdAt) - +new Date(a.createdAt);

          case "updatedAt":
            return +new Date(a.updatedAt) - +new Date(b.updatedAt);

          default:
            return a.title.localeCompare(b.title);
        }
      });
    }

    return searchFilteredNotes;
  }, [searchQuery, sortBy, filteredNotes]);

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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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

  const handleFormat = (formatType: FormatType) => {
    if (textareaRef.current === null) return;
    const { value, selectionStart, selectionEnd } = textareaRef.current;

    const selectionData = wrapSelectedText(
      value,
      selectionStart,
      selectionEnd,
      formatType,
    );

    setEditingContent(selectionData.newValue);

    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(
        selectionData.newCursorPos,
        selectionData.newCursorPos,
      );
    }, 0);
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
          searchQuery={searchQuery}
          filter={sortBy}
          setSearchQuery={setSearchQuery}
          setFilter={setSortBy}
          onFormat={handleFormat}
        />
        {isEditing ? (
          <NoteEditor
            title={editingTitle}
            content={editingContent}
            onTitleChange={setEditingTitle}
            onContentChange={setEditingContent}
            textareaRef={textareaRef}
          />
        ) : (
          <NoteList
            notes={displayedNotes}
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
