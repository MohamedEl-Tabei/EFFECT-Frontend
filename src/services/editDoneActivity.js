import actions from "../imports/Actions"
import service from "../imports/Services"


const editDoneActivity=(data)=>async(dispatch)=>{
    try {
        await service.request.request.put("/doneActivity/editDoneActivity",{activity:data.activity},{
            headers:{
                "x-authToken":data.token
            }
        })
        await dispatch(actions.todayDoneActivity.editDoneActivity.action(data.activity))
        
        if(data.activity.activityName==="Sleep")await dispatch(actions.user.updateUser.action({sleepTime:data.activity.startTime}))

    } catch (error) {
        dispatch(actions.error.setError.action(error.response.data))
    }
}
export default editDoneActivity