import { actions } from "../actions";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const BlogReducer = (state, action) => {
  switch (action.type) {
    case actions.blog.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.blog.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        blogs: action.data,
      };
    }
    case actions.blog.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actions.blog.BLOG_CREATED: {
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.data],
      };
    }
    case actions.blog.BLOG_EDITED: {
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.data],
      };
    }
    case actions.blog.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, { thumbnail: action.data }],
      };
    }

    default: {
      return state;
    }
  }
};

export { BlogReducer, initialState };
