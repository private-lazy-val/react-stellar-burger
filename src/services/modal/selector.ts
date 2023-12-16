import {RootState} from "../store";

export const selectModalType = (state: RootState) => state.modal.modalType;