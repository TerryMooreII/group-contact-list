import firebase from 'firebase/app';
import 'firebase/firestore';
import Eventbus from './eventbus';

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
  .collection('contacts');

const toContact = (doc) => {
  const contact = doc.data();
  if (!contact) return undefined;

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

  // set access emails
  contact.accounts = contact.emailAddresses.map(email => email.address);

  return contact;
};

const datastore = {

  getContactList: group => new Promise(resolve => groupCollection.where('group.slug', '==', group)
    .orderBy('last', 'asc')
    .orderBy('first', 'asc')
    .onSnapshot((contactRef) => {
      const contacts = [];
      contactRef.forEach((doc) => {
        contacts.push(toContact(doc));
      });
      Eventbus.$emit('contacts', contacts);
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
  },

  groupsEmailAccontIsBelongsTo(email) {
    return new Promise(resolve => groupCollection.where('accounts', 'array-contains', email.toLowerCase())
      .onSnapshot((contactRef) => {
        const accounts = [];
        contactRef.forEach((doc) => {
          accounts.push(doc.data().group);
        });
        resolve(accounts);
      }));
  },

  login({ email, password }) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  logout() {
    return firebase.auth().signOut();
  },

  signup({ email, password }) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },

  sendPasswordResetEmail(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  },

  sendEmailVerification() {
    return firebase.auth().currentUser.sendEmailVerification();
  },

  getCurrentUser() {
    return firebase.auth().currentUser;
  },

};

export default datastore;
