//Component in Chatpage
import { Fragment, useContext, useEffect } from 'react';
import React from 'react'
import {Container, Row, Col, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { addNotifications, resetNotifications } from '../features/userSlice';
import "./Sidebar.css";

function Sidebar() {
    const user = useSelector((state) => state.user);
    const {socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setCurrentRoom("general");
            getRooms();
            socket.emit("join-room", "general");
            socket.emit("new-user");
        }
    }, []);

    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert("Please login");
        }
        socket.emit("join-room", room, currentRoom);
        setCurrentRoom(room);

        if (isPublic) {
            setPrivateMemberMsg(null);
        }
        // dispatch for notifications
        dispatch(resetNotifications(room));
    }

    socket.off("notifications").on("notifications", (room) => {
        if (currentRoom != room) dispatch(addNotifications(room));
    });


    socket.off("new-user").on("new-user", (payload) => {
        console.log(payload); //This is what the socket sends back, aka. new user info.
        setMembers(payload);
    }); 
    //0:{_id: '64f152bbcd327febf27210f5', name: 'varun', email: 'ab@email.com', password: 'XXX', status: 'Online', …} This is how info is returned to us.

    function getRooms() {
        fetch("http://localhost:5001/rooms")
            .then((res) => res.json()).then((data) => setRooms(data));
    }

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + "-" + id2;
        } else {
            return id2 + "-" + id1;
        }
    }

    function handlePrivateMemberMsg(member) {
        setPrivateMemberMsg(member);
        const roomId = orderIds(user._id, member._id);
        joinRoom(roomId, false);
    }

    if(!user){
        return <></>;
    }
  return (
    <Fragment>
        <h2> Channels </h2>
        <ListGroup>
                {rooms.map((room, idx) => (
                    <ListGroup.Item key={idx} onClick={() => joinRoom(room)} active={room == currentRoom} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                        {room} {currentRoom !== room && <span>New</span>}
                    </ListGroup.Item>
                ))}
            </ListGroup>

        <h2>Coworkers/Employees</h2>
        <ListGroup>
        {members.map((member) => (
            <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} className="peopleclass" active={privateMemberMsg?._id == member?._id} onClick={() => handlePrivateMemberMsg(member)} disabled={member._id === user._id}>
                <Row className="row-user">
                    <Col xs={2} className="member-status">
                        <img src={member.picture} className="member-status-img" />
                    </Col>
                    <Col xs={9}>
                        {member.name}
                        {member._id === user?._id && " (You)"}
                        {member.status == "offline" && " (Offline)"}
                        {member.status == "online" ? <p>ONLINE</p> : <p>OFFLINE</p>}
                    </Col>
                </Row>
            </ListGroup.Item>
        ))}
        </ListGroup>
    </Fragment>
  )
}

export default Sidebar