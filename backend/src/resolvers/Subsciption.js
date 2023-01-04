const Subscription = {
    friendAdded: {
        subscribe: (parent, { name }, { pubSub }) => {
            return pubSub.subscribe(`${name} add friend`);
        }
    },
    friendAccepted: {
        subscribe: (parent, { name }, { pubSub }) => {
            return pubSub.subscribe(`${name} new friend`);
        }
    },
    friendRemoved: {
        subscribe: (parent, { name }, { pubSub }) => {
            return pubSub.subscribe(`${name} remove friend`);
        }
    },
    friendStatusUpdate: {
        subscribe: (parent, { name }, { pubSub }) => {
            return pubSub.subscribe(`${name} status update`)
        }
    },
    messageReceived: {
        subscribe: (parent, { name }, { pubSub }) => {
            return pubSub.subscribe(`${name} received message`);
        }
    }
};

export default Subscription;