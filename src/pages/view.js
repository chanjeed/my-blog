import { getBlog, deleteBlog, updateBlog } from '../services/Firestore';
import firebase from 'firebase';
import '../services/Auth';

import './header.css';
import './body.css';
import './view.css';


var sanitizeHTML = function (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};



function renderPage(blogId) {
    const blogData = getBlog(blogId);
    // add data to page-content 
    blogData.then(function (data) {
        var blogTitle = document.querySelector('#blog-title');
        blogTitle.innerHTML = "<h1>" + sanitizeHTML(data.title) + "</h1>";
        var blogContent = document.querySelector('#blog-content');
        blogContent.innerHTML = data.content;
        var blogAuthor = document.querySelector('#blog-author');
        blogAuthor.innerHTML = "By :  @" + data.author;
        var blogUpdatedAt = document.querySelector('#blog-updatedAt');
        blogUpdatedAt.innerHTML = "Last updated : " + data.updatedAt.toDate().toISOString().slice(0, 10) + " " + data.updatedAt.toDate().getHours() + ":" + data.updatedAt.toDate().getMinutes() + ":" + data.updatedAt.toDate().getSeconds();
        let user = firebase.auth().currentUser;
        let current_username = user.displayName;
        if (current_username != data.author) {
            var editButton = document.querySelector('#edit-view-blog');
            editButton.style.display = "none";
            var deleteButton = document.querySelector('#delete-view-blog');
            deleteButton.style.display = "none";
        }
    });
}



//delete button
var deleteButton = document.querySelector("#delete-view-blog");
deleteButton.addEventListener('click', async function (e) {
    var r = confirm("Are you sure to delete this blog?");
    if (r == true) {
        const blogId = e.target.dataset.id;
        await deleteBlog(blogId);
        var url = 'index.html';
        window.location.href = url;
    }
});

//edit-finish button
var editButton = document.querySelector("#edit-view-blog");
editButton.addEventListener('click', async function (e) {
    var op = e.target.innerHTML;
    var blogTitle = document.querySelector('#blog-title');
    var blogContent = document.querySelector('#blog-content');

    //edit button
    if (op == "edit") {
        //make content editable
        blogTitle.setAttribute("contenteditable", "true");
        blogContent.setAttribute("contenteditable", "true");

        //change edit button to finish button
        e.target.innerHTML = "finish";
    }
    //finish button
    else if (op == "finish") {
        var r = confirm("Do you want to save this editing?");

        if (r == true) {

            // Update edited content

            const newData = {
                id: e.target.dataset.id,
                title: blogTitle.textContent,
                content: blogContent.innerHTML
            };

            // Update Database
            await updateBlog(newData);



        }



        renderPage(e.target.dataset.id,);



        // Make content uneditable
        blogTitle.setAttribute("contenteditable", "false");
        blogContent.setAttribute("contenteditable", "false");

        //change edit button to finish button
        e.target.innerHTML = "edit";
    }

});


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

// add blog id to edit button
var editButton = document.querySelector('#edit-view-blog');
editButton.setAttribute("data-id", blogId);





renderPage(blogId);