const IssueDefaultsAction = require("../src/issueDefaultsAction.js");


describe("Action", () => {
    let githubWrapper;
    let action;

    beforeEach(() => {
        githubWrapper = createFakeGithubWrapper();
        action = new IssueDefaultsAction({
            githubWrapper
        });
    });

    it("should assign issue when it is not yet assigned to anyone", () => {
        githubWrapper.isIssueAssigned.and.returnValue(false);
        githubWrapper.getActionDefaultAssignee.and.returnValue("testAssignee");
        action.run();
        expect(githubWrapper.assignIssueTo).toHaveBeenCalledWith("testAssignee");
    });

    it("should not assign issue when it is already assigned", () => {
        githubWrapper.isIssueAssigned.and.returnValue(true);
        action.run();
        expect(githubWrapper.assignIssueTo).not.toHaveBeenCalled();
    });

    it("should add label when issue has no lables yet", () => {
        githubWrapper.isIssueHasLabels.and.returnValue(false);
        githubWrapper.getActionDefaultLabel.and.returnValue("testLabel");
        action.run();
        expect(githubWrapper.addLabelToIssue).toHaveBeenCalledWith("testLabel");
    });

    it("should not add label when issue already has at least one label", () => {
        githubWrapper.isIssueHasLabels.and.returnValue(true);
        action.run();
        expect(githubWrapper.addLabelToIssue).not.toHaveBeenCalled();
    });

});


function createFakeGithubWrapper() {
    const t = jasmine.createSpyObj("githubWrapper", [
        "assignIssueTo",
        "addLabelToIssue",
        "isIssueAssigned",
        "isIssueHasLabels",
        "getActionDefaultAssignee",
        "getActionDefaultLabel"
    ]);
    return t;
}
