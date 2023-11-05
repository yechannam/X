import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.ts";
import { FirebaseError } from "firebase/app";
import { Input, Switcher, Title, Wrapper, Error, Form } from "../components/auth-component.ts";
import GithubButton from "../components/github-btn.tsx";

export default function CreateAccount() {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(""); 

	const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		if (isLoading || name === "" || email === "" || password === "")
			return ;
		try{
			setLoading(true);
			const credentials = await createUserWithEmailAndPassword(auth, email, password);
			console.log(credentials.user);
			await updateProfile(credentials.user, {
				displayName: name,
			});
			navigate("/");
		} catch(e) {
			if (e instanceof FirebaseError){
				setError(e.message);
			}
		} finally {
			setLoading(false);
		}
	};
	

	const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
		const {target: {name, value} }  = e;
		if (name === "name"){
			setName(value)
		}else if (name === "password"){
			setPassword(value)
		}else if (name === "email"){
			setEmail(value)
		}
	};
	return (<Wrapper>
		<Title>Join X</Title>
		<Form onSubmit={onSubmit}>
			<Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required/>
			<Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
			<Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
			<Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
		</Form>
		{error !== "" ? <Error>{error}</Error> : null}

		<Switcher>
			Already have an account? {""}
			<Link to="/login">login &rarr; </ Link>
		</Switcher>
		
		<GithubButton />
	</Wrapper>);

}