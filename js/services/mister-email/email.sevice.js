import storageService from '../storage.service.js'
import utilService from '../util.service.js'


const STORAGE_KEY = 'misterEmailAppKey';

export default {
    query,
    getById,
    addEmail,
    saveEmail,
    deleteEmail
}

function query(filter = null) {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            if (!emails || !emails.length) {
                emails = [];
                storageService.store(STORAGE_KEY, emails);
            }
            // console.log('notes: ', notes);
            if (filter === null) return emails;
            else return emails.filter(email => 
                            email.title.toUpperCase().includes(filter.byTitle.toUpperCase()));
        })
}

function getById(emailId) {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            return emails.find(email => email.id === emailId);
        })
}

function addEmail(newEmail) {
    saveEmail(newEmail);
}

function saveEmail(email) {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            // Update
            if (email.id) {
                var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
                emails.splice(emailIdx, 1, email);
            } else {
                // Add
                email.id = utilService.makeId();
                emails.push(email);
            }
            return storageService.store(STORAGE_KEY, emails);
        });
}

function deleteEmail(emailId) {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            storageService.store(STORAGE_KEY, emails);
            return Promise.resolve(emails);
        })
}