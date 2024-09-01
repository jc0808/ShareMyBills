import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from 'react-bootstrap/ProgressBar';
import "./DashBoard.css";
import BillsTable from "./BillsTable";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { selectCompletedTotal, selectTotalPrice } from "./features/counter/householdSlice";
import { useState } from "react";

const DashBoard = () => {

    const [totalAmount, setTotalAmount] = useState({
        totalCompleted: 0,
        totalOutOfCompleted: 0,
    });
    const completedTotal = useSelector(selectCompletedTotal);
    let USDollar = new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
    });

    const completedPercent = (completedTotal * 100) / totalAmount.totalOutOfCompleted;

    const getDashboardTotal = (total) => {

        setTotalAmount(total);
    };

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col>
                        <label>{`${completedTotal === 0 ? 0 : Math.round(completedPercent)}% Complete`}</label>
                        <ProgressBar animated now={completedPercent} />
                        <label>{`${USDollar.format(completedTotal)} / ${USDollar.format(totalAmount.totalOutOfCompleted)}`}</label>
                    </Col>
                </Row>

                <BillsTable myAssignments={true} getDashboardTotal={getDashboardTotal} />


            </Container>
        </>
    )
};

export default DashBoard;