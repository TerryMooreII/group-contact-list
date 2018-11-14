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

const datastore = {

  getContactList: () => new Promise(resolve => groupCollection
    .onSnapshot((contactRef) => {
      const contacts = [];
      contactRef.forEach((doc) => {
        const contact = doc.data();
        contact.id = doc.id;
        contacts.push(contact);
      });
      resolve(contacts);
    }))
};

export default datastore;
