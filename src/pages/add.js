import { createBlog } from '../services/Firestore';

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

        const newData = {
            title: this.addTitle.value,
            content: this.addContent.value
        };

        await createBlog(newData);
        this.addTitle.value = '';
        this.addContent.value = '';
        window.location.href = 'index.html';   // redirect to index.html
    }

}

const addBlog = new AddBlog();