import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
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
        type
        name
        description
        location
        hourly_rate
        phone_number
        image
      } 
    } 
}
  `;

export const QUERY_ALL = gql`
 
 {
   all{
    users{
        _id
        first_name
        last_name
        username
        email
        servicePost {
          name
          description
          location
          type
          hourly_rate
          phone_number
        }
      }
    }
 }
`;

export const QUERY_SERVICES = gql`
query getServices {
  services {
        _id
        name
        description
        location
        hourly_rate
        phone_number
        image
  }
}`

export const QUERY_FIND_USER = gql`
query findUser($_id: ID!) {
  findUser(_id: $_id) {
    _id
      first_name
      last_name
      username
      email
      password
      profpic
      aboutme
      servicePost{
          name
          description
          location
          hourly_rate
          phone_number
        }
  }
}`

export const QUERY_FINDSERVICE = gql`
query findServicePost($location: String!, $type: String!){
  findServicePost(location: $location, type: $type){
    _id
    name
    type
    description
    location
    hourly_rate
    phone_number
    image
    user{
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