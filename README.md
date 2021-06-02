# ComeOn Assignment
## Usage

- yarn install
- yarn start:api
- yarn start

## CI
- yarn lint
- yarn tsc
- yarn test

![comeon-javascript-test-site](http://b5fa2dae67bf7ee0b0e5-e0d56d540e31d5f2f9430984d20d712d.r41.cf3.rackcdn.com/comeon-javascript-test_3.png)

## Comments
- Logout API doesn't make sense if the API is not stateful(which it shouldn't be in the best of worlds) which is why the logout functionality is just "forgetting" the session "token".
- Quite poor use of correct HTML semantics.
- [Semantic UI](https://semantic-ui.com/) seems dead and unmaintained. [Fomantic UI](https://fomantic-ui.com/) looks to be a successor but still built on jQuery and uses bad HTML semantics.
