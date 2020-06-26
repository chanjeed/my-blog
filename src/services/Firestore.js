import firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.apiKey || '',
    authDomain: process.env.authDomain || '',
    databaseURL: process.env.databaseURL || '',
    projectId: process.env.projectId || '',
    storageBucket: process.env.storageBucket || '',
    messagingSenderId: process.env.messagingSenderId || '',
    appId: process.env.appId || '',
    measurementId: process.env.measurementId || ''
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const getBlogs = async () => {
    const querySnapshot = await db.collection("blogs").get()
    const data = []
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, title: doc.data().title })
    })
    return data
}

export const createBlog = (blog) => db.collection("blogs").add({ title: blog })

export const deleteBlog = (blogId) => db.collection('blogs').doc(blogId).delete()

