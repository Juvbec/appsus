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
            if (!emails || !emails.length) {
                emails = [
                    {
                        "recipient": "ime@amazin.com",
                        "cc": null,
                        "sender": "Myself@fake.com",
                        "subject": "amazin Membership",
                        "message": "Due to problems with your card, we have been unable to charge your account the money for your membership.\nYour membership has been canceled.",
                        "isMine": true,
                        "isRead": false,
                        "createdAt": 1542039969191,
                        "id": "TT6fD"
                    },
                    {
                        "recipient": "jonybar9@gmail.com",
                        "cc": null,
                        "sender": "Myself@fake.com",
                        "subject": "let's work on the project!",
                        "message": "hey!\nwe have to finish the project until November 12th.\nplease send me the dates we can schedule the meeting.",
                        "isMine": true,
                        "isRead": false,
                        "createdAt": 1542040092339,
                        "id": "Dnijy"
                    },
                    {
                        "recipient": "maor@gmail.com",
                        "cc": null,
                        "sender": "Myself@fake.com",
                        "subject": "Ski this weekend?",
                        "message": "There's a great deal for skiing this weekend,\nbut we need to order the tickets now.\nare you up for that?",
                        "isMine": true,
                        "isRead": true,
                        "createdAt": 1542040160955,
                        "id": "VCgIC"
                    },
                    {
                        "recipient": "maor@gmail.com",
                        "cc": null,
                        "sender": "Myself@fake.com",
                        "subject": "RE:Ski this weekend?",
                        "message": "Yes of course!!\nsend me the link right away\n                \n\n> On  12.11.2018, 6:29 pm \n Myself@fake.com sent: \n    \"\n    There's a great deal for skiing this weekend,\nbut we need to order the tickets now.\nare you up for that?\n    \"\n                ",
                        "isMine": true,
                        "isRead": false,
                        "createdAt": 1542040225326,
                        "id": "6ddLI"
                    },
                    {
                        "recipient": "yaron12@yahoo.com",
                        "cc": null,
                        "sender": "Myself@fake.com",
                        "subject": "applying for the university",
                        "message": "hi there!\ni want to study computer science, can you tell me about the department in your university?\nthank you very much!",
                        "isMine": true,
                        "isRead": false,
                        "createdAt": 1542040332925,
                        "id": "NXSuX"
                    },
                    {
                        "recipient": "matanbenshlomo@gmail.com",
                        "cc": null,
                        "sender": "Myself@fake.com",
                        "subject": "Guitar lessons",
                        "message": "hi there,\nim looking for a guitar teacher, and max recommended you to me.\ncan we schedule a lesson?",
                        "isMine": true,
                        "isRead": false,
                        "createdAt": 1542040453504,
                        "id": "oJvwc"
                    },
                    {
                        "recipient": "service@skideal.com",
                        "cc": null,
                        "sender": "Myself@fake.com",
                        "subject": "purchasing a vacation",
                        "message": "hello\nhow much is it for a weekend at bansko?\nalso, which hotel are you staying at there?\nthank you",
                        "isMine": true,
                        "isRead": false,
                        "createdAt": 1542040609708,
                        "id": "Ez7J3"
                    },
                    {
                        "recipient": "lab@laboffice.com",
                        "cc": null,
                        "sender": "Myself@fake.com",
                        "subject": "fixing my computer",
                        "message": "my computer has been damaged.\nwhen can i come with it?",
                        "isMine": true,
                        "isRead": false,
                        "createdAt": 1542040674951,
                        "id": "AMx7b"
                    },
                    {
                        "recipient": "ofri90@walla.com",
                        "cc": [
                            "ron@gmail.com",
                            " or@gmail.com"
                        ],
                        "sender": "Myself@fake.com",
                        "subject": "lets watch a movie?",
                        "message": "lets go watch that new marvel movie together!",
                        "isMine": true,
                        "isRead": true,
                        "createdAt": 1542040804137,
                        "id": "ACAGi"
                    },
                    {
                        "recipient": "orpaz@gmail.com",
                        "cc": null,
                        "sender": "Myself@fake.com",
                        "subject": "Code Review",
                        "message": "we have a code review!\nlets fix all of the bugs!",
                        "isMine": true,
                        "isRead": false,
                        "createdAt": 1542040869274,
                        "id": "SqSx9"
                    }
                ]
                storageService.store(STORAGE_KEY, emails)
            }


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




