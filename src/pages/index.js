import { getBlogs, deleteBlog } from '../services/Firestore';

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
        this.list.addEventListener('click', this.viewClick.bind(this));
    }


    async onDeleteButtonClick(e) {
        if (e.target.className == 'delete') {
            const blogId = e.target.dataset.id;
            // console.log(e.target.dataset)
            await deleteBlog(blogId);
            this.render();
        }
    }

    async viewClick(e) {
        if (e.target.className != 'delete') {
            const blogId = e.target.dataset.id;
            //console.log(e.target.dataset.id);
            //const blog = await getBlog(blogId);
            var url = 'view.html?blogId=' + encodeURIComponent(blogId);
            window.location.href = url;
        }
    }

    async render() {
        const blogs = await getBlogs();
        let lis = '';
        blogs.forEach((blog) => lis += `<li data-id=${blog.id}><span class="name">${blog.title}</span><span class="delete" data-id=${blog.id}>delete</span></li>`);
        this.list.innerHTML = lis;
    }
}


const blogList = new BlogList();
