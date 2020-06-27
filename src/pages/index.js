import getBlogs from '../services/Firestore';

import './header.css';
import './body.css';
import './index.css';


class BlogList {
    constructor() {
        this.list = document.querySelector('#blog-list ul');
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        this.list.addEventListener('click', this.onDeleteButtonClick.bind(this));
    }

    async render() {
        const blogs = await getBlogs();
        let lis = '';
        blogs.forEach((blog) => lis += `<li><span class="name">${blog.title}</span><span class="delete" data-id=${blog.id}>delete</span></li>`);
        this.list.innerHTML = lis;
    }
}

const blogList = new BlogList();

