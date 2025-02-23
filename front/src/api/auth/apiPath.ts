import { ApiPath } from "../../utils/types/api.types";

export const SIGN_UP_API_PATH: ApiPath = {
  path: `${import.meta.env.VITE_BACKEND_URL}/account`,
};

export const SIGN_IN_API_PATH: ApiPath = {
  path: `${import.meta.env.VITE_BACKEND_URL}/token`,
};
