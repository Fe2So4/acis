module.exports = {
  root: true,
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    'standard'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    __static: true
  },
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
