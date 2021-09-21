import { createRootStore } from '../RootStore'
import PageUiStore from './'
import AnalyticsUtil from '@utilities/Analytics'

jest.mock('@store/configureMobx', () => ({
  configureMobx: jest.fn().mockImplementation(() => {}),
}))

describe('PageUiStore', () => {
  it('should call toggle if hideModal is called', () => {
    const store = new PageUiStore(createRootStore())
    const spyFn = jest.spyOn(store, 'toggleModal')
    store.hideModal()
    expect(spyFn).toBeCalledWith('')
  })

  it('should set visibility if setIsModalVisible is called', () => {
    const store = new PageUiStore(createRootStore())
    store.setIsModalVisible(true)
    expect(store.isModalVisible).toEqual(true)
  })
  it('should set voucher code if setVoucherCode is called', () => {
    const store = new PageUiStore(createRootStore())
    store.setVoucherCode('testVoucher')
    expect(store.voucherCode).toEqual('testVoucher')
  })
  it('should disable actions if setDisableActions is called', () => {
    const store = new PageUiStore(createRootStore())
    store.setDisableActions(true)
    expect(store.disableActions).toEqual(true)
  })
  it('should scroll to top if scrollTop is called', () => {
    global.scrollTo = jest.fn()
    const store = new PageUiStore(createRootStore())
    store.scrollTop()
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  describe('modal', () => {
    jest.useFakeTimers()

    it('should be hidden if no name is given', () => {
      const store = new PageUiStore(createRootStore())
      store.setIsModalVisible(true)
      store.toggleModal('')
      expect(store.isModalVisible).toBe(false)
      jest.advanceTimersByTime(500)
      expect(store.modalName).toEqual('')
    })
    it('should be opened if name is given', () => {
      const store = new PageUiStore(createRootStore())
      store.toggleModal('testModal')
      jest.advanceTimersByTime(0)
      expect(store.isModalVisible).toBe(true)
      expect(store.modalName).toEqual('testModal')
    })
    it('should call analytics if name is continueShopping', () => {
      const store = new PageUiStore(createRootStore())
      const trackMock = jest.spyOn(AnalyticsUtil, 'trackLink')
      store.toggleModal('continueShopping')
      jest.advanceTimersByTime(0)
      expect(trackMock).toBeCalled()
      expect(store.modalName).toEqual('continueShopping')
    })
    it('should reset modal name if toggleModal is called with empty name', () => {
      const store = new PageUiStore(createRootStore())
      store.setModalName('testModal')
      store.toggleModal('')
      jest.advanceTimersByTime(0)
      expect(store.modalName).toEqual('testModal')
      jest.advanceTimersByTime(500)
      expect(store.modalName).toEqual('')
    })
  })
})
