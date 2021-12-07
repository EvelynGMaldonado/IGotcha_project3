const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    _id: ID
    first_name: String
    last_name: String
    username: String
    email: String
    password: String
    profpic: String
    aboutme: String
    servicePost: [ServicePost]
  }
  type ServicePost {
    _id: String
    name: String
    type: String
    description: String
    location: String
    hourly_rate: String
    phone_number: String
    image: String
    user: User
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    findServicePost(location:String, type:String):[ServicePost]
    users: [User]!
    services (username: String): [ServicePost]
    findUser (_id: ID!): User
  }



  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Auth
    updateUser(first_name: String, last_name: String, aboutme: String, profpic: String) : User
    addServicePost(name: String!, type: String!, description: String, location: String!, hourly_rate: String!, phone_number: String!, image: String!): ServicePost
    savedServicePost(_id: ID!): User
    removeServicePost(_id: ID!): User
  }
  input ServicePostInput {
    name: String
    description: String
    type: String
    location:String
    hourly_rate: String
    phone_number: String
    image: String
    user: String
  }
  input UserInput {
    first_name: String!
    last_name: String!
    username: String!
    email: String!
    password: String!
  }
  input updateUser {
  first_name: String!
  last_name: String!
  username: String!
  email: String!
  password: String!
  confirm_password: String!
  aboutme: String!
  profpic: String!
  }
`;

  

module.exports = typeDefs;