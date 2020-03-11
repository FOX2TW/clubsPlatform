export const getWeek = () => {
  const weeks = new Array(
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  );
  return weeks[new Date().getDay()];
};

export function convPath(path) {
  if (!Array.isArray(path)) {
    return path.split(/[.\[\]]/).filter(v => v);
  }
  return path;
}

export function get(obj, path, dft) {
  let arrPath = convPath(String(path));
  return (
    arrPath.reduce((acc, cur) => {
      return (acc || {})[cur];
    }, obj) || dft
  );
}
