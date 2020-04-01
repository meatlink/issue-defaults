class IssueDefaultsAction {

    constructor(args) {
        this.githubWrapper = args.githubWrapper;
    }

    run() {
        return [
            this.assignIfNeccessary(),
            this.labelIfNeccessary()
        ];
    }

    assignIfNeccessary() {
        if (!this.githubWrapper.isIssueAssigned())
            this.githubWrapper.assignIssueTo(this.getDefaultAssignee());
    }

    getDefaultAssignee() {
        return this.githubWrapper.getActionDefaultAssignee();
    }

    labelIfNeccessary() {
        if (!this.githubWrapper.isIssueHasLabels())
            this.githubWrapper.addLabelToIssue(this.getDefaultLabel());
    }

    getDefaultLabel() {
        return this.githubWrapper.getActionDefaultLabel();
    }

}


module.exports = IssueDefaultsAction;
