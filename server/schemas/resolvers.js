const { AuthenticationError } = require("apollo-server-express");
const { User, ServicePost } = require('../models');
const { signToken } = require("../utils/auth");
// const { find, filter } = require ('lodash');

//functions for queries in typeDef.js
const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    //when we add context to the query, then i can retrieve the logged in user without have to specififally look for it.
    me: async (parent, args, context) => {
      
      //if context has an 'user property' then it means that the user excecuting this query has a valid JWT and is already logged in
      if(context.user) {
        const userData = await User.findOne({
          _id:context.user._id
        })
        .select("-__v -password");
        const userPopulate = await userData.populate("servicePost").execPopulate();
        console.log("me query", userPopulate)
        return userData;
      }
      throw new AuthenticationError("User is not logged in")
    },
    findServicePost: async (parent, { location, type }) => {
      // console.log("findservice post")
      //if context has an 'user property' then it means that the user excecuting this query has a valid JWT and is already logged i
      const params = location ? { location, type } : {type};
      return ServicePost.find(params).populate("user");
    },
    services: async (parent, { username }) => {
      // console.log("query services")
    const params = username ? { username } : {};
    return ServicePost.find(params).populate("user");
    },
    findUser: async (parent, { _id }) => {
      return User.findOne({ _id: _id });
    }
    // findUser: async (parent, args) => {
    //   return await User.findById(args.id);
    // },
  },
    
  Mutation: {
    //creates a single user an a jwt token for that user
    addUser: async (parent, {first_name, last_name, username, email, password}) => {
      console.log("mutation add user")
      try {
        //create a new user first
        const user = await User.create({first_name, last_name, username, email, password});
        //sign a JSON web token and log in the user after it is created
        const token = signToken(user);
        //we need to return an 'auth' object that contains the signed token and user's info
        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    updateUser: async (parent, {first_name, last_name, aboutme, profpic}, context) => {
      // Find and update the matching class using the destructured args
      // console.log("update user in resolvers");
      //if context has an 'user property' then it means that the user excecuting this query has a valid JWT and is already logged in
      if(context.user) {
        // console.log("updating the user");        
        let userInfo = await User.findOneAndUpdate(
          { _id: context.user._id},
          {
            first_name,
            last_name,
            profpic,
            aboutme, 
          },
          { 
            new: true,
            runValidators: true, 
          }).select("-__v -password").populate("ServicePost"); 
        return userInfo;
      }
      // console.log("my user info");
      throw new AuthenticationError("User is not logged in");
    },
    addServicePost: async (parent, {name, type, description, location, hourly_rate, phone_number, image}, context) => {
      console.log("adding service post")
      
        // return ServicePost.create({ name, description, location, hourly_rate, phone_number, image });
  
      try {
        if (context.user) {
          // console.log("tetsing context.user");
          // console.log(context.user);
          let post = await ServicePost.create({
            name,
            description,
            location,
            hourly_rate,
            phone_number,
            image,
            type,
            user:context.user._id
          });
          let user = await User.findByIdAndUpdate(context.user._id, {$push:{servicePost:post._id}});
          const finalpost = await post.populate("user").populate({ path:"user", populate:"servicePost" }).execPopulate();
          // console.log(finalpost);
          return finalpost;
        }
        throw new AuthenticationError("User is not logged in");
      } catch (err) {
        console.log(err);
      }
    },
    //login mutation to find a specific user by email in the db
    login: async (parent, { email, password }) => {
      console.log("login")
      //look for the user by the email which has to be unique
      const user = await User.findOne({ email });
      //if there is no user with that email address then i need to return a authentication error
      if (!user) {
        throw new AuthenticationError("No user was found");
      }
      //if the user was found, then we need to excecute the 'isCorrectPassword' instance method and check if the password is correct
      const correctPw = await user.isCorrectPassword(password);
      //if the password is not correct then return authentication error
      if(!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }
      //if email and password are correct, then sign the yser into the app with a jwt
      const token = signToken(user);
      return { token, user };
    },
    savedServicePost: async (parent, args, context) => {
      console.log("saved service post mutation")
      //if context has an 'user property' then it means that the user excecuting this query has a valid JWT and is already logged in
      if(context.user) {
        const updateUser = await User.findOneAndUpdate({
          _id:context.user._id
        },
        //push the book to an array of books associated with this user
        { $addToSet: { ServicePost: args._id } },
        { new: true,
        runValidators: true }
        );
        return updateUser;
      }
      //if usert attempts to execute this update mutation and it is not logged in, then I need to throw an error
      throw new AuthenticationError("User is not logged in");
    },
    //when we add context to the query, then i can retrieve the logged in user without have to specififally look for it.
    removeServicePost: async (parent, args, context) => {
      console.log("remove service mutation")
      //if context has an 'user property' then it means that the user excecuting this query has a valid JWT and is already logged in
      if(context.user) {
        const deletedPost = await ServicePost.findByIdAndDelete({
          _id: args._id
          
        });
        console.log(deletedPost);
        const updateUser = await User.findOneAndUpdate({
          _id:context.user._id
        },
        //delete the book based on the book ID from the db
        { $pull: { servicePost: args._id  } },
        { new: true, runValidators: true }
        );
        console.log(args._id)
        console.log(updateUser)
        return updateUser;
      }
      //if usert attempts to execute this update mutation and it is not logged in, then I need to throw an error
      throw new AuthenticationError("User is not logged in");
    },
  },
  //when we add context to the query, then i can retrieve the logged in user without have to specififally look for it.
  

};

module.exports = resolvers;
