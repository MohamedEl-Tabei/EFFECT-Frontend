import requests from "../api"
import action from "../imports/Actions"
const signup=(data)=>async(dispatch)=>{
    try {
       const response=await requests.request.post("/user/signup",data)
       let token=await response.headers["x-authtoken"]
       document.cookie=`eff=${await token};expires=${Date().replace(new Date().getFullYear(),new Date().getFullYear()+10)}`
       dispatch(action.error.setError.action("")) 
       data.password=await undefined      
      await dispatch(action.user.signup.action({...data,...response.data,isAuth:true,token:token}))
      
      } catch (error) {
      dispatch(action.error.setError.action(error.response.data))        
    }
}

export default signup