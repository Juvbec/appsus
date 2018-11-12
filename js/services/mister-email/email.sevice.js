import storageService from '../storage.service.js'
import utilService from '../util.service.js'


const STORAGE_KEY = 'misterEmailAppKey';

export default {
    query,
    getById,
    addEmail,
    saveEmail,
    deleteEmail,
    verifyEmailAddress,
    getUnReadEmails,
    getProgressBarPrecentage,
}

function query(filter = null) {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            let jsonPrm;
            if (!emails || !emails.length) {
                jsonPrm = utilService.readTextFile("../../example-data/emails.json")
                .then(data=>{
                    emails = JSON.parse(text);
                    console.log('DEBUG::emails', emails);
                    storageService.store(STORAGE_KEY, emails);
                })
            } else {
                jsonPrm.resolve();
            }
            //to make sure that the json file has been read
            return jsonPrm.then(()=>{
                if (filter === null) return emails;

                else return emails.filter(email => {
                    return (
                        email.subject.toUpperCase().includes(filter.byTxt.toUpperCase())
                        && (email.isRead === !!filter.isRead || filter.isRead === 'all')
                    );
                }).sort((email1, email2) => {
                    return (email1.createdAt > email2.createdAt) === filter.byNew;
                })
            })
        })
}

function getById(emailId) {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            return emails.find(email => email.id === emailId);
        });
}

function addEmail(newEmail) {
    saveEmail(newEmail);
    return Promise.resolve();
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
        });
}

function verifyEmailAddress(address) {
    // var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var emailRE = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRE.test(address);
}

function getUnReadEmails() {
    return storageService.load(STORAGE_KEY)
        .then(emails => {
            return emails.filter(email => !email.isRead);
        });
}

function getProgressBarPrecentage() {
    return getUnReadEmails().then(unReadEmails => {
        return query().then(emails => {
            return {
                readEmails: emails.length - unReadEmails.length,
                allEmails: emails.length,
            }
        });
    });
}