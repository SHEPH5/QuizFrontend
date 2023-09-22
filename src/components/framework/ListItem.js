import { Link } from "react-router-dom"

const ListItem = ({data}) =>{
    return(
        <Link to={`/quiz/r/${data.title}/`}>
            <div className="item-container">
                <h3>{data.title}</h3>
                

            </div>
        </Link>
    )
}

export default ListItem;