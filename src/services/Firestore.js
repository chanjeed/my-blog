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

export const getBlogs = async (sortby) => {
    const querySnapshot = await db.collection("blogs").orderBy(sortby, "desc").get()
    const data = []
    querySnapshot.forEach((doc) => {
        var create = doc.data().createdAt.toDate();
        var update = doc.data().updatedAt.toDate();
        data.push({ id: doc.id, title: doc.data().title, content: doc.data().content, author: doc.data().author, createdAt: create.toISOString().slice(0, 10) + " " + create.getHours() + ":" + create.getMinutes() + ":" + create.getSeconds(), updatedAt: update.toISOString().slice(0, 10) + " " + update.getHours() + ":" + update.getMinutes() + ":" + update.getSeconds() });
    })
    return data
}

export const getBlog = async (blogId) => {
    const querySnapshot = await db.collection("blogs").doc(blogId).get()
    console.log(querySnapshot.data())
    return querySnapshot.data()
}

export const createBlog = (newData) => db.collection("blogs").add({
    title: newData.title,
    content: newData.content,
    author: newData.author,
    createdAt: new Date(),
    updatedAt: new Date()
})

export const updateBlog = (newData) => db.collection("blogs").doc(newData.id).update({
    title: newData.title,
    content: newData.content,
    updatedAt: new Date()
})

export const deleteBlog = (blogId) => db.collection('blogs').doc(blogId).delete()


