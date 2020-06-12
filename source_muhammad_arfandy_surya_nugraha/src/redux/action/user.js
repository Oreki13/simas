export const saveUser = data => {
  return {
    type: 'SAVE_USER',
    res: data,
  };
};

export const saveImg = data => {
  return {
    type: 'SAVE_IMG',
    res: data,
  };
};
export const getData = () => {
  return {
    type: 'GET_USER',
  };
};
export const sendMessage = data => {
  return {
    type: 'SEND_MESSAGE',
    res: data,
  };
};
export const getMessage = () => {
  return {
    type: 'GET_MESSAGE',
  };
};
