const express = require('express');
const ContactDao = require('../dao/dao.contact');

module.exports = () => {
    const api = express.Router();

    //Create Contact
    api.post('/', async (req, res) => {
        try {
            const savedUser = await ContactDao.addNewContact(req.body);
            res.status(200).json({ status: 'success', payload: savedUser, message: 'Contact created successfully!' });
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });

    //Get all Contact
    api.get('/', async (req, res) => {
        try {
            const usersArray = await ContactDao.getAllContact();
            res.status(200).json({ status: 'success', payload: usersArray, message: 'All Contact fetched successfully' });
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });

    //read one contact
    api.get('/:id', async (req, res) => {
        const id = req.params.id;
        if (id) {
            try {
                const singleUser = await ContactDao.getOneContact(id);
                res.status(200).json({ status: 'success', payload: singleUser, message: 'Single contact fetched Successfully!' });
            } catch (err) {
                res.status(500).json({ status: 'failed', payload: null, message: err });
            }
        } else {
            res.status(500).json({ status: 'failure', payload: null, message: 'Invalid Contact id to fetch' });
        }
    });

    //update contact
    api.put('/:id', async (req, res) => {
        const id = req.params.id;
        const { fname, lname, phone } = req.body;
        if (id) {
            try {
                const updatedUser = await ContactDao.updateContact(id, fname, lname, phone);
                res.status(200).json({ status: 'success', payload: updatedUser, message: 'Single contact Updated Successfully!' });
            } catch (err) {
                res.status(500).json({ status: 'failed', payload: null, message: err });
            }
        } else {
            res.status(500).json({ status: 'failure', payload: null, message: 'Invalid Contact id to Update' });
        }
    });

    //delete contact
    api.delete('/:id', async (req, res) => {
        const id = req.params.id;
        if (id) {
            try {
                await ContactDao.deleteContact(id);
                res.status(200).json({ status: 'success', payload: null, message: 'Contact Deleted Successfully!' });
            } catch (err) {
                res.status(500).json({ status: 'failed', payload: null, message: err });
            }
        } else {
            res.status(500).json({ status: 'failure', payload: null, message: 'Invalid Contact id to Update' });
        }
    });

    return api;
}