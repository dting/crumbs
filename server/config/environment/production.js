module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost/crumbs',
  },
};
