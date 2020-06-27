import { getBlog, getBlogs } from '../services/Firestore';

import './header.css';
import './body.css';
import './view.css';


var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {}, tmp;
for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split('=');
    data[tmp[0]] = tmp[1];
}
const blogId = data.blogId;
const blogData = getBlog(blogId);

blogData.then(function (data) {

    console.log(data)
    var blogTitle = document.querySelector('#blog-title');
    blogTitle.innerHTML = data.title;
    var blogContent = document.querySelector('#blog-content');
    blogContent.innerHTML = data.content;
});



