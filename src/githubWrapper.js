const core = require("@actions/core");
const github = require("@actions/github");


class GithubWrapper {

    constructor() {
        this.octokit = new github.GitHub(this.getActionToken());
    }

    assignIssueTo(assignee) {
        return this.octokit.issues.addAssignees({
            owner: github.context.repository.owner,
            repo: github.context.repository.name,
            issue_number: github.context.issue.number,
            assignees: [assignee]
        });
    }

    addLabelToIssue(label) {
        return this.octokit.issues.addLabels({
            owner: github.context.repository.owner,
            repo: github.context.repository.name,
            issue_number: github.context.issue.number,
            labels: [label]
        });
    }

    isIssueAssigned() {
        return Boolean(github.context.payload.issue.assignee);
    }

    isIssueHasLabels() {
        return github.context.payload.issue.labels.length > 0;
    }

    getActionDefaultAssignee() {
        return core.getInput("assignee");
    }

    getActionDefaultLabel() {
        return core.getInput("label");
    }

    getActionToken() {
        return core.getInput("token");
    }

    setFailed() {

    }

}


module.exports = GithubWrapper;
