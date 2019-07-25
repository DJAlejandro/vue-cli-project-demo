module.exports = {
    root: true,
    env: {
        node: true,
        jquery: true

    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "quotes": [0, "double"], // 字符串必须使用双引号
        "indent": [2, 4], // 缩进4个空格
        "semi": 0, // 强制使用一致的分号
        "space-before-function-paren": 0, // 强制函数括号之前的空格的一致性
        "object-curly-spacing": 0, // 强制在对象字面量、解构赋值 和 import/export 说明符的花括号中使用一致的空格
        "comma-spacing": 0, // 强制在逗号周围使用空格 
        "space-in-parens": 0,
        "eol-last": 0,
        "standard/computed-property-even-spacing": 0,
        "vue/no-side-effects-in-computed-properties": 0
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    "globals": { //当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。可以使用注释或在配置文件中定义全局变量
        "document": true,
        "localStorage": true,
        "window": true,
        "jQuery": true,
        $: true,
        $$: true
    }
}
