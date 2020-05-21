// Get csrf token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const app = new Vue({
    delimiters: ['[[', ']]'], // To avoid clashing with django {{ }}
    el: '#simpleBlog',
    data: {
        likes:blog_likes  // defined in blog.html
    },
    methods: {
        likeBlog(blog_id) {
            const vm = this;
            const data = {
                blog_id: blog_id
            };

            // Set CSRF cookie name
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = "X-CSRFToken";

            // Axios post
            axios.post('blog/like/', data, {
                headers: {
                    "csrftoken": getCookie('csrftoken'),
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    vm.likes = response.data.likes  // use likes from backend
                })
                .catch((error) => {
                    window.console.log('error')
                });
        }

    }
});
