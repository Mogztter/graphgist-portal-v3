import gql from "graphql-tag";

// integration tests, skipping...
describe.skip("graphql endpoint", () => {
  let query, mutate;

  beforeAll(() => {
    // require tests.js dynamically, otherwise "Missing publicKey during ImageKit initialization" is thrown by ImageKit
    // preferably, we should not instantiate ImageKit at import/require time to make sure that we can run tests without this component.
    // we could also restructure the code to be able to mock the "image provider" component.
    const { createTestClient } = require("./tests.js");
    let { query, mutate } = createTestClient();
  });

  test("can query graphgist", async () => {
    const res = await query({
      query: gql`
        {
          GraphGist(first: 10) {
            title
          }
        }
      `,
    });
    expect(res).toMatchSnapshot();
  });

  test("can preview graphgist", async () => {
    const res = await mutate({
      mutation: gql`
        mutation Preview($asciidoc: String!) {
          PreviewGraphGist(asciidoc: $asciidoc)
        }
      `,
      variables: { asciidoc: "== Testtt" },
    });
    expect(res).toMatchSnapshot();
  });
});
