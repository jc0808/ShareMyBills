import Table from 'react-bootstrap/Table';
import OffcanvasTitle from "react-bootstrap/esm/OffcanvasTitle";
import Row from "react-bootstrap/Row";
import { useSelector } from 'react-redux';
import { selectBills } from './features/counter/householdSlice';
import { v4 as uuidv4 } from "uuid";
import { selectUser } from './features/counter/userSlice';

const BillsTable = ({ myAssignments }) => {

    const bills = useSelector(selectBills);
    const currentUser = useSelector(selectUser);

    console.log(bills)
    let count = 0;

    let USDollar = new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
    });

    const myAssignmentsList = bills?.filter(bill => {
        if (bill.assigned.uid === currentUser.uid) {
            return bill;
        };
    });



    const showMyAssignments = myAssignmentsList?.map(bill => {
        count += 1;
        return (
            <tr key={uuidv4()}>
                <td>{count}</td>
                <td>{bill.name}</td>
                <td>{USDollar.format(bill.amount)}</td>
                <td>01/09/2024</td>
                <td>{bill.assigned?.displayName}</td>
                <td>{bill.status}</td>
                <td></td>
            </tr>
        )
    });


    const tableBills = bills?.map(bill => {
        count += 1;
        return (
            <tr key={uuidv4()}>
                <td>{count}</td>
                <td>{bill.name}</td>
                <td>{USDollar.format(bill.amount)}</td>
                <td>01/09/2024</td>
                <td>{bill.assigned?.displayName}</td>
                <td>{bill.status}</td>
                <td></td>
            </tr>
        )
    });

    return (
        <Row className='mt-5'>

            <OffcanvasTitle>Your September Bills</OffcanvasTitle>



            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Due</th>
                        <th>Assigned</th>
                        <th>Status</th>
                        <th>ccc</th>
                    </tr>
                </thead>
                <tbody>
                    {myAssignments ? showMyAssignments : tableBills}
                </tbody>
            </Table>
        </Row>
    )
};

export default BillsTable;