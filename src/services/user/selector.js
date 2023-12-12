export const selectUser = (state) => state.user.user;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectAuthStatus = (state) => state.user.isAuthChecked;
export const selectAuthCheckLoading = (state) => state.user.authCheckLoading;
export const selectUserIsLoading = (state) => state.user.isLoading;
export const selectErrMsg = (state) => state.user.errMsg;