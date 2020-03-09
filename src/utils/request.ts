import Taro from "@tarojs/taro";

const HOST = "http://murrayee.com";

type Methods = "POST" | "GET" | "OPTIONS" | "PUT" | "DELETE";

type Headers = { [key: string]: string };
type Datas = { method: Methods; [key: string]: any };

interface Options {
  method?: Methods;
  data?: Datas;
  header?: Headers;
}

const codeMessage = {
  401: "用户没有权限（令牌、用户名、密码错误）。"
};

const checkStatus = response => {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }
  const errortext = codeMessage[response.statusCode] || response.statusText;
  const error = new Error(errortext) as any;
  error.name = response.statusCode;
  error.response = response;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function fetch(url: string, options?: Options) {
  const defaultOptions = {
    method: "GET"
  };
  const newOptions = { ...defaultOptions, ...options } as Options;

  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    newOptions.header = {
      Accept: "application/json",
      ...newOptions.header
    };
  }
  return Taro.request({
    url: `${HOST}${url}`,
    ...newOptions
  })
    .then(checkStatus)
    .then(response => {
      // TODO
      return response;
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        return;
      }
      if (status === 403) {
        return;
      }
      if (status <= 504 && status >= 500) {
        return;
      }
      if (status >= 404 && status < 422) {
      }
    });
}
