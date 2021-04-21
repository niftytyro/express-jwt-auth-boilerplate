// Validation Helpers
export const validateEmail = (email: string) => {
	if (
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			email
		)
	) {
		return true;
	}
	return false;
};

export const validateMobileNumber = (mobileNumber: string) => {
	if (/^[0-9][0-9]{8}[0-9]$/.test(mobileNumber)) {
		return true;
	}
	return false;
};

export const validateName = (name: string) => {
	if (/^[a-zA-Z][a-zA-z ]*[a-zA-z]$/.test(name)) {
		return true;
	}
	return false;
};

export const validatePassword = (password: string) => {
	if (
		/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,16}$/.test(password)
	) {
		return true;
	}
	return false;
};

// JWT Utilities
export interface UserPayload {
	id: number;
}

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload;
		}
	}
}
