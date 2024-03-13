import { useState } from "react";
import Components from "../imports/components";
import { useSelector } from "react-redux";
import Selectors from "../imports/selectors";
const Profile = () => {
  let [showEdit, setShowEdit] = useState(false);
  let user=useSelector(s=>Selectors.user(s))
  return (
    <div>
      <Components.NavBarMain />
      {showEdit ? <Components.ProfileEdit setShowEdit={setShowEdit} /> : <Components.ProfileShow setShowEdit={setShowEdit}  />}
      <Components.ForgotPassword showForgotPass={user.token===""} />

    </div>
  );
};

export default Profile;
