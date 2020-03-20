import request from './request';

const Gateway = {};
/**
 * @param URL
 * @param input 同fetch-api
 * @param silence 是否静默错误！ true:则业务代码处理错误提示
 */
Gateway.execute = (path, input = {}) => {
  const headers = {
    //  Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  return request(path, { ...input, headers }).then(data =>
     data,
  );
};
Gateway.get = (path, params = {}, silence = false) => Gateway.execute(path, { params }, silence);
Gateway.post = (path, data = {}, silence = false) =>
  Gateway.execute(path, { method: 'post', data }, silence);
Gateway.put = (path, params = {}, silence = false) =>
  Gateway.execute(path, { method: 'put', params }, silence);
Gateway.del = (path, data = {}, silence = false) =>
  Gateway.execute(path, { method: 'delete', data }, silence);
Gateway.down = (path, params = {}, silence = true) =>
  Gateway.execute(path, { responseType: 'blob', params }, silence);
Gateway.login = (path, input = {}) =>
  request(path, { method: 'post', ...input }).then(data =>
    data,
  );
export default Gateway;
