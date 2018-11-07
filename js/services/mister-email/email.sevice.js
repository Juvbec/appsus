import storageService from '../storage.service.js'
import utilService from '../util.service.js'


const STORAGE_KEY = 'misterEmailAppKey';

export default {
    query,
    getById,
    addEmail
}
// filter = null
function query() {
    // return storageService.load(STORAGE_KEY)
    //     .then(emails => {
    //         if (!emails || !emails.length) {
    //             emails = [];
    //             storageService.store(STORAGE_KEY, emails);
    //         }
    //         console.log('emails: ', emails);
    //         if (filter === null) return emails;
    //         else return emails.filter(email => 
    //                         email.vendor.toUpperCase().includes(filter.byVendor.toUpperCase()));
    //     })
    var emails = [
        {
            id: utilService.makeId(),
            subject: 'im juval',
            from: 'juval',
            to: 'orpaz',
            txt: 'gjdsfklgjdfksl'
        },
        {
            id: utilService.makeId(),
            subject: 'im orpaz',
            from: 'orpaz',
            to: 'juval',
            txt: 'AAAAAAAAAAAAAa'
        },
        
    ]
    return Promise.resolve(emails);
}

function getById(emailId) {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            return emails.find(email => email.id === emailId);
        })
}

function addEmail(newNote) {

}
