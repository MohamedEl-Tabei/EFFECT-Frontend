const signup={
    type:"SIGNUP",
    action:(data)=>{
        return {data,type:"SIGNUP"}
    }
}

const updateUser={
    type:"UPDATEUSER",
    action:(data)=>{
        return{data,type:"UPDATEUSER"}
    }
}


const actions={
    signup,updateUser
}
export default actions