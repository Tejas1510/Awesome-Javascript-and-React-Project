import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

function SignIn() {
	const auth = firebase.auth();
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};
	return (
		<div>
			<h2>Chatterr</h2>
			<h3>Let's start chatting with random people and make friends</h3>
			<button onClick={signInWithGoogle}>Sign in with google</button>
		</div>
	);
}

export { SignIn };
