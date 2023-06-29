const initialState = [];

/// action value
const MODIFY_POST = 'MODIFY_POST';

// action creator
export const modifyPost = ({ title, content }) => {
  return {
    type: MODIFY_POST,
    payload: {
      title,
      content
    }
  };
};

// reducer
const post = (state = initialState, { type, payload }) => {
  switch (type) {
    case MODIFY_POST:
      return [...state, payload];

    default:
      return state;
  }
};

export default post;
