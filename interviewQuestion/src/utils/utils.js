export function get(object, path, defaultVal = 'undefined') {
  // 先将path处理成统一格式
  let newPath = [];
  if (Array.isArray(path)) {
    newPath = path;
  } else {
    // 先将字符串中的'['、']'去除替换为'.'，split分割成数组形式
    newPath = path
      .replace(/\[/g, '.')
      .replace(/\]/g, '')
      .split('.');
  }

  // 递归处理，返回最后结果
  return (
    newPath.reduce((o, k) => {
      return (o || {})[k];
    }, object) || defaultVal
  );
}

export function getUser() {
  const jwt_token = localStorage.getItem('jwt_token');
  return jwt_token;
}
