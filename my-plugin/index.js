import {rule} from './must-use-result.js'

const plugin = {
  meta: {
    name: 'my-plugin',
    version: '1.0.0',
  },
  rules: { 'must-use-result': rule },
}

export default plugin
