const { Octokit } = require("@octokit/core");
require('dotenv').config();

(async () => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });
    const debug = true;
    const users = await octokit
        .request("GET /search/users", {
            q: "location:uganda",
            // Set the number of users to retrieve
            per_page: 100,
        })
        .then((response) => {
            return response.data.items;
        })
        .catch((error) => {
            console.log(error);
            console.log("Error fetching users: Please check that .env file is set up correctly with your github token");
        });
    if (debug) console.log(users.length);
})();
