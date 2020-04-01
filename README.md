# Issue Defaults Github Action

Simple action that sets default assignee/labels to new issues.

- If issue was not assigned to anyone, it would be assigned to given person.
- If issue has no lables, given label would be added.


# Tests

```
npm install
npm test
```

# Use

```yaml
name: Apply default assignee and label to issues
on:
  issues:
    types:
      - opened
jobs:
  set-labels:
    runs-on: ubuntu-latest
    steps:
     - name: Set issue defaults
       uses: meatlink/issue-defaults@v1
       with:
         token: ${{ secrets.GITHUB_TOKEN }}
         label: this-issue-is-brand-new
         assignee: meatlink
```