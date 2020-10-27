eslint-config-strongloop
========================

Baseline eslint config for StrongLoop projects. A work in progress.

## Basic Usage

Add `eslint-config-strongloop` to `devDependencies`.

    $ npm install -D eslint-config-strongloop

Create/modify `.eslintrc` in the project's root to include:

```json
{
  "extends": "strongloop"
}
```

## Advanced Usage

It is sometimes desirable to override some of these rules because a team
does not want to follow that particular rule for this repository:

```json
{
  "extends": "strongloop",
  "rules": {
    "comma-dangle": 0
  }
}
```

In cases where these rules are being adopted but the code has many style
errors, it might be helpful to turn the worst errors into warnings until the
entire repo can be fixed:


```json
{
  "extends": "strongloop",
  "rules": {
    "comma-dangle": 1,
  }
}
```

## Further Reading

- [eslint rules](http://eslint.org/docs/rules/)
- [eslint config](http://eslint.org/docs/user-guide/configuring)

---
&copy; 2015 StrongLoop, Inc.
