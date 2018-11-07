import storageService from './storage.service.js'
import utilService from './util.service.js'


const STORAGE_KEY = 'misterEmailAppKey';

export default {
    query,
    getById,
    addEmail
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

function addEmail(newNote) {

}
