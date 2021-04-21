import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {deleteMessage, getMessages} from "../../service/message"
import SendMessage from "../SendMessage/SendMessage.jsx"
import "./MessageDetails.css"
import {useToggle} from "../../hooks/useToggle"

export default function MessageDetails(props) {
    console.log(props.userData)
    const [isToggled, toggle] = useToggle(false)
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState()
    const [displayName, setDisplayName] = useState()
    let {id} = useParams()
console.log(users)
    useEffect(() => {
        getData()
    }, [isToggled])

    const getData = async () => {
        const data = await getMessages(id)
        setMessages(data.messages)
        setUsers(data.users)
    }

    let receiveName = []
    if(users) {
        users.forEach((item) => {
            if(item._id !== props.userData) {
                receiveName.push(item.name)
            }
        })
    }
    console.log(receiveName)
    if (receiveName.length === 1 ) {
        setDisplayName(receiveName.toString())
    }
    // console.log(receiveName)
    async function handleDelete(item) {
        let message = item._id
        deleteMessage(message)
        getData()
    }
//sort messages>
//if sender is from user logged in then make it different somehow
    return (
        <div className="message-page">
            <h1>{displayName}</h1>
            <div className="messages">
            {messages.map(item => {
                if (item.sender._id === props.userData) {
                    return (
                        <div className="message-detail user" key={item._id}>
                        <p>{item.content}</p>
                        <h5>{item.sender.name}</h5>
                        <button onClick={() => handleDelete(item)}>Delete Message</button>

                        </div>
                    )
                } else {
                    return (
                        <div className="message-detail other-user" key={item._id}>
                        <p>{item.content}</p>
                        <h5>{item.sender.name}</h5>
                        </div>
                    )
                }
            })}
        </div>
        <div className="send-bar">
            <SendMessage users={users} setToggle={toggle} userData={props.userData}/>
            </div>
        </div>
    )
}