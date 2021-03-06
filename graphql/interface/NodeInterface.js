import { nodeDefinitions, fromGlobalId } from "graphql-relay";

import UserType from '../type/UserType';
import PostType from '../type/PostType';

import User from '../../data/model/User';
import Post from '../../data/model/Post';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, { db }) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {

      case 'User':
        log('NodeInterface: get user with id ' + id);
        return db.getViewerById(id);

      case 'Post':
        return db.getPost(id);

      default:
        return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType;
    }
    else if (obj instanceof Post) {
      return PostType;
    }
  }
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;