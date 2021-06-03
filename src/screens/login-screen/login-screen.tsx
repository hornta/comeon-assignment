import { ChangeEventHandler, FormEventHandler } from "react";
import { useDocumentTitle } from "../../shared/utils";
import { useAppDispatch, useAppSelector } from "../../store";
import { authenticate, editPassword, editUsername } from "./login-actions";

import "./login-screen.css";

export const LoginScreen = () => {
	const dispatch = useAppDispatch();

	const handleFormSubmission: FormEventHandler = (event) => {
		event.preventDefault();
		dispatch(authenticate());
	};

	const handleChangeUsername: ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		dispatch(editUsername(event.currentTarget.value));
	};

	const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		dispatch(editPassword(event.currentTarget.value));
	};

	const username = useAppSelector((state) => state.login.username);
	const password = useAppSelector((state) => state.login.password);
	const rejectedMessage = useAppSelector(
		(state) => state.login.rejectedMessage
	);

	useDocumentTitle("Login");

	return (
		<div className="ui grid centered login-screen">
			<form onSubmit={handleFormSubmission}>
				{rejectedMessage && (
					<div className="ui negative message">
						<p>{rejectedMessage}</p>
					</div>
				)}

				<div>
					<div className="ui input labeled">
						<label className="ui label" htmlFor="fieldUsername">
							Username
						</label>
						<input
							type="text"
							id="fieldUsername"
							required
							value={username}
							onChange={handleChangeUsername}
						/>
					</div>
				</div>
				<div>
					<div className="ui input labeled">
						<label className="ui label" htmlFor="fieldPassword">
							Password
						</label>
						<input
							type="password"
							id="fieldPassword"
							required
							value={password}
							onChange={handleChangePassword}
						/>
					</div>
				</div>
				<button type="submit" className="ui button">
					Login
				</button>
			</form>
		</div>
	);
};
