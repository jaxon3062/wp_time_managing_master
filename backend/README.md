# Backend Manual

> for more details, see [graphql schema](./src/schema.graphql)

## *TODO*
- [x] sign up / log in (basic, w/o encrypted password)
- [ ] sign up / log in (advanced, w/ encrypted password)
- [x] friend system (add, accept, remove)
- [x] status change (online,  offline, study)
- [x] message system
- [ ] subscriptions

## Types

### `User`
- *name*: String! $\rightarrow$ *user*'s name(unique)
- *friends*: [[User](#user)] $\rightarrow$ *user*'s friends
- *messages*: [[Message](#message)] $\rightarrow$ messages *user* received
- *friendRequest*: [[User](#user)] $\rightarrow$ friend requests sent to *user*
- *status*: String $\rightarrow$

### `Message`
- *from*: String $\rightarrow$ the user sending the message
- *to*: String $\rightarrow$ the user receiving the message
- *context*: String $\rightarrow$ the message context

### `Status`
- OFFLINE: "OFFLINE"
- ONLINE: "ONLINE"
- STUDY: "STUDY"

## Query

### `getFriends`
- parameters:
  - *name*: String!
- return:
  - *name*'s friends: [[User](#user)]

### `findUser`
- parameters:
  - *name*: String!
- return:
  - *name*'s data: [User](#user)


## Mutate

### `addFriend`
> sending friend request 
- parameters: 
  - *name*: String! $\rightarrow$ who want to add friend
  - *friendName*: String! $\rightarrow$ the one *name* want to add
- return:
  - *friendName*'s data: [User](#user)

### `acceptFriend`
> accept friend request
- parameters:
  - *name*: String! $\rightarrow$ the one accept the friend request
  - *friendName*: String! $\rightarrow$ from whom the request came
- return:
  - *friendName*'s data: [User](#user)

### `removeFriend`
> remove a friend
- parameters:
  - *name*: String! $\rightarrow$ the one want to remove friend
  - *friendName*: String! $\rightarrow$ the one *name* want to remove
- return:
  - *friendName*'s data: [User](#user)

### `register`
> registing new user
- parameters:
  - *name*: String! $\rightarrow$ the new user name (unique)
  - *password*: String! $\rightarrow$ the password
- return:
  - the new user data: [User](#user)
  - returns `User.name=""` if there already exists another identical *name*

### `logIn`
> log in
- parameters:
  - *name*: String! $\rightarrow$ user name
  - *password*: String! $\rightarrow$ password
- return:
  - *name*'s data: [User](#user)

### `statusUpdate`
> change status (OFFLINE, ONLINE, STUDY)
- parameters:
  - *name*: String! $\rightarrow$ user name
  - *status*: String! $\rightarrow$ the new status
- return:
  - *name*'s data after update: [User](#user)

### `sendMessage`
> send [message](#message)
- parameters:
  - *from*: String! $\rightarrow$ the name of the user sent the message
  - *to*: String! $\rightarrow$ the name of the user received the message
  - *context*: String $\rightarrow$ the message context
- return:
  - the user received the message: [User](#user)

## Subscription *(Working)*

