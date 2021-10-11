import React from "react"
import Enzyme, { shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

import TransaksiPage from "../pages/Transaksi/TransaksiPage"

Enzyme.configure({ adapter: new Adapter() })

describe("TransaksiPage", () => {
  it("renders with Result", () => {
    const wrapper = shallow(<TransaksiPage />)
    expect(wrapper.find("Option").length).toBe(1)
    expect(wrapper.find("Option").prop("value")).toBe("Report")
  })

  // test("has a button", () => {
  //   const wrapper = shallow(<TransaksiPage />)
  //   expect(wrapper.find("Button")).toHaveLength(1)
  //   expect(wrapper.find("Button").text()).toEqual("Cari Agen")
  // })
  // test("renders modal when visible is true", () => {
  //   const props = { visible: true }
  //   const wrapper = shallow(<TransaksiPage {...props} />)
  //   wrapper.update()
  //   expect(wrapper.find(".searching-agent").exists()).toEqual(true)
  // })
})
