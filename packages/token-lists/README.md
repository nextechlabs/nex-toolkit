# NexDex Token Lists

This repo contains main NexDex token list and tools to validate it.

## How to add external lists

URLs to external lists are stored in `token-lists.json`, if you want your list to be available on upcoming list UI page - submit a PR modifying `token-lists.json`.

## How to add new lists within this repository

- Add an array of tokens under `src/tokens`
- Add `checksum:newlistname`, `generate:newlistname`, `makelist:newlistname` command to `package.json` analogous to NexDex default and extended list scripts.
- Modify `checksum.ts`, `buildList.ts`, `ci-check.ts`, and `default.test.ts` to handle new list

## How to add new tokens to NexDex (extended) token list

Note - this is not something we expect pull requests for.  
Unless you've been specifically asked by someone from NXDX team please do no submit PRs to be listed on default NXDX list. You can still trade your tokens on NXDX exchange by pasting your address into the token field.

- Add new tokens to `src/tokens/nexdex-extended.json` file
- Run `yarn makelist:nxdx-extended`
  - By default new list will have patch version number bumped by 1 (e.g. `2.0.1` -> `2.0.2`).
  - If you want to bump minor version add `minor` after makelist command `yarn makelist:nxdx-extended minor`
  - If you want to bump major version add `major` after makelist command `yarn makelist:nxdx-extended major`
- If tests pass - new token list will be created under `lists` directory

For list to be considered valid it need to satisfy the following criteria:

- It passes [token list schema](https://github.com/Uniswap/token-lists/blob/master/src/tokenlist.schema.json) validation (schema is [slightly modified](src/schema.ts))
- There are no duplicate addresses, symbols or token names in the list
- All addresses are valid and checksummed (`yarn checksum:nxdx` automatically converts addresses to checksummed versions, it is also part of `yarn makelist:nxdx`)

## How to update Top100 Token list

Note - this is not something we expect pull requests for.

```shell script
# Fetch the Top100 Tokens on NexDex v1, and update list.
$ yarn fetch:nxdx-top-100

# Build token list (nexdex-top-100.json)
$ yarn makelist:nxdx-top-100
```

## Deploying

Token lists will be auto-deployed via netlify when PR is merged to master. Be sure to build the list with `yarn makelist:list-name` before submitting/merging the PR since it doesn't make much sense building lists within Netlify (because most errors are related to wrong token information and should be fixed prior to landing into master)

Netlify simply takes the json files under `lists` directory and hosts them on `tokens.nexdex.finance/list-name.json`
