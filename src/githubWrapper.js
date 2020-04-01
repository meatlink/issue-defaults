const core = require("@actions/core");
const github = require("@actions/github");


class GithubWrapper {

    constructor() {
        this.octokit = new github.GitHub(this.getActionToken());
    }

    getPayload() {
        return github.context.payload;
    }

    assignIssueTo(assignee) {
        return this.octokit.issues.addAssignees({
            owner: this.getPayload().repository.owner.login,
            repo: this.getPayload().repository.name,
            issue_number: this.getPayload().issue.number,
            assignees: [assignee]
        });
    }

    addLabelToIssue(label) {
        return this.octokit.issues.addLabels({
            owner: this.getPayload().repository.owner.login,
            repo: this.getPayload().repository.name,
            issue_number: this.getPayload().issue.number,
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

}


module.exports = GithubWrapper;
