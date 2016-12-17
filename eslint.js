/**
 * Created by prashun on 12/15/16.
 */
module.exports = {
    'parser': require.resolve('babel-eslint'),
    'extends': require.resolve('eslint-config-airbnb-base'),
    'rules': {
        'semi': ["error", 'always'],
        'max-len': [1, 400],
        'func-names': "off",
        'no-console': "off",
        'comma-dangle': "error",
        'prefer-template': "off",
        'import/no-unresolved': "off",
        'no-restricted-syntax': [
            "error",
            'DebuggerStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        'no-plusplus': "off",
        'no-continue': "off",
        'prefer-arrow-callback': "off",
        'class-methods-use-this': "off",
        'generator-star-spacing': "off",
        'space-before-function-paren': "off",
        'import/no-extraneous-dependencies': "off"
    },
    'env': {
        'node': true,
        'browser': true
    }
}