import actions from "../imports/Actions"
import service from "../imports/Services"
const sendResetLink=(data)=>async(dispatch)=>{
    try {
        await service.request.request.post("/user/resetPass",{email:data})
        await dispatch(actions.user.updateUser.action({sendRequest:false}))
    } catch (error) {
        dispatch(actions.error.setError.action(error.response.data))
        await dispatch(actions.user.updateUser.action({sendRequest:false}))

    }
}

export default sendResetLink