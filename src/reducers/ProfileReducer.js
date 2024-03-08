import { actions } from "../actions";

const initialState = {
  author: null,
  blogs: [],
  loading: false,
  error: null,
};

const ProfileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        author: action.data,
        blogs: action.data.blogs,
      };
    }
    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        author: {
          ...state.author,
          bio: action.data,
        },
      };
    }
    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        author: {
          ...state.author,
          avatar: action.data.avatar,
        },
      };
    }
    case actions.profile.BLOG_DELETED: {
      return {
        ...state,
        loading: false,
        author: {
          ...state.author,
          blogs: state?.blogs.filter((item) => item.id !== action.data),
        },
        blogs: state?.blogs.filter((item) => item.id !== action.data),
      };
    }

    default: {
      return state;
    }
  }
};

export { ProfileReducer, initialState };
