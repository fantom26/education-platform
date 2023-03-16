import { REACT_APP_API_HOST, REACT_APP_API_VERSION } from "utils/constants";

export class CourseService {
  static getCourseInfo(id: string) {
    const token = localStorage.getItem("token");
    let config = {};

    if (token) {
      config = {
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      };
    }

    return fetch(`${REACT_APP_API_HOST}/${REACT_APP_API_VERSION}/core/preview-courses/${id}`, {
      method: "GET",
      headers: config
    });
  }
}
