import react,{useEffect,useState} from "react";
import queryString from 'query-string';
import io from 'socket.io-client'

let socket;


function Chat(){
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(()=>{
        const {name,room} = queryString.parse(location.search)

        socket = io(ENDPOINT);

        setName(name);
        setName(room);

        socket.emit('join',{name,room},()=>{
        });

        return ()=>{
            socket.emit('disconnect');

            socket.off();
        }
    },[ENDPOINT,location.search]);
return <h1>Chat</h1>
}

export default Chat;