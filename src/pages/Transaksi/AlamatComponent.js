import React from "react";
import { Row, Col, Form, Input, Select } from "antd";

const { Option } = Select;

const DataAlamat = [
  {
    name: "Jawa Barat",
    kabupaten: [
      {
        name: "Kota Bandung",
        kecamatan: [
          "Coblong",
          "Lengkong Gudang",
          "Buahbatu",
          "Ujung Berung",
          "Antapani",
        ],
      },
      {
        name: "Bogor",
        kecamatan: ["Bojong Gede", "Ciawi", "Cibinong", "Cileungsi", "Cijeruk"],
      },
      {
        name: "Tasikmalaya",
        kecamatan: ["Bantarkalong", "Bojongasih", "Cibalong", "Cipatujah"],
      },
    ],
  },
  {
    name: "Jawa Tengah",
    kabupaten: [
      {
        name: "Grobogan",
        kecamatan: [
          "Brati",
          "Gabus",
          "Geyer",
          "Karangrayu",
          "Kradenan",
          "Purwodadi",
        ],
      },
      {
        name: "Kudus",
        kecamatan: ["Jekulo", "Kaliwungu", "Kudus", "Mejobo", "Undaan"],
      },
      {
        name: "Pekalongan",
        kecamatan: [
          "Bojong",
          "Buaran",
          "Karangayar",
          "Kedungwungi",
          "Lebakbarang",
        ],
      },
      {
        name: "Semarang",
        kecamatan: [
          "Ambarawa",
          "Bancak",
          "Bawen",
          "Banyubiru",
          "Bringin",
          "Getasan",
        ],
      },
    ],
  },
  {
    name: "Jawa Timur",
    kabupaten: [
      {
        name: "Kota Surabaya",
        kecamatan: ["Gubeng", "Kenjeran", "Tambaksari", "Tandes", "Wonokromo"],
      },
      {
        name: "Kota Malang",
        kecamatan: ["Blimbingan", "Kedungkandang", "Lowokwaru", "Sukun"],
      },
      { name: "Kota Madiun", kecamatan: ["Kartoharjo", "Manguharjo", "Taman"] },
      { name: "Kota Kediri", kecamatan: ["Kediri", "Mojoroto", "Pesantren"] },
      {
        name: "Banyuwangi",
        kecamatan: [
          "Pesanggaran",
          "Purwoharjo",
          "Muncar",
          "Genteng",
          "Glenmore",
          "Rogojampi",
        ],
      },
    ],
  },
  {
    name: "Bali",
    kabupaten: [
      {
        name: "Buleleng",
        kecamatan: ["Buleleng", "Gerokak", "Sawan", "Seririt", "Tejakula"],
      },
      {
        name: "Kota Denpasar",
        kecamatan: [
          "Denpasar Barat",
          "Denpasar Selatan",
          "Denpasar Timur",
          "Denpasar Utara",
        ],
      },
      {
        name: "Gianyar",
        kecamatan: ["Blahbatu", "Giayar", "Payangan", "Sukawati", "Ubud"],
      },
      {
        name: "Jembrana",
        kecamatan: ["Jembrana", "Melaya", "Negara", "Pekutaan"],
      },
      {
        name: "Tabanan",
        kecamatan: [
          "Baturiti",
          "Kerambitan",
          "Selemadeng Barat",
          "Selemadeng Timur",
          "Tabanan",
        ],
      },
    ],
  },
  {
    name: "Maluku",
    kabupaten: [
      {
        name: "Kota Ambon",
        kecamatan: ["Nusaniwe", "Sirimau", "Teluk Ambon", "Leitimur Selatan"],
      },
      {
        name: "Kota Tual",
        kecamatan: [
          "Pulau Dullah Utara",
          "Pulau Dullah Selatan",
          "Tayando Tam",
          "Pulau-Pulau Kur",
        ],
      },
      {
        name: "Buru",
        kecamatan: ["Namlea", "Air Buaya", "Waeapo", "Waplau", "Lolong Guba"],
      },
      {
        name: "Kepulauan Aru",
        kecamatan: ["Aru Selatan", "Aru Tengah", "Aru Utara"],
      },
    ],
  },
];

const AlamatComponent = (props) => {
  const [selectedProvinsi, setSelectedProvinsi] = React.useState(null);
  const [selectedKabupaten, setSelectedKabupaten] = React.useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = React.useState(null);

  const handleSelectedProvinsi = (value) => {
    setSelectedProvinsi(value);
  };

  const handleSelectedKabupaten = (value) => {
    setSelectedKabupaten(value);
  };

  const handleSelectedKecamatan = (value) => {
    setSelectedKecamatan(value);
  };

  const dataKabupaten = React.useMemo(() => {
    return (
      DataAlamat?.find((provinsi) => provinsi.name === selectedProvinsi)
        ?.kabupaten || []
    );
  }, [selectedProvinsi]);

  const dataKecamatan = React.useMemo(() => {
    return (
      dataKabupaten?.find((kabupaten) => kabupaten.name === selectedKabupaten)
        ?.kecamatan || []
    );
  }, [selectedKabupaten, dataKabupaten]);

  return (
    <Form name="basic" layout="horizontal">
      <Form.Item
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        labelAlign="left"
        label="Alamat Saat Ini"
        name="address"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Row justify="space-between" style={{ marginBottom: "10px" }}>
          <Col span={7}>
            <Select
              placeholder="Pilih Provinsi"
              onChange={handleSelectedProvinsi}
            >
              {DataAlamat.map((provinsi, index) => (
                <Option key={index.toString()} value={provinsi.name}>
                  {provinsi.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={7}>
            <Select
              placeholder="Pilih Kabupaten"
              onChange={handleSelectedKabupaten}
            >
              {dataKabupaten.map((kabupaten, index) => (
                <Option key={index.toString()} value={kabupaten.name}>
                  {kabupaten.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={7}>
            <Select
              placeholder="Pilih Kecamatan"
              onChange={handleSelectedKecamatan}
            >
              {dataKecamatan.map((kecamatan, index) => (
                <Option key={index.toString()} value={kecamatan}>
                  {kecamatan}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Input.TextArea value={props.value} onChange={props.onChangeAlamat} />
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AlamatComponent;
