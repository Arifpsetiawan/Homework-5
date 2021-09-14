import React from "react";
import { Row, Col, Form, Button, Select, InputNumber } from "antd";
import AlamatComponent from "./AlamatComponent";
import useCreateTransaction from "../../Mutations/useCreateTransaction";
import NavbarComponent from "../../assets/components/navbar/NavbarComponent";
import { useHistory } from "react-router-dom";
import "./TransaksiPage.css";
const { Option } = Select;

const JenisTransaksi = [
  {
    key: "laku-pandai",
    value: "disabled",
    label: "Laku Pandai",
    isDisabled: true,
  },
  {
    key: "cash-in-out",
    value: "cash-in-&-out",
    label: "Cash-in & Out",
    isDisabled: false,
  },
  {
    key: "report",
    value: "report",
    label: "Report",
    isDisabled: false,
  },
  {
    key: "setoran-uang",
    value: "setoran-uang",
    label: "Setoran Uang",
    isDisabled: false,
  },
  {
    key: "tarik-tunai",
    value: "tarik-tunai",
    label: "Tarik Tunai",
    isDisabled: false,
  },
  {
    key: "isi-ulang-pulsa",
    value: "isi-ulang-pulsa",
    label: "Isi Ulang Pulsa",
    isDisabled: false,
  },
  {
    key: "belanja-merchant",
    value: "belanja-merchant",
    label: "Belanja Merchant",
    isDisabled: false,
  },
  {
    key: "tunai",
    value: "disabled",
    label: "Tunai",
    isDisabled: true,
  },
  {
    key: "setoran-pinjaman",
    value: "setoran-pinjaman",
    label: "Setoran Pinjaman",
    isDisabled: false,
  },
  {
    key: "setoran-simpanan",
    value: "setoran-simpanan",
    label: "Setoran Simpanan",
    isDisabled: false,
  },
  {
    key: "tarik-tunai-2",
    value: "tarik-tunai-2",
    label: "Tarik Tunai",
    isDisabled: false,
  },
  {
    key: "mini-atm-bri",
    value: "mini-atm-bri",
    label: "Mini ATM BRI",
    isDisabled: true,
  },
  {
    key: "registrasi-mobile-banking",
    value: "registrasi-mobile-banking",
    label: "Registrasi Mobile Banking",
    isDisabled: false,
  },
  {
    key: "registrasi-internet-banking",
    value: "registrasi-internet-banking",
    label: "Registrasi Internet Banking",
    isDisabled: false,
  },
  {
    key: "informasi-rekening",
    value: "informasi-rekening",
    label: "Informasi Rekening",
    isDisabled: false,
  },
  {
    key: "transfer-pembayaran",
    value: "transfer-pembayaran",
    label: "Transfer Pembayaran",
    isDisabled: false,
  },
  {
    key: "isi-ulang-pulsa-2",
    value: "isi-ulang-pulsa-2",
    label: "Isi Ulang Pulsa",
    isDisabled: false,
  },
  {
    key: "setor-pasti",
    value: "setor-pasti",
    label: "Setor Pasti",
    isDisabled: false,
  },
];

const TransaksiPage = () => {
  const history = useHistory();
  const [formState, setFormState] = React.useState({
    created_date: new Date().toString(),
    jenis_transaksi: "",
    nominal_transaksi: "",
    address: "",
    status: "0",
  });

  const { mutate } = useCreateTransaction(formState, (result) => {
    console.log("success mutation >> ", result);
    history.replace("/home");
  });

  const currencyParser = (val) => {
    try {
      // for when the input gets clears
      if (typeof val === "string" && !val.length) {
        val = "0.0";
      }

      // detecting and parsing between comma and dot
      var group = new Intl.NumberFormat("id-ID").format(1111).replace(/1/g, "");
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
      //  => 1232.21 €

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "");
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
      const needsDigitsAppended = digitsAfterDecimalCount > 2;

      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
      }

      return Number.isNaN(reversedVal) ? 0 : reversedVal;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className="formTransaksi" style={{ width: "100%" }}>
        <div style={{ width: "50%" }}>
          <Row style={{ width: "100%" }}>
            <Col span={24} style={{ paddingTop: "100px" }}>
              <Form style={{ width: "100%" }}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Jenis Transaksi"
                  name="Jenis Transaksi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Col>
                    <Select
                      placeholder="Pilih Jenis Transaksi"
                      onChange={(value) => {
                        setFormState({ ...formState, jenis_transaksi: value });
                      }}
                    >
                      {JenisTransaksi.map((option) => (
                        <Option key={option.key} value={option.value} disabled={option.isDisabled}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Nominal Transaksi"
                  name="Nominal Transaksi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Col>
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(value)
                      }
                      parser={currencyParser}
                      onChange={(value) => {
                        console.log("value >> ", value);
                        setFormState({
                          ...formState,
                          nominal_transaksi: value,
                        });
                      }}
                    />
                  </Col>
                </Form.Item>

                <AlamatComponent
                  value={formState.address}
                  onChangeAlamat={(event) => {
                    setFormState({ ...formState, address: event.target.value });
                  }}
                />
              </Form>
            </Col>
          </Row>
          <Row justify="center">
            <Button
              type="primary"
              className="searching-agent"
              style={{
                paddingRight: "15px",
                marginTop: "50px",
              }}
              onClick={mutate}
            >
              Cari Agen
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TransaksiPage;
