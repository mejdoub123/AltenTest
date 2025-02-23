import { HttpMethods } from "../../utils/enums/api.enums";
import fetchData, { FetchResponse } from "../../utils/helpers/api.helper";
import { SignInRequest, SignInResponse, SignUpRequest, User } from "../../utils/types/api.types";
import { SIGN_IN_API_PATH, SIGN_UP_API_PATH } from "./apiPath";


export const signUp = (data:SignUpRequest): Promise<FetchResponse<User>> => {
    const headers = new Headers({});
    headers.set("Content-Type", "application/json");
    return fetchData<User>(SIGN_UP_API_PATH.path, {body:JSON.stringify(data), headers, method: HttpMethods.POST } );
};
export const signIn = (data:SignInRequest): Promise<FetchResponse<SignInResponse>> => {
    const headers = new Headers({});
    headers.set("Content-Type", "application/json");
    return fetchData<SignInResponse>(SIGN_IN_API_PATH.path, {body:JSON.stringify(data), headers, method: HttpMethods.POST });
};