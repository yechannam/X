import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import styled from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"

const Button = styled.span`
	margin-top: 40px;
	background-color: #ffffff;
	color: black;
	width: 100%;
	font-weight: 500;
	padding: 10px 20px;
	border-radius: 50px;
	border: 0;
	display: flex;
	gap: 10px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`

const Logo = styled.img`
	height: 25px;
`

export default function GithubButton() {
	const navigate = useNavigate();
	const onClick = async () => {
		try {
			const provieder = new GithubAuthProvider;
			await signInWithPopup(auth, provieder);
			navigate("/");
		} catch (e) {
			if (e instanceof FirebaseError){
				// setError(e.message);
			}
		}
		
	}
	
	return <Button onClick={onClick}>
		<Logo src="/github-logo.svg" />
		Continue with Github
	</Button>
}