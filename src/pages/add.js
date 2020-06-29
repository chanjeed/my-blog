import { createBlog } from '../services/Firestore';
import firebase from 'firebase'
import '../services/Auth';

import './header.css';
import './body.css';
import './add.css';

class AddBlog {
    constructor() {
        this.form = document.forms['add-blog'];
        this.addTitle = document.getElementById('add-input-title');
        this.addContent = document.getElementById('add-input-content');
        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    async onSubmit(e) {
        e.preventDefault();

        if (this.addTitle.value == "") {
            // No title alert
            alert("Please fill in title!");

        }


        else {
            var user = firebase.auth().currentUser;
            const current_username = user.displayName;;
            console.log(current_username);

            const newData = {
                title: this.addTitle.value,
                content: this.addContent.value,
                author: current_username
            };


            await createBlog(newData);
            this.addTitle.value = '';
            this.addContent.value = '';
            window.location.href = 'index.html';   // redirect to index.html

        }

    }
}



const addBlog = new AddBlog();