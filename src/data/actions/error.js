const setError={
    type:"SETERROR",
    action:(data)=>{
        return {data,type:"SETERROR"}
    }
}
const  actions={setError}

export default actions