import requests from "../api";
import actions from "../imports/Actions";
const addNewActivity=(data)=>async(dispatch)=>{
    try {
        await requests.request.post("/activity/addnewactivity",{name:data.name,color:data.color},{
            headers:{
                "x-authToken":data.token
            }
        })
        await dispatch(actions.unhiddenActivitiesNames.addNewUnhiddenActivity.action(data.name))
    } catch (error) {
        dispatch(actions.error.setError.action(error.response.data))
    }
}
export default addNewActivity