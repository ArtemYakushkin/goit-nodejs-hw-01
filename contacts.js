const fs = require("fs/promises");
const path = require("path");
const { v4 } = require('uuid');

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {

    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch(error) {
        console.log(error);
    }
};

async function updateSourceFile(instance) { 

    try {
        await fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
    } catch (error) {
        console.log(error);
    }
};

async function getContactsById(contactId) {

    try {
        const contacts = await listContacts();
        const result = contacts.find(({ id }) => id === contactId) || null;
        return result;
    } catch(error) {
        console.log(error);
    }
};

async function addContact(name, email, phone) {

    try {
        const newContact = { id: v4(), name, email, phone };
        const allContacts = await listContacts();
        const changeObj = [...allContacts, newContact];
        await updateSourceFile(changeObj);
        return newContact;
    } catch(error) {
        console.log(error);
    }
};

async function removeContact(contactId) {
    try {
        const allContacts = await listContacts();
        const idx = allContacts.findIndex(({ id }) => id === contactId);
        if (idx === -1) return null;
        const deleteContact = allContacts.splice(idx, 1);
        await updateSourceFile();
        return deleteContact;
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