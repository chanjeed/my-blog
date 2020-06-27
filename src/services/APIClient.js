class APIClient {
    constructor() {
        this.blogs = [
            'DOM is so fun',
            'Javascript Rocks',
            "You Don't Know JS",
            'Why is JS so weird',
        ];
    }

    getBlogs() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.blogs);
            }, 1000);
        });
    }

    createBlog(title, content) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.blogs.push(title);
                resolve();
            }, 1000);
        });
    }

    deleteBlog(blog) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.blogs = this.blogs.filter((value) => value != blog);
                resolve();
            }, 1000);
        });
    }
}

export default APIClient;
