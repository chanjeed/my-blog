import { getBlogs, deleteBlog } from '../services/Firestore';
import firebase from 'firebase'
import '../services/Auth';


import './header.css';
import './body.css';
import './index.css';


class BlogList {
    constructor() {
        this.sortby = "createdAt";
        this.onlyme = false;
        this.list = document.querySelector('#blog-list ul');
        this.searchBar = document.forms['search-blogs'].querySelector('input');
        this.onlymeBox = document.querySelector('#checkbox-onlyme');
        this.sortSelect = document.querySelector("#sort");
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        this.list.addEventListener('click', this.onDeleteButtonClick.bind(this));
        this.list.addEventListener('click', this.viewClick.bind(this));
        this.searchBar.addEventListener('keyup', this.onSearchBarChange.bind(this));
        this.onlymeBox.addEventListener('change', this.onOnlymeBoxChange.bind(this));
        this.sortSelect.addEventListener('change', this.onSortSelectChange.bind(this));
    }


    async onDeleteButtonClick(e) {
        if (e.target.className == 'delete') {
            var r = confirm("Are you sure to delete this blog?");
            if (r == true) {
                const blogId = e.target.parentElement.dataset.id;
                await deleteBlog(blogId);
                this.render();
            }
        }
    }

    async viewClick(e) {
        const className = e.target.className;
        var blogId;
        if (className == 'blog') {
            var blogId = e.target.dataset.id;
            var url = 'view.html?blogId=' + encodeURIComponent(blogId);
            window.location.href = url;
        }
        else if (className == 'name' || className == 'date') {

            blogId = e.target.parentElement.dataset.id;
            var url = 'view.html?blogId=' + encodeURIComponent(blogId);
            window.location.href = url;
        }

    }

    onOnlymeBoxChange(e) {
        if (this.onlymeBox.checked) {
            this.onlyme = true;
        } else {
            this.onlyme = false;
        }
        this.render();
    }

    onSortSelectChange(e) {
        this.sortby = this.sortSelect.value;
        this.render();
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

        const blogs = await getBlogs(this.sortby);
        let user = firebase.auth().currentUser;
        let current_username = user.displayName;;
        let lis = '';
        let onlyme = this.onlyme;
        blogs.forEach(function (blog) {
            if (blog.author == current_username) {
                lis += `<li data-id=` + sanitizeHTML(blog.id) + ` class="blog" ><span class="name" >` + sanitizeHTML(blog.title) + `</span><span class="delete" >delete</span><span class="date" > Created at: ` + blog.createdAt + `</span><br><br><span class="author" >By: @` + blog.author + `</span></li>`;
            }
            else if (!onlyme) {
                lis += `<li data-id=` + sanitizeHTML(blog.id) + ` class="blog" ><span class="name" >` + sanitizeHTML(blog.title) + `</span><span class="delete" style="visibility: hidden" >delete</span><span class="date" > Created at: ` + blog.createdAt + `</span><br><br><span class="author" > By: @` + blog.author + `</span></li>`;
            }

        });
        this.list.innerHTML = lis;

    }
}


const blogList = new BlogList();

var sanitizeHTML = function (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};


