const contacts = require('./db/contacts')

const { Command } = require('commander')
const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts()
      console.table(allContacts)
      break

    case 'get':
      const getContact = await contacts.getContactById(id)
      console.log(getContact)
      break

    case 'add':
      const newContact = await contacts.addContact(name, email, phone)
      console.log(newContact)
      break

    case 'updateById':
      const updateContact = await contacts.updateContactById(
        id,
        name,
        email,
        phone
      )
      if (!updateContact) {
        throw new Error(`Product with id=${id} not found`)
      }
      console.log(updateContact)
      break

    case 'remove':
      const removeContact = await contacts.removeContact(id)
      console.log(removeContact)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
