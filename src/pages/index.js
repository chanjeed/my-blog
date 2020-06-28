import { getBlogs, deleteBlog } from '../services/Firestore';

import './header.css';
import './body.css';
import './index.css';


class BlogList {
    constructor() {
        this.list = document.querySelector('#blog-list ul');
        this.searchBar = document.forms['search-blogs'].querySelector('input');
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        this.list.addEventListener('click', this.onDeleteButtonClick.bind(this));
        this.list.addEventListener('click', this.viewClick.bind(this));
        this.searchBar.addEventListener('keyup', this.onSearchBarChange.bind(this));
    }


    async onDeleteButtonClick(e) {
        if (e.target.className == 'delete') {
            var r = confirm("Are you sure to delete this blog?");
            if (r == true) {
                const blogId = e.target.dataset.id;
                // console.log(e.target.dataset)
                await deleteBlog(blogId);
                this.render();
            }
        }
    }

    async viewClick(e) {
        const className = e.target.className;
        if (className == 'blog' || className == 'name' || className == 'date') {
            const blogId = e.target.dataset.id;
            //console.log(e.target.dataset.id);
            //const blog = await getBlog(blogId);
            var url = 'view.html?blogId=' + encodeURIComponent(blogId);
            window.location.href = url;
        }
    }

    onSearchBarChange(e) {
        const term = e.target.value.toLowerCase();
        const blogs = this.list.getElementsByTagName('li');
        Array.from(blogs).forEach((blog) => {
            const title = blog.firstElementChild.textContent;
            if (title.toLowerCase().indexOf(term) != -1) {
                blog.style.display = 'block';
            } else {
                blog.style.display = 'none';
            }
        });
    }

    async render() {
        const blogs = await getBlogs();
        let lis = '';
        blogs.forEach((blog) => lis += `<li data-id=` + sanitizeHTML(blog.id) + ` class="blog" ><span class="name" data-id=` + sanitizeHTML(blog.id) + `>` + sanitizeHTML(blog.title) + `</span><span class="delete" data-id=` + sanitizeHTML(blog.id) + `>delete</span><span class="date" data-id=` + sanitizeHTML(blog.id) + `>` + `Created at: ` + blog.createdAt + `</span></li>`);
        this.list.innerHTML = lis;
    }
}


const blogList = new BlogList();

var sanitizeHTML = function (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};