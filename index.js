const core = require("@actions/core");
const github = require("@actions/github");

try {
  const tag = core.getInput("tag");
  const assignee = core.getInput("assignee");
  console.log(tag);
  console.log(assignee);
//   core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
