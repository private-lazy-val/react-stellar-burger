export const selectUser = (state) => state.user.user;
export const selectAuthStatus = (state) => state.user.isAuthChecked;
export const selectErrMsg = (state) => state.user.errMsg;
export const selectIsLoadingUser = (state) => state.user.isLoading;
export const selectHasErrorUser = (state) => state.user.hasError;
