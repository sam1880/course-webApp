import { selector } from "recoil";
import { userState } from "../atoms/user";

export const isUserLoadingState = selector({
    key: "UserLoadingState",
    get: ({get}) =>{
        const state = get(userState);

        return state.isLoading
    }
})