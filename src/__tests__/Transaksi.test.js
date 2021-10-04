import { screen, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import TransaksiPage from "../pages/Transaksi/TransaksiPage"

Enzyme.configure({ adapter: new Adapter() })

describe("TransaksiPage", () => {
  test("has a button", () => {
    const wrapper = shallow(<TransaksiPage />)
    expect(wrapper.find("Button")).toHaveLength(1)
    expect(wrapper.find("Button").text()).toEqual("Cari Agen")
  })
  test("renders modal when visible is true", () => {
    const props = { visible: true }
    const wrapper = shallow(<TransaksiPage {...props} />)
    wrapper.update()
    expect(wrapper.find(".searching-agent").exists()).toEqual(true)
  })
})
