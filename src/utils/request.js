import axios from 'axios';

export async function get(url, params, opts){
  const res = await axios.get(`${url}${stringify(params)}`, opts);
  return res.data;
};

export async function post(url, params, opts){
  const res = await axios.post(url, params, opts);
  return res.data;
};

export async function del(url, params, opts){
  const res = await axios.delete(`${url}${stringify(params)}`, opts);
  return res.data;
};

function stringify(params = {}){
  let query = [];
  Object.keys(params).map(key => {
    let value = params[key];
    if ( value !== undefined ){
      value = encodeURIComponent(value);
      query.push(`${key}=${value}`);
    };
  });

  query = query.join('&');

  return query ? `?${query}` : '';
};