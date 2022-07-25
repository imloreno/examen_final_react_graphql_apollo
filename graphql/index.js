const graphql = require("graphql");
const User = require("../mongo/schema/user");
const Post = require("../mongo/schema/post");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    img: { type: GraphQLString },
    idUser: { type: GraphQLID },

    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.idUser);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    img: { type: GraphQLString },
    user: { type: GraphQLString },
    password: { type: GraphQLString },

    post: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ idUser: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        //Joining idUser with USer
        const posts = Post.find({});
        return posts;
      },
    },
    user: {
      type: UserType,
      args: {
        user: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findOne({ user: args.user, password: args.password });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
  },
});

//---------------------------------
//Very similar to RootQuery helps users to add/update to the database.
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        img: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          img: args.img,
          user: args.user,
          password: args.password,
        });
        return user.save();
      },
    },
    //Post
    addPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        img: { type: new GraphQLNonNull(GraphQLString) },
        idUser: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = User.findOne({ id: args.idUser });
        if (!user && !user.id) return null;
        let post = new Post({
          title: args.title,
          text: args.text,
          img: args.img,
          idUser: args.idUser,
        });
        return post.save();
      },
    },
    deletePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Post.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
