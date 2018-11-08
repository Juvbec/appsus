import storageService from '../storage.service.js'
import utilService from '../util.service.js'


const STORAGE_KEY = 'missKeepAppKey';

export default {
    query,
    getById,
    addNote,
    saveNote,
    deleteNote,
    getBase64Image,
}

function query(filter = null) {
    return storageService.load(STORAGE_KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = [];
                storageService.store(STORAGE_KEY, notes);
            }
            // console.log('notes: ', notes, 'filter: ', filter);
            if (filter === null || (filter.byTitle.trim() === '' && filter.byContent.trim() === '')) return notes;
            else return notes.filter(note => {
                if (filter.byContent && filter.byTitle) {
                    return note.content.toUpperCase().includes(filter.byContent.toUpperCase()) ||
                            note.title.toUpperCase().includes(filter.byTitle.toUpperCase());
                } else if (filter.byContent) {
                    return note.content.toUpperCase().includes(filter.byContent.toUpperCase());
                } else if (filter.byTitle) {
                    return note.title.toUpperCase().includes(filter.byTitle.toUpperCase());
                }
            });
        });
}

function getById(noteId) {
    return storageService.load(STORAGE_KEY)
        .then(notes => {
            return notes.find(note => note.id === noteId);
        })
}

function addNote(newNote) {
    saveNote(newNote);
    return Promise.resolve();
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

function deleteNote(noteId) {
    return storageService.load(STORAGE_KEY)
        .then(notes => {
            var noteIdx = notes.findIndex(note => note.id === noteId);
            notes.splice(noteIdx, 1);
            return storageService.store(STORAGE_KEY, notes);
        })
}

function getBase64Image(img) {
    // var FR = new FileReader();
    // FR.readAsDataURL(img);
    // var prmRes = FR.onload = () => {
    //     return Promise.resolve(FR.result);
    // };
    // return prmRes.then(() => prmRes);

}