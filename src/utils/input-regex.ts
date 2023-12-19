export const NAME_REGEX: RegExp = /^[A-Za-z0-9\s'-]{2,30}$/;
export const PWD_REGEX: RegExp = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/;
export const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const TOKEN_REGEX: RegExp = /^[a-zA-Z0-9-]+$/;