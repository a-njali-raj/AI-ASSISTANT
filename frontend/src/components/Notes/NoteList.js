import React, { useState, useEffect } from 'react';
import { notesService } from '../../services/api';

const NoteList = ({ topicId }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, [topicId]);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await notesService.getAll();
            const filteredNotes = topicId 
                ? response.data.filter(note => note.topic === topicId)
                : response.data;
            setNotes(filteredNotes);
        } catch (err) {
            setError('Failed to fetch notes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading notes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="notes-list">
            <h2>Notes</h2>
            <div className="notes-grid">
                {notes.map((note) => (
                    <div key={note.id} className="note-card">
                        <h3>{note.title}</h3>
                        <p>{note.content.substring(0, 100)}...</p>
                        {note.summary && (
                            <div className="note-summary">
                                <h4>Summary</h4>
                                <p>{note.summary}</p>
                            </div>
                        )}
                        <div className="note-tags">
                            {note.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoteList;