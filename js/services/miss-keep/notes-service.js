import storageService from '../storage.service.js'
import utilService from '../util.service.js'


const STORAGE_KEY = 'missKeepAppKey';

export default {
    query,
    getById,
    addNote,
}

function query(filter = null) {
    return storageService.load(STORAGE_KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = [];
                storageService.store(STORAGE_KEY, notes);
            }
            console.log('notes: ', notes);
            if (filter === null) return notes;
            else return notes.filter(note => 
                            note.vendor.toUpperCase().includes(filter.byVendor.toUpperCase()));
        })
}

function getById(noteId) {
    return storageService.load(STORAGE_KEY)
        .then(notes => {
            return notes.find(note => note.id === noteId);
        })
}

function addNote(newNote) {

}
