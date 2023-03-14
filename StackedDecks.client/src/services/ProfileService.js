import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"

class ProfileService {
    async getUserProfile(creatorId) {
        const res = await api.get('api/profiles/' + creatorId)
        logger.log('getting this profile', res.data)

        AppState.profile = res.data
    }
}
export const profileService = new ProfileService()