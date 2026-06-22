import { useMemo, useState } from "react";
import { useNotes } from "../features/notes/hooks/useNotes";
import { NoteList } from "../features/notes/components/NoteList/NoteList";
import { Sidebar } from "../features/notes/components/Sidebar/Sidebar";
import { NoteEditor } from "../features/notes/components/NoteEditor/NoteEditor";
import { Toolbar } from "../features/notes/components/Toolbar/Toolbar";
import type { Editor } from "@tiptap/react";
import { Modal } from "../shared/components/Modal/Modal";
import { ConfirmDeleteDialog } from "../shared/components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { ConfirmExitDialog } from "../shared/components/ConfimExitDialog/ConfirmExitDialog";
import { AuthForm } from "../features/auth/components/AuthForm/AuthForm";

import type { Tab, Note, Filter, NoteColor } from "../features/notes/types";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useAuth } from "./providers/useAuth";

function App() {
  const { user, isLoading, signOut } = useAuth();
  const { notes, addNote, deleteNote, toggleField, updateNote } = useNotes(
    user?.id || "",
  );
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [editingContent, setEditingContent] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<Filter>("none");

  const [editor, setEditor] = useState<Editor | null>(null);

  const [noteColor, setNoteColor] = useState<NoteColor>("#2a2a2a");
  const [currentTextColor, setCurrentTextColor] = useState<string>("#78d9b8");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);

  const [originalTitle, setOriginalTitle] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");

  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

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
            return +new Date(b.updatedAt) - +new Date(a.updatedAt);

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
      updateNote(selectedNoteId!, editingTitle, editingContent, noteColor);

    if (selectedNoteId === null) {
      addNote({
        id: crypto.randomUUID(),
        title: editingTitle,
        content: editingContent,
        isFavorite: false,
        isArchived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        bgColor: noteColor,
        userId: user!.id,
      });
    }

    setIsEditing(false);
    setSelectedNoteId(null);
  };

  const handleCancel = () => {
    if (originalTitle !== editingTitle || originalContent !== editingContent) {
      setIsExitModalOpen(true);
    } else {
      setIsEditing(false);
      setSelectedNoteId(null);
    }
  };

  const handleCreateNote = () => {
    setEditingTitle("");
    setEditingContent("");
    setSelectedNoteId(null);
    setIsEditing(true);
    setOriginalTitle("");
    setOriginalContent("");
    setNoteColor("#2a2a2a");
  };

  const handleEditNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setEditingTitle(note.title);
    setEditingContent(note.content);
    setIsEditing(true);
    setNoteColor(note.bgColor);
    setOriginalTitle(note.title);
    setOriginalContent(note.content);
  };

  const handleBurgerMenu = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleEditorReady = (editor: Editor | null) => {
    setEditor(editor);
  };

  const handleBgColorChange = (color: NoteColor) => {
    setNoteColor(color);
  };

  const handleTextColorChange = (color: string) => {
    setCurrentTextColor(color);
  };

  const toggleModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteRequest = (id: string) => {
    setIsDeleteModalOpen(true);
    setNoteToDelete(id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id === "favorites") {
      return toggleField(active.id as string, "isFavorite");
    }

    if (over?.id === "archive") {
      return toggleField(active.id as string, "isArchived");
    }

    return;
  };

  return (
    <div className="page-layout">
      {isLoading ? (
        <div className="interface-loader">Загрузка...</div>
      ) : !user ? (
        <AuthForm />
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="column-wrapper">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isMobileMenuOpen={isMobileSidebarOpen}
            />
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
              editor={editor}
              textColor={currentTextColor}
              setTextColor={handleTextColorChange}
              isOpenMobileMenu={isMobileSidebarOpen}
              setIsOpenMobileMenu={handleBurgerMenu}
              username={user.user_metadata.username}
              onSignOut={signOut}
            />
            {isEditing ? (
              <NoteEditor
                title={editingTitle}
                content={editingContent}
                onTitleChange={setEditingTitle}
                onContentChange={setEditingContent}
                onEditorReady={handleEditorReady}
                noteColor={noteColor}
                setNoteColor={handleBgColorChange}
                onColorChange={handleTextColorChange}
              />
            ) : (
              <NoteList
                notes={displayedNotes}
                onRequestDelete={handleDeleteRequest}
                onSelectNote={handleEditNote}
                toggleField={toggleField}
                setIsEdit={setIsEditing}
              />
            )}
          </div>
        </DndContext>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={toggleModal}>
          <ConfirmDeleteDialog
            onConfirm={() => {
              deleteNote(noteToDelete!);
              setIsDeleteModalOpen(false);
              setNoteToDelete(null);
            }}
            onCancel={toggleModal}
          />
        </Modal>
      )}

      {isExitModalOpen && (
        <Modal
          onClose={() => {
            setIsExitModalOpen(!isExitModalOpen);
          }}
        >
          <ConfirmExitDialog
            onConfirm={() => {
              setIsEditing(false);
              setSelectedNoteId(null);
              setIsExitModalOpen(false);
            }}
            onCancel={() => {
              setIsExitModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
