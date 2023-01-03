
const User = {
    friends: (parent) => (parent.friends),
    friendRequest: (parent) => (parent.friendRequest),
    messages: (parent) => (parent.messages),
}

export default User;