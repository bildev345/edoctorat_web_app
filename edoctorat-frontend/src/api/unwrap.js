// src/api/unwrap.js
export const unwrap = (res) => {
  // ApiResponse { success, message, data, timestamp }
  if (res?.data && Object.prototype.hasOwnProperty.call(res.data, "data")) {
    return res.data.data; 
  }
  return res?.data;
};
