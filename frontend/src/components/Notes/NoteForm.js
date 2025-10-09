import React, { useState } from 'react';
import { notesService } from '../../services/api';

const NoteForm = ({ topicId, onSubmit }) => {
    const [note, setNote] = useState({
        title: '',
        content: '',
        topic: topicId,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Create the note
            const response = await notesService.create(note);
            const newNote = response.data;

            // Generate AI summary and tags
            await Promise.all([
                notesService.generateSummary(newNote.id),
                notesService.suggestTags(newNote.id)
            ]);

            // Reset form
            setNote({ title: '', content: '', topic: topicId });
            onSubmit && onSubmit(newNote);
        } catch (err) {
            setError('Failed to create note');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <h3>Create New Note</h3>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
                <input
                    type="text"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                    placeholder="Note Title"
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                    placeholder="Note Content"
                    required
                    rows={6}
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Note'}
            </button>
        </form>
    );
};

export default NoteForm;