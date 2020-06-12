const initialState = {
  users: [],
  chat: [
    {
      _id: '-LqiqPmRp0Ce2BsRWYdq',
      text: 'Hello Developer',
      createdAt: 1570596564407,
      user: {
        _id: '3e0UQfNzNrcLrw5KX0WCPb8APbS2',
        name: 'Fandy',
        avatar:
          'https://www.shareicon.net/data/2016/09/01/822711_user_512x512.png',
      },
    },
  ],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        users: action.res,
        chat: state.chat,
      };
    case 'GET_USER':
      return {
        users: state.users,
        chat: state.chat,
      };
    case 'SEND_MESSAGE':
      return {
        users: state.users,
        chat: action.res,
      };
    case 'GET_MESSAGE':
      return {
        users: state.users,
        chat: state.chat,
      };
    case 'SAVE_IMG':
      const tmp = state.users;
      tmp['img'] = action.res;
      return {
        users: tmp,
        chat: state.chat,
      };
    default:
      return state;
  }
};

export default user;
