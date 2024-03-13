import actions from "../imports/Actions"
import service from "../imports/Services"
const getOnePageOfActivities=(data)=>async(dispatch)=>{
    try {
        let response=await service.request.request.post("activity/getonepageofactivities",{
            pageNumber:data.pageNumber
        },{headers:{
            "x-authToken":data.token
        }})
        dispatch(actions.dimension.setDimensions.action({
            numberOfPages:response.data.numberOfPages,
            items:response.data.pageOfActivities,pageNumber:data.pageNumber
            ,sendRequest:true
        }))
        
    } catch (error) {
        dispatch(actions.error.setError.action(error.response.data))
    }
}
export default getOnePageOfActivities