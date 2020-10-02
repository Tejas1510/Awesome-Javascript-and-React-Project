"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtFromGlobPath = getExtFromGlobPath;
exports.globTextFiles = globTextFiles;
exports.getRelativeTargetPath = getRelativeTargetPath;
exports.mergeWithOutputOptions = mergeWithOutputOptions;
exports.default = exports.PLUGIN_NAME = void 0;

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

var _concat = _interopRequireDefault(require("concat"));

var _webpackSources = require("webpack-sources");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PLUGIN_NAME = "ConcatTextPlugin";
exports.PLUGIN_NAME = PLUGIN_NAME;
const REGEXP_PLACEHOLDERS = /\[(name)\]/g;
/**
 * Extract a file extension from a glob path.
 * If multiple file types are being matched by the glob
 * (e.g. `*.{txt,properties}` or `*.ts?(x)`), an empty
 * string will be returned.
 *
 * @param {string} globPath The glob path from which to extract a file type extension.
 * @returns {string} The extracted extension. Can be an empty string.
 */

function getExtFromGlobPath(globPath) {
  const extname = _path.default.extname(globPath);

  return _glob.default.hasMagic(extname) ? "" : extname;
}
/**
 * Async function to `glob` files.
 *
 * @param {string} globPath The glob path.
 * @returns {Promise<string[]>} An Array of globbed files.
 */


async function globTextFiles(globPath) {
  return new Promise((resolve, reject) => {
    (0, _glob.default)(globPath, (er, files) => {
      if (er) {
        reject(er);
      }

      resolve(files);
    });
  });
}
/**
 * Gets the concatenation target location as a relative path based on the
 * `startingPath` (Webpacks `output.path`) and the configured `outputPath`.
 * If the `outputPath` is already a relative path, we'll just return it.
 * Otherwise, if it is an absolute path, we determine its location as a
 * path relative to the `startingPath`.
 *
 * @param {string} startingPath The absolute starting path.
 * @param {string} outputPath The absolute or relative output path.
 * @returns {string} The relative target path.
 */


function getRelativeTargetPath(startingPath, outputPath) {
  return _path.default.isAbsolute(outputPath) ? _path.default.relative(startingPath, outputPath) : outputPath;
}
/**
 * Merges the passed plugin options with defaults based on the
 * Webpack compiler's `output` options, like `output.filename` and `output.path`.
 *
 * @param {{ filename: string, path: string }} outputOptions The webpack compiler instance.
 * @param {{ files: string, outputPath: string, name: string }} options The options object.
 * @returns {{ files: string, outputPath: string, name: string }} options The merged options object.
 */


function mergeWithOutputOptions({
  filename,
  path: outputPath
}, options) {
  const basename = _path.default.basename(filename, _path.default.extname(filename));

  const extname = getExtFromGlobPath(options.files);
  const defaultOptions = {
    outputPath,
    name: basename + extname
  };

  if (options.name && REGEXP_PLACEHOLDERS.test(options.name)) {
    options.name = options.name.replace(REGEXP_PLACEHOLDERS, basename);
  }

  return Object.assign({}, defaultOptions, options);
}
/**
 * The `ConcatTextPlugin` for Webpack to concatenate
 * text files into a single one.
 */


class ConcatTextPlugin {
  /**
   *
   * @param {{ files: string, outputPath: string, name: string }} options The options object.
   */
  constructor(options) {
    this.options = options;
  }
  /**
   * Concatenates all the text files that we could glob into a
   * single file located at `this.options.target`.
   *
   * @param {webpack.Compilation} compilation The Webpack compilation object.
   * @param {string} target The target path (including filename) of the concatenated asset.
   * @returns {Promise} Rejected Error.
   */


  emitText(compilation, target) {
    return new Promise(async (resolve, reject) => {
      try {
        const files = await globTextFiles(this.options.files);
        const result = await (0, _concat.default)(files);
        compilation.assets[target] = new _webpackSources.RawSource(result);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   *
   * @param {webpack.Compiler} compiler The Webpack compiler instance.
   * @returns {void}
   */


  apply(compiler) {
    this.options = mergeWithOutputOptions(compiler.options.output, this.options);
    compiler.hooks.emit.tapPromise(PLUGIN_NAME, compilation => {
      const target = _path.default.join(getRelativeTargetPath(compiler.options.output.path, this.options.outputPath), this.options.name);

      return this.emitText(compilation, target);
    });
  }

}

exports.default = ConcatTextPlugin;