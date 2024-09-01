import Table from 'react-bootstrap/Table';
import OffcanvasTitle from "react-bootstrap/esm/OffcanvasTitle";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from 'react-redux';
import { changeBills, selectBills, selectTotalPrice } from './features/counter/householdSlice';
import { v4 as uuidv4 } from "uuid";
import { selectUser } from './features/counter/userSlice';
import { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";

const BillsTable = ({ myAssignments, getDashboardTotal }) => {

    const bills = useSelector(selectBills);
    const currentUser = useSelector(selectUser);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useDispatch();


    let count = 0;

    let USDollar = new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
    });

    const myAssignmentsList = bills?.filter(bill => {
        if (bill.assigned?.uid === currentUser.uid) {
            return bill;
        };
    });

    useEffect(() => {
        let totalCompleted = 0;
        let totalOutOfCompleted = 0;

        myAssignmentsList?.forEach(bill => {
            totalOutOfCompleted += Number(bill.amount);
            if (bill.status === "unpaid") {
                totalCompleted += Number(bill.amount);
            }
        });




        if (myAssignments === true) {
            getDashboardTotal({
                totalCompleted: totalCompleted,
                totalOutOfCompleted: totalOutOfCompleted
            });
        }



    }, [bills])

    // const getDashboardTotal = () => {

    //     return dashboardTotal;
    // };

    const onChangeSelect = (e) => {
        // console.log(e.target[e.target.selectedIndex].id)
        dispatch(changeBills({
            status: e.target.value,
            id: Number(e.target[e.target.selectedIndex].id)
        }));
    };



    const showMyAssignments = myAssignmentsList?.map(bill => {
        count += 1;
        return (
            <tr key={uuidv4()}>
                <td>{count}</td>
                <td>{bill.name}</td>
                <td>{USDollar.format(bill.amount)}</td>
                <td>01/09/2024</td>
                <td>{bill.assigned?.displayName}</td>
                <td>
                    <Form.Select onChange={onChangeSelect} size="sm" style={bill.status === 'paid' ? { color: 'green' } : { color: 'red' }}>
                        <option id={bill.id} >{bill.status}</option>
                        <option id={bill.id}>{bill.status === 'unpaid' ? 'paid' : 'unpaid'}</option>
                    </Form.Select>
                </td>
                {/* <td>
                    <Form.Select size="sm">
                        <option>unpaid</option>
                        <option>paid</option>
                    </Form.Select>
                </td> */}
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
                <td>
                    <Form.Select size="sm" disabled style={bill.status === 'paid' ? { color: 'green' } : { color: 'red' }}>
                        <option>{bill.status}</option>
                        <option>{bill.status === 'unpaid' ? 'paid' : 'unpaid'}</option>
                    </Form.Select>
                </td>
                {/* <td>
                    <Form.Select size="sm">
                        <option>unpaid</option>
                        <option>paid</option>
                    </Form.Select>
                </td> */}
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
                        {/* <th>ccc</th> */}
                    </tr>
                </thead>
                <tbody>
                    {myAssignments ? showMyAssignments : tableBills}
                </tbody>
                <tfoot>
                    <td>Total: </td>
                    <td>{USDollar.format(totalPrice)}</td>
                </tfoot>
                <br></br>

            </Table>
        </Row>
    )
};

export default BillsTable;