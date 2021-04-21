import axios from "axios";
import { google } from "googleapis";
import {
	__google_client_id__,
	__google_client_secret__,
	__google_redirect_uri__,
} from "../constants";

const oAuthClient2 = () => {
	return new google.auth.OAuth2(
		__google_client_id__,
		__google_client_secret__,
		__google_redirect_uri__
	);
};

const oAuthClient = oAuthClient2();

const getAuthUrl = (): string => {
	return oAuthClient.generateAuthUrl({
		access_type: "offline",
		prompt: "consent",
		scope: ["profile", "email"],
	});
};

export const googleAuthUrl = getAuthUrl();

export const getGoogleProfile = async (code: string) => {
	const { tokens } = await oAuthClient.getToken(code);
	const googleUser = await axios.get(
		`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
		{
			headers: {
				Authorization: `Bearer ${tokens.id_token}`,
			},
		}
	);
	return { name: googleUser.data.name, email: googleUser.data.email };
};
