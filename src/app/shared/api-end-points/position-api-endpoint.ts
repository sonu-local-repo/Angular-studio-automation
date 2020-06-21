import { API_URL_DOMAIN } from '@shared/configs/globals';

export const PositionAPI = {
    createPositionUrl() {
        return `${API_URL_DOMAIN}/org/position/create`;
    },
    getPositionUrl(positionId: number) {
        return `${API_URL_DOMAIN}/org/position/id/${positionId}`;
    },
    getAllPositionsUrl() {
        return `${API_URL_DOMAIN}/org/position/all`;
    },
};
