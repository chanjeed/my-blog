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

        await createBlog(this.addTitle.value, this.addContent.value);
        this.addTitle.value = '';
        this.addContent.value = '';
    }

}

const addBlog = new AddBlog();