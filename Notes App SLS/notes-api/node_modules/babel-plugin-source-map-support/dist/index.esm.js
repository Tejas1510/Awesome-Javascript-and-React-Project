import { addSideEffect } from '@babel/helper-module-imports'

const IMPORT = 'source-map-support/register'

export default function babelPluginSourceMapSupport () {
    return {
        visitor: {
            Program (path) {
                addSideEffect(path, IMPORT)
            }
        }
    }
}
