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
  - returns `User.ErrorMessage="USER_NOT_FOUND"` if such user *name* does not exist

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
  - returns `User.ErrorMessage="USER_EXIST"` if there already exists another identical *name*

### `logIn`
> log in
- parameters:
  - *name*: String! $\rightarrow$ user name
  - *password*: String! $\rightarrow$ password
- return:
  - *name*'s data: [User](#user)
  - returns `User.ErrorMessage="USER_NOT_FOUND"` if such user *name* does not exist
  - returns `User.ErrorMessage="WRONG_PASSWORD"` if the password is wrong

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

## Subscription 

### `friendStatusUpdate`
> notify if a friend's data changed 
- parameters:
  - name: String! $\rightarrow$ the friend's name you want to keep alert on
- return:
  - the friend's updated data: [User](#user)

### `friendAdded`
> notify if someone send a friend request to me
- parameters:
  - name: String! $\rightarrow$ my name
- return:
  - my updated data after receiving the request: [User](#user)


### `friendAccepted`
> notify if there's a new friend (whether accepted by whom)
- parameters:
  - name: String! $\rightarrow$ my name
- return:
  - my updated data after making new friend: [User](#user)


### `friendRemoved`
> notify if any friend is removed (whether removed by whom)
- parameters:
  - name: String! $\rightarrow$ my name
- return:
  - my updated data after removing friend: [User](#user)

### `messageReceived`
> notify when reveiving a new message
- parameters:
  - name: String! $\rightarrow$ my name
- return:
  - my updated data after receiving the new message: [User](#user)

