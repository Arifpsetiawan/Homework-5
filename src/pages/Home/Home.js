import React, { Component } from "react";
import { Row, Col, Form, Input, Button, Card, Typography, Spin, Space} from "antd";
import "./Home.css";
import NavbarComponent from "../../assets/components/navbar/NavbarComponent";
import { useAuthorizedContext } from "../../AuthorizedContext";
import useGetTransaction from "../../Query/useGetTransaction";
import moment from "moment";

const { Title, Text } = Typography;

const CardTransactionComponent = (props) => {
  return (
    <Card title=" ">
      <Form style={{ marginLeft: "10%" }}>
        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Waktu Request </Text>
          </Col>
          <Col offset={0} style={{ width: "65%" }}>
            <Text>
              {" "}
              :{" "}
              {moment(new Date(props.transaction.created_date)).format(
                "DD MMMM YYYY"
              )}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Jenis Transaksi</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text>: {props.transaction.jenis_transaksi} </Text>
          </Col>
        </Row>

        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Nominal Transaksi</Text>
          </Col>
          <Col sstyle={{ width: "65%" }}>
            <Text> : {props.transaction.nominal_transaksi} </Text>
          </Col>
        </Row>

        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Alamat Agen</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text> : {props.transaction.address} </Text>
          </Col>
        </Row>

        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Status</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text>: {props.transaction.status}</Text>
          </Col>
        </Row>

        <div className="float-right">
          <Button
            type="primary"
            style={{
              margin: "0px",
              paddingRight: "15px",
              backgroundColor: "#F03D3E",
              fontWeight: "bold",
            }}
          >
            Batalkan
          </Button>
        </div>
      </Form>
    </Card>
  );
};

function Home() {
  const { isLoggedIn, userLevel } = useAuthorizedContext();
  console.log("value >> ", isLoggedIn, userLevel);
  const { data, isError, isLoading } = useGetTransaction();
  console.log("data >> ", isLoading, data);
  return (
    <div className="outer-home">
      <NavbarComponent />
      <div className="statusTransaksi">
        <div className="title">
          <Title>Transaksi Saat Ini:</Title>
        </div>
        <div className="resume">
          <Space direction="vertical">
            {isLoading ? (
              <Spin tip="Loading..."></Spin>
            ) : (
              data.map((transaction) => (
                <CardTransactionComponent
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            )}
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Home;
