import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import Components from "../imports/components";
import { useState } from "react";
const CardGoal = (props) => {
  let [showDelete, setShowDelete] = useState(false);
  return (
    <div
      className="d-flex jcc aic rounded-4  bg-goal bg-paper-card"
      style={{ width: "max-content", height: "max-content", padding: 0 }}
    >
      <div
        className="rounded-4 d-flex flex-column aic jcc p-2  relative "
        style={{ width: 250, height: 170 }}
      >
        <div
          className="mb-3  text-light w-100 p-2 rounded-3  text-center  "
          style={{ backgroundColor: "#212529a3" }}
        >
          {props.name.length > 20
            ? `${props.name.slice(0, 20)}...`
            : props.name}
        </div>
        <Table>
          <tbody>
            <tr>
              <td className="bg-none  border-0">Expected Date:</td>
              <td className="bg-none border-0">{props.expectedDate}</td>
            </tr>
            <tr>
              <td className="bg-none  border-0">Real Date:</td>
              <td className="bg-none  border-0">{props.achievedDate}</td>
            </tr>
          </tbody>
        </Table>
        <div
          className="absolute bg-delete-goal text-light  rounded-4  "
          onClick={() => setShowDelete(true)}
        >
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </div>
      </div>
      <Components.DeleteItemFromDimentions
        name={props.name}
        id={props.id}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
      />
    </div>
  );
};
export default CardGoal;
