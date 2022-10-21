const fs = require("fs/promises");
const path = require("path");
const { v4 } = require('uuid');

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {

    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch(error) {
        console.log(error.mesage);
    }
};

async function updateSourceFile(instance) { 

    try {
        fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
    } catch (error) {
        console.log(error);
    }
};

async function getContactsById(contactId) {

    try {
        const contacts = await listContacts();
        const result = contacts.find(({ id }) => id === contactId);
        return result;
    } catch(error) {
        console.log(error.mesage);
    }
};

async function addContact(name, email, phone) {

    try {
        const newContact = { id: v4(), name: name, email: email, phone: phone };
        const allContacts = await listContacts();
        const changeObj = [...allContacts, newContact];
        updateSourceFile(changeObj);
        return newContact;
    } catch(error) {
        console.log(error);
    }
};

async function removeContact(contactId) {
    try {
        const allContacts = await listContacts();
        const changeObj = allContacts.filter(({ id }) => id !== contactId);
        updateSourceFile(changeObj);
        return allContacts.filter(({ id }) => id === contactId);
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    listContacts,
    updateSourceFile,
    getContactsById,
    addContact,
    removeContact
};