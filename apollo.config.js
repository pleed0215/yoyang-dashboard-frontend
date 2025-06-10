module.exports = {
    client: {
      include: ["/**/*.{tsx,ts}"],
      tagName: "gql",
      service: {
        name: "yoyang-dashboard",
        //url: "http://localhost:4000/graphql",
        url: "http://localhost:3000/graphql",
      },
    },
  };