import actions from "../imports/Actions"
import service from "../imports/Services"

const deleteWKupTime=(data)=>async(dispatch)=>{
    try {
        await service.request.request.post("/doneActivity/deleteWKupTime",{date:data.date},{headers:{
            "x-authToken":data.token
        }})
        await dispatch(actions.todayDoneActivity.deleteAllTodayDoneActivity.action({items:[]}))
        await dispatch(actions.user.updateUser.action({wkupTime:""}))
    } catch (error) {
        dispatch(actions.error.setError.action(error.response.data))
    }
}
export default deleteWKupTime