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
    const querySnapshot = await db.collection("blogs").orderBy("createdAt", "desc").get()
    const data = []
    querySnapshot.forEach((doc) => {
        var date = doc.data().createdAt.toDate();
        data.push({ id: doc.id, title: doc.data().title, content: doc.data().content, createdAt: date.toISOString().slice(0, 10) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() });
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
    createdAt: new Date(),
    updatedAt: new Date()
})

export const updateBlog = (newData) => db.collection("blogs").doc(newData.id).update({
    title: newData.title,
    content: newData.content,
    updatedAt: new Date()
})

export const deleteBlog = (blogId) => db.collection('blogs').doc(blogId).delete()

