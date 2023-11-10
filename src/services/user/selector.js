export const selectUser = (state) => state.user.user;
export const selectAuthStatus = (state) => state.user.isAuthChecked;
export const selectUserIsLoading = (state) => state.user.isLoading;
export const selectErrMsg = (state) => state.user.errMsg;