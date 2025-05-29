import React from 'react'
import '../Styles/VideoMeet.css'
import { useState } from 'react';
import { useRef } from 'react';


const server_url = "http://localhost:4000/user";

var connection = {};

const peerConfigConnection = {
    "iceServers" : [
        {"url" : "stun:stun.l.google.com:19302"}
    ]
}

const VideoMeet = () => {

    var socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoRef = useRef();

    let [videoAvailable, setVideoAvailable]  = useState(true);
    let [audioAvailable, setAudioAvailable]  = useState(true);
    let [video, setVideo]  = useState();
    let [audio, setAudio]  = useState();
    let [screen, setScreen]  = useState();
    let [showModel, setShowModel]  = useState();
    let [screenAvailable, setScreenAvailable]  = useState();
    let [messages, setMessages]  = useState([]);
    let [message, setMessage]  = useState("");
    let [newMessage, setNewMessage]  = useState("");
    let [askForUsername, setAskForUsername]  = useState(true);
    let [username, setUsername]  = useState("");
    let [videos, setVideos] = useState([]);

    let videoRef = useRef([]);

    // TODO
    // if(isChrome === false){

    // }

  return (
    <>
     {askForUsername===true ?
        <div>
            
        </div> : <></>
    }

    </>
  )
}

export default VideoMeet

/*

 STUN servers are lightweight servers running the public
 internet which return the IP address of the requester's
  device

*/