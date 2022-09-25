const { Octokit } = require("@octokit/core");
require('dotenv').config();

(async () => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });
    const debug = true;
    const users = await octokit
        .request("GET /search/users", {
            q: "location:"+process.env.LOCATION,
            // Set the number of users to retrieve
            per_page: 100,
        })
        .then((response) => {
            return response.data.items;
        })
        .catch((error) => {
            console.log("Error:", error.status, error.message);
        });
    if (users && debug) console.log(users.length);
})();
