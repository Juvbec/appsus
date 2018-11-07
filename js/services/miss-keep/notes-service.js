import storageService from '../storage.service.js'
import utilService from '../util.service.js'


const STORAGE_KEY = 'missKeepAppKey';

export default {
    query,
    getById,
    addNote,
    saveNote
}

function query(filter = null) {
    return storageService.load(STORAGE_KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = [];
                storageService.store(STORAGE_KEY, notes);
            }
            // console.log('notes: ', notes);
            if (filter === null) return notes;
            else return notes.filter(note => 
                            note.title.toUpperCase().includes(filter.byTitle.toUpperCase()));
        })
}

function getById(noteId) {
    return storageService.load(STORAGE_KEY)
        .then(notes => {
            return notes.find(note => note.id === noteId);
        })
}

function addNote(newNote) {
    saveNote(newNote);
}

function saveNote(note) {
    return storageService.load(STORAGE_KEY)
        .then(notes => {
            // Update
            if (note.id) {
                var noteIdx = notes.findIndex(currNote => currNote.id === note.id)
                notes.splice(noteIdx, 1, note);
            } else {
                // Add
                note.id = utilService.makeId();
                notes.push(note);
            }
            return storageService.store(STORAGE_KEY, notes);
        });
}
