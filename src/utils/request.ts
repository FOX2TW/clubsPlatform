import Taro from "@tarojs/taro";

const HOST = "http://localhost:8080";

type Methods = "POST" | "GET" | "OPTIONS" | "PUT" | "DELETE";

type Headers = { [key: string]: string };
type Datas = { method: Methods; [key: string]: any };

interface Options {
  url: string;
  method?: Methods;
  data?: Datas;
  header?: Headers;
}

export default function fetch(options: Options) {
  const { url, method = "GET", data, header = {} } = options;

  if (method === "POST") {
    header["content-type"] = "application/json";
  }

  return Taro.request({
    url: `${HOST}${url}`,
    method,
    data,
    header
  })
    .then(res => {
      //TODO
      Promise.resolve(res);
    })
    .catch(err => {
      //TODO
      Promise.reject(err);
    });
}
