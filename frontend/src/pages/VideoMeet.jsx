import React, { useEffect } from 'react'
import '../Styles/VideoMeet.css'
import { useState } from 'react';
import { useRef } from 'react';
import TextField from '@mui/material/TextField'
import Button  from '@mui/material/Button'



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

    const getPermissions = async() => {
      try {
        const videoPermission = await navigator.mediaDevices.getUserMedia({video:true});
        if(videoPermission){
          setVideoAvailable(true);
        }else{
          setVideoAvailable(false);
        }

         const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true});
        if(audioPermission){
          setAudioAvailable(true);
        }else{
          setAudioAvailable(false);
        }

        if(navigator.mediaDevices.getDisplayMedia){
          setScreenAvailable(true);
        }else{
          setScreenAvailable(false)
        }

        if(videoAvailable || audioAvailable){
          const userMediaStream = await navigator.mediaDevices.getUserMedia({video:videoAvailable, audio:audioAvailable});
          if(userMediaStream){
            window.localStream = userMediaStream;
            if(localVideoRef.current){
              localVideoRef.current.srcObject = userMediaStream;
            }
          }
        }

      } catch (error) {
        console.log(error)
      }
    };


    //backend feature

    const getUserMediaSuccess = () => {}

    let getUserMedia = () => {
      if(video && videoAvailable || audio && audioAvailable){
        navigator.mediaDevices.getUserMedia({video:video, audio:audio})
        .then(getUserMediaSuccess)
        .then((stream) => {})
        .catch(err=>console.log(err));
      }else{
         try {
          let tracks = localVideoRef.current.srcObject.getTracks();
          tracks.array.forEach(track => track.stop());
        } catch (error) {
          console.log(error)
        }
      };
    }

    useEffect(()=>{
      getPermissions();
    },[]);

    useEffect(() => {
      if(video != undefined && audio != undefined){
        getUserMedia();
      }
    },[audio,video]);

    const connectToSocketServer = () => {
      socketRef.current = io.connect(server_url,{secure:false});
      socketRef.current.on('signal', gotMessageFromServer);
      socketRef.current.on("connect", () => {
        socketRef.current.emit("join-call", window.location.href);
        socketRef.current = socketRef.current.id;
        socketRef.current.on("chat-message", addMessage);

        socketRef.current.on("user-left",(id) =>{
          //TODO
        })
      })
    }

    let getMedia = () => {
      setVideo(videoAvailable);
      setAudio(audioAvailable);
      connectToSocketServer();
    }

  return (
    <>
     {askForUsername===true ?
        <div>
          <h1>Enter into lobby</h1> <br /> 
            <TextField id="outlined-basic" label="Username" name="username" value ={username} onChange={(e)=> setUsername(e.target.value)} variant="outlined"  />
            <Button variant="contained" >connect</Button>


            <div>
              <video ref={localVideoRef} autoPlay muted></video>
            </div>
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