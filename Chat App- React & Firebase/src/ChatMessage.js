import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "./App.css";

function ChatMessage(props) {
	const auth = firebase.auth();
	const { text, uid, photoURL } = props.message;
	console.log(props.message);
	const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
	return (
		<div className={`message ${messageClass}`}>
			<img src={photoURL} alt="text" />
			<p>{text}</p>
		</div>
	);
}

export default ChatMessage;
