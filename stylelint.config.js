module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'extend',
          'variants',
          'responsive',
          'screen',
          'layer'
        ]
      }
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null
  }
}
