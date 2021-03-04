import { mount } from '@vue/test-utils'
import Main from '@/components/Main'

describe('Main.vue', () => {
  it('Test Display', async () => {
    const wrapper = mount(Main)
    await wrapper.setData({ display: 100 })
    const display = wrapper.find('#display').element.innerHTML
    expect(parseInt(display)).toBe(wrapper.vm.display)
    wrapper.destroy()
  })
})
