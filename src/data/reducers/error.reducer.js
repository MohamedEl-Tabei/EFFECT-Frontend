import actions from "../../imports/Actions"
const initialState=""
const errorReducer=(state=initialState,action)=>{
    let {data,type}=action
    if(type===actions.error.setError.type)
    {
        return data
    }
    return state
}
export default errorReducer