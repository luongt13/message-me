
import { useEffect, useState } from "react"
import { getUser } from "../../service/user.js"
import { useParams, useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import {createMessage} from "../../service/message"

export default function UserProfile(props) {
  let [user, setUser] = useState({})
  let { id } = useParams()
  let history = useHistory()
  let userLogged = props.userData
  useEffect(() => {
    getUserData();
  }, [id]);
  
  async function getUserData() {
    let data = await getUser(id)
    setUser(data)
  }

  async function handleClick(){
    let body = {
      sender: userLogged,
      receiver: id,
    }
    let created = await createMessage(body)
    history.push(`/details/${created[0]._id}`)
  }

  const renderEditButton = () => {
    if (userLogged === id) {
      return (
        <Link to={`/update-user/${id}`}>
          <div className="edit-profile"><img src="https://cdn0.iconfinder.com/data/icons/glyphpack/45/edit-alt-512.png" height={30} width={30} alt={"edit profile icon"} /></div>
        </Link>
      )
    } else {
      return (
        // <button onClick={handleClick}>Message</button>
        // <CreateMessage/>
        // <Link to={`/messages/${userLogged}`} onClick={handleClick}>
        // <Link to={`/messages/${userLogged}`} onClick={handleClick}>
        <>
        <img onClick={handleClick} src="http://cdn.onlinewebfonts.com/svg/img_125115.png" height={40} width={40} alt={"message icon"} />
        <h4>Message Me!</h4>
        {/* </Link> */}
        </>
      )
    }
  }
    return (
    <div>
      {/* <Link to={`/update-user/${id}`}>
        <div className="edit-profile"><img src="https://cdn0.iconfinder.com/data/icons/glyphpack/45/edit-alt-512.png" height={30} width={30} alt={"edit profile icon"} /></div>
      </Link> */}
        <div>
        <img src={user.imgURL} height={350} width={350} alt="profile pic" />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p><strong>Location: </strong>{user.location}</p>
        <p><strong>Job Title: </strong>{user.job}</p>
        <p><strong>Languages: </strong>{user.languages}</p>
        <a href={`${user.professionalLink}`}>
          <img src="https://image.flaticon.com/icons/png/512/61/61109.png" height={40} width={40} alt={"linkedin icon"} />
        </a>
      </div>
      
      <p><strong>About Me:</strong> {user.about}</p>
      
      {/* <Link to={`/messages/${userLogged}`}>
        <img src="http://cdn.onlinewebfonts.com/svg/img_125115.png" height={40} width={40} alt={"message icon"} />
        <h4>Message Me!</h4>
        </Link> */}
      {renderEditButton()}
    </div>
  )
}
