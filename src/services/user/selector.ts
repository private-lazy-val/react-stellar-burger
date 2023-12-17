import {RootState} from "../store";

export const selectUser = (state: RootState) => state.user.user;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectAuthStatus = (state: RootState) => state.user.isAuthChecked;
export const selectAuthCheckLoading = (state: RootState) => state.user.authCheckLoading;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
export const selectErrMsg = (state: RootState) => state.user.errMsg;