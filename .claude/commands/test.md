# test

Run all available tests and fix any failures.

---

## Procedure

1. Run `npx vitest run` and capture the full output.
2. If all tests pass: report the summary (test count, duration) and stop.
3. If any tests fail:
   a. Read the failure output carefully — identify which test files and assertions failed.
   b. Determine whether the failure is in **test code** or **source code**:
   - If the test expectation is wrong (e.g. testing against an outdated schema or stale assumption), fix the test.
   - If the source code, content, or configuration is wrong (e.g. missing required field, broken reference), fix the source.
     c. Apply the minimal fix needed — do not refactor or clean up unrelated code.
     d. Re-run `npx vitest run` to verify the fix.
     e. Repeat from step 3 until all tests pass (max 5 iterations to avoid loops).
4. If after 5 iterations tests still fail: stop, report the remaining failures, and ask the user for guidance.
5. Summarise what was fixed (if anything) in a short list.

## Rules

- Never delete or skip a failing test to make the suite pass.
- Never modify test assertions to match broken behaviour — fix the root cause.
- If a fix touches content YAML files, validate the change is consistent with `spec/content-structure.md`.
- If a fix is outside the scope of existing tests (e.g. a template bug discovered by accident), note it but do not fix it here.
