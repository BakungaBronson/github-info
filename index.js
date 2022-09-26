const { Octokit } = require("@octokit/core");
require("dotenv").config();

(async () => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });
    const debug = true;
    let users = [];
    const trialLength = 11;

    for (let index = 1; index < trialLength; index++) {
        await octokit
            .request("GET /search/users", {
                q: "location:" + process.env.LOCATION,
                // Set the number of users to retrieve
                per_page: 100,
                page: index,
            })
            .then((response) => {
                users = [...users, ...response.data.items];
            })
            .catch((error) => {
                console.log("Error:", error.status, error.message);
            });
    }
    if (users && debug) console.log("Users' array contains: " + users.length);
})();
