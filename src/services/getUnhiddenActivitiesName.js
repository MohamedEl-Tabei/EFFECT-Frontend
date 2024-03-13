import actions from "../imports/Actions"
import service from "../imports/Services"
const getUnhiddenActivitiesName=(data)=>async(dispatch)=>{
    try {
        let response=await service.request.request.get("/activity/getUnhiddenActivitiesName",{
            headers:{
                "x-authToken":data.token
            }
        })

        await dispatch(actions.unhiddenActivitiesNames.getUnhiddenActivitiesName.action({names:response.data.names}))
    } catch (error) {
        dispatch(actions.error.setError.action(error.response.data))
    }
}
export default getUnhiddenActivitiesName