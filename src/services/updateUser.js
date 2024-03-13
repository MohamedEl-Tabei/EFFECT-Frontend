import actions from "../imports/Actions";
import service from "../imports/Services";
const updateUser = (data) => async (dispatch) => {
  try {
    let pic=data.profilePicture
    if(await typeof(data.imageForm)==="object")
    {
      let d=new FormData()
      d.append("image",data.imageForm)
      let imgbb=await service.request.uploadImage.post("",d)
      pic=await imgbb.data.data.display_url
      console.log(await pic)

    }
    await service.request.request.put(
      "/user/updateUser",
      { name: data.name, email: data.email, birthday: data.birthday,password:data.password,profilePicture:pic },
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    await dispatch(actions.user.updateUser.action({...data,profilePicture:pic,sendRequest:false}));
  } catch (error) {
     dispatch(actions.user.updateUser.action({sendRequest:false}));
    dispatch(actions.error.setError.action(error.response.data));
  }
};

export default updateUser;
