const initialState = [];

// action value
const GET_USERS = 'GET_USERS';

// action creator
export const getUsers = ({ id, name, email }) => {
  return {
    type: GET_USERS,
    payload: {
      id,
      name,
      email
    }
  };
};

// reducer
const users = (state = initialState, { type, payload }) => {
  console.log('리듀서에서 찍은 state', payload);
  switch (type) {
    case GET_USERS:
      return [...state, payload];
    default:
      return state;
  }
};

export default users;
