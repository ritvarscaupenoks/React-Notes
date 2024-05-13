import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Notes() {

    const [notes, setNotes] = useState(["Eat", "Sleep", "Code"]);
    const [newNote, setNewNote] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");


    const handleChange = (event) => {
        setNewNote(event.target.value);
    }

    const handleEditChange = (event) => {
        setEditValue(event.target.value);
    }

    function addNote() {
        if (newNote.trim() !== "") {
            setNotes([newNote, ...notes]);
            setNewNote("");
        }
    }

    function deleteNote(index) {
        const newNotes = notes.filter((note, i) => i !== index);
        setNotes(newNotes);
    }

    function updateNote() {
        if (editValue.trim() !== "") {
            const newNotes = [...notes];
            newNotes[editIndex] = editValue;
            setNotes(newNotes);
            setEditIndex(null);
            setEditValue("");
        }
    }

    return (
        <div className="todo-container">
            <h1>Get things done!</h1>
            <div className="input-container">
                <input type="text" value={newNote} onChange={handleChange} placeholder="Enter a task..." />
                <button className="add-btn" onClick={addNote}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <ol>
                {notes.map((note, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <input type="text" value={editValue} onChange={handleEditChange} className="edit-input" />
                        ) : (
                            <span className="text">{note}</span>
                        )}
                        {editIndex !== index && <button className="delete-btn" onClick={() => deleteNote(index)}><FontAwesomeIcon icon={faTrashCan} /></button>}
                        {editIndex === index ? (
                            <button className="save-btn" onClick={updateNote}><FontAwesomeIcon icon={faCheck} /></button>
                        ) : (
                            <button className="edit-btn" onClick={() => {
                                setEditIndex(index);
                                setEditValue(note);
                            }}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    )
};

export default Notes;