import React, { ChangeEventHandler, FormEventHandler } from "react";
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
		<div className="login">
			<div className="ui grid centered">
				<form onSubmit={handleFormSubmission}>
					{rejectedMessage && (
						<div className="ui negative message">
							<p>{rejectedMessage}</p>
						</div>
					)}

					<div className="fields">
						<div className="required field">
							<div className="ui input labeled">
								<div className="ui label">Username</div>
								<input
									type="text"
									required
									value={username}
									onChange={handleChangeUsername}
								/>
							</div>
						</div>
						<div className="required field">
							<div className="ui input labeled">
								<div className="ui label">Password</div>
								<input
									type="password"
									required
									value={password}
									onChange={handleChangePassword}
								/>
							</div>
						</div>
						<div className="field">
							<div className="ui input">
								<button type="submit">Login</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
