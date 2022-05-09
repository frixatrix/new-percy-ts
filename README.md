## Showcase for updated Percy and Jest-puppeteer/Typescript not working

There are 3 simple tests:
- `simple-jest` -> test without percySnapshot
- `jest-percy` -> test with percySnapshot and import syntax
- `jest-percy-2` -> test with percySnapshot and require syntax

There are 3 run options with `--debug` which won't create percy builds:
- `percy:node` -> percy exec using node + experimental modules flag + path to modules bin jest
- `percy:jest` -> percy exec with jest only
- `percy:jest-node` -> percy exec using node + experimental modules flag + path to jest.js bin

All 3 runs are failing for tests which contain percySnapshot.

### `percy:node`
```
✗ npm run percy:node     

> node-docker-percy@1.0.0 percy:node
> npx percy exec --debug -- node --experimental-vm-modules node_modules/.bin/jest

[percy] Percy has started!
[percy:cli:exec] Running "node --experimental-vm-modules node_modules/.bin/jest" (0ms)
(node:13951) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
(node:13972) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
(node:13973) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
(node:13974) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  tests/simple-jest.ts
  Simple Jest test
    ✓ Has correct page title (4 ms)

 FAIL  tests/jest-percy-2.ts
  Jest Percy with require test
    ✕ Has correct page title (13 ms)

  ● Jest Percy with require test › Has correct page title

    Cannot find module '#logger' from 'node_modules/@percy/logger/dist/index.js'

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:491:11)
          at async Promise.all (index 0)

 FAIL  tests/jest-percy.ts
  Jest Percy with import test
    ✕ Has correct page title (9 ms)

  ● Jest Percy with import test › Has correct page title

    Cannot find module '#logger' from 'node_modules/@percy/logger/dist/index.js'

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:491:11)
          at async Promise.all (index 0)

Test Suites: 2 failed, 1 passed, 3 total
Tests:       2 failed, 1 passed, 3 total
Snapshots:   0 total
Time:        1.947 s, estimated 2 s
Ran all test suites.
[percy] Build not created


```

### `percy:jest`
```
✗ npm run percy:jest

> percy:jest
> npx percy exec --debug -- jest

[percy] Percy has started!
[percy:cli:exec] Running "jest" (0ms)
FAIL  tests/jest-percy.ts
Jest Percy with import test
✕ Has correct page title (3 ms)

● Jest Percy with import test › Has correct page title

    You need to run with a version of node that supports ES Modules in the VM API. See https://jestjs.io/docs/ecmascript-modules

      11 |     test('Has correct page title', async () => {
      12 |         await expect(page.title()).resolves.toMatch('Google')
    > 13 |         await percySnapshot(page, 'Google Home page')
         |               ^
      14 |     })
      15 | })

      at invariant (node_modules/jest-runtime/build/index.js:2569:11)
      at percySnapshot (node_modules/@percy/puppeteer/index.js:9:15)
      at Object.<anonymous> (tests/jest-percy.ts:13:15)

FAIL  tests/jest-percy-2.ts
Jest Percy with require test
✕ Has correct page title (3 ms)

● Jest Percy with require test › Has correct page title

    You need to run with a version of node that supports ES Modules in the VM API. See https://jestjs.io/docs/ecmascript-modules

      11 |     test('Has correct page title', async () => {
      12 |         await expect(page.title()).resolves.toMatch('Google')
    > 13 |         await percySnapshot(page, 'Google Home page')
         |               ^
      14 |     })
      15 | })

      at invariant (node_modules/jest-runtime/build/index.js:2569:11)
      at percySnapshot (node_modules/@percy/puppeteer/index.js:9:15)
      at Object.percySnapshot (tests/jest-percy-2.ts:13:15)

PASS  tests/simple-jest.ts
Simple Jest test
✓ Has correct page title (3 ms)

Test Suites: 2 failed, 1 passed, 3 total
Tests:       2 failed, 1 passed, 3 total
Snapshots:   0 total
Time:        1.542 s, estimated 2 s
Ran all test suites.
[percy] Build not created
```

### `percy:jest-node`
```
✗ npm run percy:jest-node

> percy:jest-node
> npx percy exec --debug -- node --experimental-vm-modules node_modules/jest/bin/jest.js

[percy] Percy has started!
[percy:cli:exec] Running "node --experimental-vm-modules node_modules/jest/bin/jest.js" (0ms)
(node:14070) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
(node:14085) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
(node:14086) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
(node:14087) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
PASS  tests/simple-jest.ts
Simple Jest test
✓ Has correct page title (2 ms)

FAIL  tests/jest-percy-2.ts
Jest Percy with require test
✕ Has correct page title (10 ms)

● Jest Percy with require test › Has correct page title

    Cannot find module '#logger' from 'node_modules/@percy/logger/dist/index.js'

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:491:11)
          at async Promise.all (index 0)

FAIL  tests/jest-percy.ts
Jest Percy with import test
✕ Has correct page title (11 ms)

● Jest Percy with import test › Has correct page title

    Cannot find module '#logger' from 'node_modules/@percy/logger/dist/index.js'

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:491:11)
          at async Promise.all (index 0)

Test Suites: 2 failed, 1 passed, 3 total
Tests:       2 failed, 1 passed, 3 total
Snapshots:   0 total
Time:        2.222 s
Ran all test suites.
[percy] Build not created
```