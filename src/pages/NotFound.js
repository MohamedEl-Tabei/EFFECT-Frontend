import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const NotFound=()=>{
    return(
        <div className="d-flex flex-column jcc aic">
            <div className="bg-notFound"/>
            <Link className=" text-light" to={"/"}>
                <Button
                  variant="outline-dark text-light mb-3 btn-m border-0 "
                  size="lg"
                  style={{width:"250px"}}
                >
                  Home
                </Button>
              </Link>
        </div>

        )
}
export default NotFound