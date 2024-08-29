import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from 'react-bootstrap/ProgressBar';
import "./DashBoard.css";
import BillsTable from "./BillsTable";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { selectCompletedTotal, selectTotalPrice } from "./features/counter/householdSlice";

const DashBoard = () => {

    const totalAmout = useSelector(selectTotalPrice);
    const completedTotal = useSelector(selectCompletedTotal);
    let USDollar = new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
    });

    const completedPercent = (completedTotal * 100) / totalAmout;

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col>
                        <label>{`${completedTotal === 0 ? 0 : Math.round(completedPercent)}% Complete`}</label>
                        <ProgressBar animated now={completedPercent} />
                        <label>{`${USDollar.format(completedTotal)} / ${USDollar.format(totalAmout)}`}</label>
                    </Col>
                </Row>

                <BillsTable myAssignments={true} />


            </Container>
        </>
    )
};

export default DashBoard;