// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    braceStyle: '1tbs'
  }
}, {
  rules: {
    'style/comma-dangle': ['error', 'never'],
    'jsonc/comma-dangle': ['error', 'never'],
    'vue/comma-dangle': ['error', 'never']
  }
})
