import Container from "react-bootstrap/esm/Container";
import NavBar from "./NavBar";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBill, addBills, selectHousehold } from "./features/counter/householdSlice";
import { collection, updateDoc } from "firebase/firestore";
import { selectHouseholdId } from "./features/counter/householdIdSlice";
import db from "./firebase";
import { doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";


const AddBills = () => {

    const nameRef = useRef(null);
    const amountRef = useRef(null);
    const dueRef = useRef(null);

    const household = useSelector(selectHousehold);
    const householdId = useSelector(selectHouseholdId);
    const dispatch = useDispatch();

    console.log(household)

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(dueRef.current.value)



        const newBill = {
            id: uuidv4().slice(0, 8),
            name: nameRef.current.value,
            amount: amountRef.current.value,
            due: dueRef.current.value,
            assigned: null,
            status: 'unpaid'
        };



        const householdCollectionRef = doc(db, 'households', householdId);

        await updateDoc(householdCollectionRef, {
            bills: [...household.household.bills]
        });

        dispatch(addBill(newBill));


    };

    console.log(household)
    return (
        <>
            <NavBar />
            <Container className="mt-5">

                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm='2'>
                            Name
                        </Form.Label>
                        <Col sm='10'>
                            <Form.Control ref={nameRef} type="text" required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm='2'>
                            Amount
                        </Form.Label>
                        <Col sm='10'>
                            <Form.Control ref={amountRef} type="number" required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm='2'>
                            Due
                        </Form.Label>
                        <Col sm='10'>
                            <Form.Control ref={dueRef} type="date" required />
                        </Col>
                    </Form.Group>

                    <Container className="text-center mt-4">
                        <Button type="submit">Add Bill</Button>
                    </Container>
                </Form>
            </Container>
        </>
    )
};

export default AddBills;