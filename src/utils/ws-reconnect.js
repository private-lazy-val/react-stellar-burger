import {setCookie} from "./cookies";
import {refreshToken} from "./user-api";

export const reconnectToWs = async (setter) => {
    try {
        const refreshData = await refreshToken(); // Try to refresh token
        if (refreshData.success) {
            setCookie("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken.replace('Bearer ', ''));
            setter(refreshData.accessToken.replace('Bearer ', '')); // Update state to trigger reconnection
        }
    } catch (error) {
        console.error('Failed to refresh token:', error);
    }
};