const Subscription = {
  friendUpdate: {
    subscribe: (parent, { name }, { pubSub }) => {
      return pubSub.subscribe(`${name} update friend`);
    },
  },
  friendStatusUpdate: {
    subscribe: (parent, { name }, { pubSub }) => {
      return pubSub.subscribe(`${name} status update`);
    },
  },
  messageReceived: {
    subscribe: (parent, { name }, { pubSub }) => {
      return pubSub.subscribe(`${name} received message`);
    },
  },
};

export default Subscription;
