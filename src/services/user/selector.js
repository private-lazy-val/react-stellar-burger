export const selectUser = (state) => state.user.user;
export const selectAuthStatus = (state) => state.user.isAuthChecked;
export const selectErrMsg = (state) => state.user.errMsg;