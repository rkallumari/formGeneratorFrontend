import { notify } from "../components/notifications";
import { axiosInstance } from "../libraries/axiosInstance";

class API {
  makeAGetCall = function(url, callback) {
    axiosInstance
      .get(url)
      .then(function(response) {
        callback(response.data);
      })
      .catch(function(error) {
        notify(error);
      });
  };

  makeAPostCall = function(url, data, callback, options) {
    axiosInstance
      .post(url, data, options)
      .then(function(response) {
        callback(response);
      })
      .catch(function(error) {
        notify(error);
      });
  };
}

const instance = new API();
export default instance;
