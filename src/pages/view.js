import { getBlog, deleteBlog } from '../services/Firestore';

import './header.css';
import './body.css';
import './view.css';


var sanitizeHTML = function (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};


var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {}, tmp;
for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split('=');
    data[tmp[0]] = tmp[1];
}
const blogId = data.blogId;

// add blog id to delete button
var deleteButton = document.querySelector('#delete-view-blog');
deleteButton.setAttribute("data-id", blogId);

const blogData = getBlog(blogId);

// add data to page-content 
blogData.then(function (data) {
    var blogTitle = document.querySelector('#blog-title');
    blogTitle.innerHTML = "<h1>" + sanitizeHTML(data.title) + "</h1>";
    var blogContent = document.querySelector('#blog-content');
    blogContent.innerHTML = data.content;
});


//delete button

var deleteButton = document.querySelector("#delete-view-blog");
deleteButton.addEventListener('click', async function (e) {
    const blogId = e.target.dataset.id;
    await deleteBlog(blogId);
    var url = 'index.html';
    window.location.href = url;
});