const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,

            autoIndex: false,
            retryWrites: false
        },
        url: `mongodb+srv://brandon:countem12345@cluster0.ioo9h.mongodb.net/typescript`
    },
    server: {
        host: 'localhost',
        port: '1337'
    }
};

export default config;
