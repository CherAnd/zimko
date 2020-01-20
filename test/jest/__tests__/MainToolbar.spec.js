/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { createLocalVue, mount } from '@vue/test-utils'
import MainToolbar from 'src/layouts/MainToolbar.vue'
import * as All from 'quasar'
import { User } from 'src/models/classes'
const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

const $store = {
  state: {
    user: new User()
  }
}
describe('MainToolbar', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = mount(MainToolbar, {
    localVue,
    mocks: {
      $store
    }
  })
  const vm = wrapper.vm



  it('correctly emitted drawer toggler', () => {
    const button = wrapper.find('#toggleleftdrawer')
    button.trigger('click')
    expect(wrapper.emitted().toggleleftdrawer).toBeTruthy()
  })

})
