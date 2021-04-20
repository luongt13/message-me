import {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {getConversations} from "../../service/message"
import {useToggle} from "../../hooks/useToggle"
import MessageItem from "../Message/MessageItem.jsx"
import CreateMessage from "../CreateMessage/CreateMessage.jsx"
export default function MessageList() {
    const [conversations, setConversations] = useState()
    const [isToggled, toggle] = useToggle()
    let {id} = useParams()

    useEffect(() => {
        getUserCon()
    }, [])

    const getUserCon = async () => {
        const data = await getConversations(id)
        setConversations(data.conversations)
    }
    // sort the array by date????
    return (
        <div className="message-list">
            <h1>Messages</h1>
            <button onClick={toggle}>Start A Conversation</button>

        {isToggled ? <CreateMessage setToggle={toggle}/> : null}

            {conversations ? conversations.map(item => {
                return (
                    <div key={item._id} >
                    <Link to={`/details/${item._id}`}><MessageItem key={item._id}  conversation={item}/></Link>
                    </div>
                )
            }): <h1>No Conversations</h1>}
        </div>
    )
}