[![CI Status][ci-badge]][ci-url]
[![Publish Status][publish-badge]][publish-url]
[![NPM version][npm-badge]][npm-url]
[![License][license-badge]][license-url]
[![Dependencies Status][deps-badge]][deps-url]

# concat-text-webpack-plugin

The `ConcatTextPlugin` extracts and concatenates text files from a specified *glob* path into a single file. This is **not intended** to be used to extract frontend asset files, like stylesheets (use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) for this). Instead, this plugin is helpful when dealing with raw text assets that have been split into multiple files for code modularisation purposes, but need to be consolidated for consumption by e.g. the project's backend system.

## Usage

```js
new ConcatTextPlugin({
    files: "res/**/*.properties",
    name: "values.properties",
    outputPath: "cache/",
})
```

The above configuration will look for `.properties` files under the `res/` folder (relative to the Webpack config file location) and concatenate them into a single file named `values.properties` under the `cache/` directory, which is **relative to the Webpack output path**.

### Options

#### `files` (string)

The *glob* string to get the list of files that should be concatenated.

#### `name` (string, default: same as *Webpack `output.filename`*)

The name of the output file. If it is not specified, the `output.filename` and the `files` glob string file extension will be used as name. If the glob string doesn't have an extension, the name won't have one either:

```js
module.exports = {
    output: {
        path: "dist/",
        filename: "app.js"
    },
    plugins: [
        new ConcatTextPlugin({
            files: "res/**/*",
            outputPath: "static"
        })
    ]
}
```

The example above will generate a concatenated file `dist/static/app` (without a file extension) containing everything under `res/`. The output file won't have a file extension as well if the glob string matches multiple file types:

```js
module.exports = {
    output: {
        path: "dist/",
        filename: "app.js"
    },
    plugins: [
        new ConcatTextPlugin({
            files: "res/**/*.{txt,properties}",
            outputPath: "static"
        })
    ]
}
```

Some other examples would be `*.js?(x)` or `*.+(md|markdown)`. Basically, if the file extension is not exact, the output file won't have one.

So, if you want to explicitly set the file extension for the concatenated file while still matching multiple types, the `name` options needs to be set. However, in case you don't want to set a static file name and instead prefer to just use the `output.filename` option of your Webpack config, the **[name]** placeholder can be of help:

```js
module.exports = {
    output: {
        path: "dist/",
        filename: "app.js"
    },
    plugins: [
        new ConcatTextPlugin({
            files: "res/**/*.{md,markdown}",
            outputPath: "docs",
            name: "[name].md"
        })
    ]
}
```

#### `outputPath` (string, default: same as *Webpack `output.path`*)

Specify where the concatenated file should be placed, relative to the Webpack output path. You might also set it to an **absolute path**. Omitting this option will place the concatenated file at your Webpack output path.

```js
module.exports = {
    output: {
        path: "dist/",
        filename: "app.js"
    },
    plugins: [
        new ConcatTextPlugin({
            files: "res/**/*.md",
            name: "docs.md"
        })
    ]
}
```

The configuration seen above will write a markdown file `dist/docs.md` containing every markdown file it could find under the `res/` directory.

## Tests

There are some basic snapshot tests to assert the output of the loader.

```
npm test
```

## Publishing

To release a new version of this package, make sure to have the latest changes in the `master` branch, or at the very least, the changes that should be in a release.

1. Run `npm run release -- <new-version>` in `master`. This will create a new release commit and git tag, as well as adjust the version in the `package.json` and `package-lock.json`.

The underlying script uses `npm version` to edit the `package.json` files and to commit/tag the changes for the release with the specified version. Refer to the [npm documentation](https://docs.npmjs.com/cli/version) for more details.

2. Push the commit and tag to `master`
3. Create a new release on the GitHub [Releases Page](https://github.com/namics/webpack-concat-text-plugin/releases) and specify the existing tag

A GitHub Action will now test and publish the new release.

## License

[MIT](./LICENSE)

[npm-badge]: https://img.shields.io/npm/v/concat-text-webpack-plugin.svg
[npm-url]: https://npmjs.org/package/concat-text-webpack-plugin
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg
[license-url]: http://opensource.org/licenses/MIT
[deps-badge]: https://david-dm.org/namics/webpack-concat-text-plugin/status.svg
[deps-url]: https://david-dm.org/namics/webpack-concat-text-plugin
[ci-badge]: https://github.com/namics/webpack-concat-text-plugin/workflows/Build%20&%20Test/badge.svg
[ci-url]: https://github.com/namics/webpack-concat-text-plugin/actions?query=workflow%3A%22Build+%26+Test%22
[publish-badge]: https://github.com/namics/webpack-concat-text-plugin/workflows/Publish/badge.svg
[publish-url]: https://github.com/namics/webpack-concat-text-plugin/actions?query=workflow%3APublish
