import axios from "axios";
let config={
    baseURL:"https://effect-backend-ntpm.onrender.com"
}
let verifyConfig={
    baseURL:"https://effect-verifyemail.onrender.com/verify"
}
let imgbbConfig={
    baseURL:"https://api.imgbb.com/1/upload?key=90559cb84b4690782428550a9d4e93f1"
}

const request=axios.create(config)
const verifyRequest=axios.create(verifyConfig)
const uploadImage=axios.create(imgbbConfig)

const requests={request,verifyRequest,uploadImage}
export default requests
