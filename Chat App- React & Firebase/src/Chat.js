import React, { useState, useRef } from "react";
import firebase from "firebase/app";
import { SignIn } from "./Auth";
import ChatMessage from "./ChatMessage";
import "firebase/firestore";
import "firebase/auth";
import "./App.css";

//Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

//Firebase Initialization
firebase.initializeApp({
	apiKey: "AIzaSyCzkt6cibWScqe1IzeVQFgfPPKoRFjobzo",
	authDomain: "superchat-92ef4.firebaseapp.com",
	databaseURL: "https://superchat-92ef4.firebaseio.com",
	projectId: "superchat-92ef4",
	storageBucket: "superchat-92ef4.appspot.com",
	messagingSenderId: "389787520692",
	appId: "1:389787520692:web:4b7657a169ea847760d1e1",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const Chat = () => {
	const [user] = useAuthState(auth);

	return <div className="section">{user ? <ChatRoom /> : <SignIn />}</div>;
};

const ChatRoom = () => {
	const dummy = useRef();
	// getting the message collection from the firestore database
	const messageRef = firestore.collection("messages");
	// quering the date we need
	const query = messageRef.orderBy("createdAt").limit(25);
	//using use collection data hook to get array of the data in the messages collection
	const [messages] = useCollectionData(query, { idField: "id" });
	console.log(auth.currentUser.uid);
	//defining the form state
	const [formValue, setFormValue] = useState("");
	// submit message to firestore database
	const sendMessage = async (e) => {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;
		// creates new document in the database
		await messageRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
		});
		setFormValue("");
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			<div className="navbar">
				<h2>Chatterr</h2>
				<div>
					{auth.currentUser && (
						<button onClick={() => auth.signOut()}>Sign Out</button>
					)}
				</div>
			</div>
			<main>
				{messages &&
					messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
				<span ref={dummy}></span>
			</main>
			<form onSubmit={sendMessage}>
				<input
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
					type="text"
				/>
				<button type="submit">Send ⬆</button>
			</form>
		</>
	);
};

export default Chat;
