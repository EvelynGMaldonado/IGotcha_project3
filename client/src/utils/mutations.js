import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        first_name
        last_name
        username
        email
        profpic
        aboutme
        servicePost {
            _id
          name
          description
          location
          hourly_rate
          phone_number
          image
        }
      }
    }
  }`;

export const ADD_USER = gql`
  mutation addUser($first_name: String!, $last_name: String!, $username: String!, $email: String!, $password: String!) {
    addUser(first_name: $first_name, last_name: $last_name, username: $username, email: $email, password: $password) {
      token
      user {
        _id
        first_name
        last_name
        username
        email
        password
        profpic
        aboutme
      }
    }
  }`;

export const UPDATE_USER = gql`
  mutation updateUser($first_name: String, $last_name: String, $aboutme: String, $profpic: String) {
    updateUser(first_name: $first_name, last_name: $last_name, aboutme: $aboutme, profpic: $profpic) {
      _id
      first_name
      last_name
      username
      email
      password
      profpic
      aboutme
      servicePost {
          _id
        name
        description
        location
        hourly_rate
        phone_number
        type
        image
      }
    }
  }`;

export const ADD_SERVICEPOST = gql`
mutation addServicePost($type: String!, $name: String!, $description: String!, $location: String!, $hourly_rate: String!, $phone_number: String!, $image: String!) {
  addServicePost(type:$type, name: $name, description: $description, location: $location, hourly_rate: $hourly_rate, phone_number: $phone_number, image: $image) {
    user {
      first_name
      last_name
      username
      servicePost {
        name
        description
        location
        type
        hourly_rate
        phone_number
        image
      }
    }
  }
}`;

export const SAVED_SERVICE_POST = gql `
mutation savedServicePost($servicePostId: ID!) {
  savedServicePost(servicePostId: $servicePostId) {
    _id
      first_name
      last_name
      username
      servicePost {
        _id
        name
        description
        location
        hourly_rate
        phone_number
        image
      }
    
  }
}`;

export const REMOVE_SERVICE_POST = gql `
mutation removeServicePost($_id: ID!) {
  removeServicePost(_id: $_id) {
      _id
      first_name
      last_name
      username
      servicePost {
        _id
        name
        description
        location
        type
        hourly_rate
        phone_number
      }
    
  }
}`;


