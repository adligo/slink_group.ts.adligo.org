# slink_group.ts.adligo.org
This will be a small project of other projects to test slink.

To clone the sub projects run;

```
npm run git-clone-ssh
```

Then run the following command to link the node_modules to the install in slink_group_deps.ts.adligo.org.

```
npm run setup
```

Then run the build.

```
npm run build
```

Then run the tests.

```
npm run test
```

### Alternativly you can use commands like this to build and test slink;

```
cd slink.ts.adligo.org
npm run install
npm run build
```

```
cd slink_tests.ts.adligo.org
npm run install
npm run tests
or
npm run testsWindows
```

### Jenkins

[Building SLink on Jenkins](https://github.com/adligo/slink_docker.ts.adligo.org/jenkins)