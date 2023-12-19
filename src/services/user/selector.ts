import {RootState} from "../store";

export const selectUser = (state: RootState): User | null => state.user.user;
export const selectAccessToken = (state: RootState): string | null => state.user.accessToken;
export const selectAuthStatus = (state: RootState): boolean => state.user.isAuthChecked;
export const selectAuthCheckLoading = (state: RootState): boolean => state.user.authCheckLoading;
export const selectUserIsLoading = (state: RootState): boolean => state.user.isLoading;
export const selectErrMsg = (state: RootState): string | null => state.user.errMsg;