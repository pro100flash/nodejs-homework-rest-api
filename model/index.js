const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, '/contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(({ id }) => id.toString() === contactId)
    return contact
  } catch (error) {
  }
}

const removeContact = async (contactId) => {
  try {
    const deletedContact = getContactById(contactId)
    if (!deletedContact) return

    const contacts = await listContacts()
    const filteredContacts = contacts.filter((contact) => {
      return contact.id !== contactId
    })

    const stringifiedArray = JSON.stringify(filteredContacts, null, 2)
    await fs.writeFile(contactsPath, stringifiedArray, 'utf8')
    return deletedContact
  } catch (error) {
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts()
    const newContact = { id: uuidv4(), ...body }
    const contactsArray = [...contacts, newContact]

    const stringifiedArray = JSON.stringify(contactsArray, null, 2)

    await fs.writeFile(contactsPath, stringifiedArray, 'utf8')
    return newContact
  } catch (error) {
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex(({ id }) => id.toString() === contactId)
    if (index === -1) return
    contacts[index] = { ...contacts[index], ...body }

    const stringifiedArray = JSON.stringify(contacts, null, 2)

    await fs.writeFile(contactsPath, stringifiedArray, 'utf8')
    return contacts[index]
  } catch (error) {
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
