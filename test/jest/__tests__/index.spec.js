/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'
import index from 'src/pages/index.vue'
import * as All from 'quasar'
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
    notes: []
  }
}
describe('index', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = shallowMount(index, {
    localVue,
    mocks: {
      $store
    }
  })
  const newNoteMock = sinon.stub()
  wrapper.setMethods({ newNote: newNoteMock })
  it('вызывается метод создания заметки', () => {
    const btn = wrapper.findAll('button')
    btn.at(0).trigger('click')
    expect(newNoteMock.called).toBe(true)
  })

})
