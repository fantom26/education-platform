import { REACT_APP_API_HOST, REACT_APP_API_VERSION } from "utils/constants";

export class AccessService {
  static getToken() {
    return fetch(`${REACT_APP_API_HOST}/${REACT_APP_API_VERSION}/auth/anonymous?platform=subscriptions`, { method: "GET" });
  }
}
