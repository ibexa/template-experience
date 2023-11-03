/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module code-block/codeblock
 */
import { Plugin } from 'ckeditor5/src/core';
import CodeBlockEditing from './codeblockediting';
import CodeBlockUI from './codeblockui';
/**
 * The code block plugin.
 *
 * For more information about this feature check the {@glink api/code-block package page} and the
 * {@glink features/code-blocks code block feature guide}.
 *
 * This is a "glue" plugin that loads the {@link module:code-block/codeblockediting~CodeBlockEditing code block editing feature}
 * and the {@link module:code-block/codeblockui~CodeBlockUI code block UI feature}.
 */
export default class CodeBlock extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [CodeBlockEditing, CodeBlockUI];
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'CodeBlock';
    }
}
