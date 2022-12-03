import axios from "axios"


export let endpoints = {

    "register": "/api/register/",

    "current-user": "/api/current-user/",
    "login": "/api/login/",
    "category": "/api/categories/",
    "post": "/api/posts/",
    "my-post": "/api/posts/my-post/",
    "post-detail": (postId) => `api/posts/detail/${postId}/`,
    "like": (postId) => `api/posts/${postId}/like`,



}
export const authApi = () => {
    return axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    })
}


export default axios.create({
    baseURL: "http://127.0.0.1:8000/"

})