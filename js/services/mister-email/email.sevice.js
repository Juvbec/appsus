import storageService from '../storage.service.js'
import utilService from '../util.service.js'


const STORAGE_KEY = 'missKeepAppKey';

export default {
    query,
    getById,
    addEmail,
    saveEmail
}

function query(filter = null) {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            if (!emails || !emails.length) {
                emails = [];
                storageService.store(STORAGE_KEY, emails);
            }
            console.log('emails: ', emails);
            if (filter === null) return emails;
            else return emails.filter(email => 
                            email.vendor.toUpperCase().includes(filter.byVendor.toUpperCase()));
        })
}

function getById(emailId) {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            return emails.find(email => email.id === emailId);
        })
}

function addEmail(newEmail) {
    // console.log(newNote);
    newEmail.id = utilService.makeId();
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
