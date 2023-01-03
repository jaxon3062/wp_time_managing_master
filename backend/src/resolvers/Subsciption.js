const Subscription = {
    // friendStartStudy: {
    //     subscribe: (parent, args, { pubSub }) => {

    //     }
    // },
    // friendStopStudy: {
    //     subscribe: (parent, args, { pubSub }) => {

    //     }
    // },
    friendAdded: {
        subscribe: (parent, { id }, { pubSub }) => {
            return pubSub.subscribe(`${id} add friend`);
        }
    },
    friendAccepted: {
        subscribe: (parent, { id }, { pubSub }) => {
            return pubSub.subscribe(`${id} new friend`);
        }
    },
    friendRemoved: {
        subscribe: (parent, { id }, { pubSub }) => {
            return pubSub.subscribe(`${id} remove friend`);
        }
    },

};

export default Subscription;