export const SET_PLATFORM = 'SET_PLATFORM';

import {cookie} from 'utils';

export const setPlatform = (payload) => {
	cookie.setItem("thirdTakeoutPlatform", payload.platform);
    return { type: SET_PLATFORM, payload }
}
