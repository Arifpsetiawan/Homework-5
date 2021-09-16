import React, { useCallback } from "react";
import { Row, Col, Button, Card, Typography, Spin, Space } from "antd";
import "./Home.css";
import NavbarComponent from "../../assets/components/navbar/NavbarComponent";
import { useAuthorizedContext } from "../../AuthorizedContext";
import useGetTransaction from "../../Query/useGetTransaction";
import useDeleteTransaction from "../../Mutations/useDeleteTransaction";
import moment from "moment";

const { Title, Text } = Typography;

const CardTransactionComponent = (props) => {
  const { mutate: deleteTransaction } = useDeleteTransaction(props.transaction.id, props.refetchTransactions);

  const handleCancelTransaction = useCallback(() => {
    // console.log("id transaction >> ", props.transaction.id);
    deleteTransaction();
  }, [deleteTransaction]);

  return (
    <Card title=" " style={{ width: "80vh" }}>
      <Row>
        <Col span={8} offset={3}>
          <Text>Waktu Request </Text>
        </Col>
        <Col span={13}>
          <Text>: {moment(new Date(props.transaction.created_date)).format("DD MMMM YYYY, hh:mm A")}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={3}>
          <Text>Jenis Transaksi</Text>
        </Col>
        <Col span={13}>
          <Text>: {props.transaction.jenis_transaksi} </Text>
        </Col>
      </Row>

      <Row>
        <Col span={8} offset={3}>
          <Text>Nominal Transaksi</Text>
        </Col>
        <Col span={13}>
          <Text>: Rp{props.transaction.nominal_transaksi} </Text>
        </Col>
      </Row>

      <Row>
        <Col span={8} offset={3}>
          <Text>Alamat Agen</Text>
        </Col>
        <Col span={13}>
          <Text>: {props.transaction.alamat_lengkap} </Text>
        </Col>
      </Row>

      <Row>
        <Col span={8} offset={3}>
          <Text>Status</Text>
        </Col>
        <Col span={13}>
          <Text>
            :{" "}
            {props.transaction.status === "0"
              ? "Menunggu konfirmasi agen"
              : props.transaction.status === "1"
              ? "Agen dalam perjalanan"
              : props.transaction.status === "2"
              ? "Dibatalkan agen"
              : props.transaction.status === "3"
              ? "Selesai"
              : "Error"}
          </Text>
        </Col>
      </Row>

      <Row>
        <Col offset={19}>
          <Button
            type="primary"
            style={{
              border: "none",
              marginTop: "2rem",
              backgroundColor: "#F03D3E",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
            onClick={handleCancelTransaction}
          >
            Batalkan
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

function Home() {
  const { isLoggedIn, userLevel } = useAuthorizedContext();
  console.log("value >> ", isLoggedIn, userLevel);
  const { data, isError, isLoading, refetch: refetchTransactions } = useGetTransaction();
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
            ) : data ? (
              data.map((transaction) => <CardTransactionComponent key={transaction.id} transaction={transaction} refetchTransactions={refetchTransactions} />)
            ) : (
              <Text>Gagal Memuat Data</Text>
            )}
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Home;
