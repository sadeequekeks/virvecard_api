const ContactModel = require('../models/contact.model');

class ContactDao {
    constructor() { }

    addNewContact(obj) {
        return new Promise((resolve, reject) => {
            let newContact = new ContactModel(obj);
            newContact.save((err, savedUser) => {
                if (err) {
                    reject(err);
                }
                resolve(savedUser);
            });
        });
    }

    getOneContact(id) {
        return new Promise((resolve, reject) => {
            ContactModel.findById(id,  (err, singleUser) => { //exclude password
                if (err) {
                    reject(err);
                }
                resolve(singleUser);
            });
        });
    }

    getAllContact() {
        return new Promise((resolve, reject) => {
            ContactModel.find({},  (err, usersArray) => { //exclude password
                if (err) {
                    reject(err);
                }
                resolve(usersArray);
            });
        });
    }

    updateContact(id, fname, lname, phone) {
        return new Promise((resolve, reject) => {
            ContactModel.findByIdAndUpdate(id, { $set: { fname, lname, phone } }, { new: true }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    deleteContact(id) {
        return new Promise((resolve, reject) => {
            ContactModel.findOneAndDelete(id, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve('Contact Deleted Successfully!');
            });
        });
    }
}

module.exports = new ContactDao();