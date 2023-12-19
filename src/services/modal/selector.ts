import {RootState} from "../store";
import {ModalTypes} from "./modal-slice";

export const selectModalType = (state: RootState): ModalTypes | null => state.modal.modalType;