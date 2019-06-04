import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: '',
  authDomain: 'mn-mng.firebaseapp.com',
  databaseURL: 'https://mn-mng.firebaseio.com/',
  storageBucket: 'mn-mng',
}

const app = Firebase.initializeApp(firebaseConfig)

export default app.database()
