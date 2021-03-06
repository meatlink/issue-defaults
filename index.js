const core = require("@actions/core");

const GithubWrapper = require("./src/githubWrapper.js");
const IssueDefaultsAction = require("./src/issueDefaultsAction.js");


main();


async function main() {
    try {
        console.log("started");
        const githubWrapper = new GithubWrapper();
        const action = new IssueDefaultsAction({githubWrapper});
        await Promise.all(action.run());
        console.log("finished");
    } catch (error) {
        core.setFailed(error.message);
    }
}
