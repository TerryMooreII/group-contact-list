import firebase from 'firebase/app';
import 'firebase/firestore';


const config = {
  apiKey: 'AIzaSyBHg_bKCp8xe-7mxV9ZI9jptVI-WCqLjz8',
  authDomain: 'group-contact-list.firebaseapp.com',
  databaseURL: 'https://group-contact-list.firebaseio.com',
  projectId: 'group-contact-list',
  storageBucket: 'group-contact-list.appspot.com',
  messagingSenderId: '786046768331'
};
firebase.initializeApp(config);

const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);


const groupCollection = firebase.firestore()
  .collection('schmitz');

const toContact = (doc) => {
  const contact = doc.data();
  contact.id = doc.id;
  contact.birthDate = contact.birthDate ? contact.birthDate.toDate() : null;
  contact.events = contact.events
    .map(event => ({ date: event.date ? event.date.toDate() : null, label: event.label }));
  return contact;
};

const sanitize = (c) => {
  const contact = c;
  Object.keys(contact).forEach((value) => {
    if (Array.isArray(contact[value])) {
      if (contact[value].length > 0 && Object.keys(contact[value][0]).length === 0) {
        contact[value] = [];
      }
    }
    if (contact[value] === null) {
      contact[value] = '';
    }
  });
  return contact;
};

const datastore = {

  getContactList: () => new Promise(resolve => groupCollection
    .onSnapshot((contactRef) => {
      const contacts = [];
      contactRef.forEach((doc) => {
        contacts.push(toContact(doc));
      });
      resolve(contacts);
    })),

  getContact: id => groupCollection.doc(id).get().then(doc => toContact(doc)),

  updateContact: (contact) => {
    const { id } = contact;
    return groupCollection.doc(id).update(sanitize(contact));
  },

  addContact: contact => groupCollection.add(sanitize(contact)),

  deleteContact(contact) {
    const { id } = contact;
    return groupCollection.doc(id).delete();
  }
};

export default datastore;
