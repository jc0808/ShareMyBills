import Container from "react-bootstrap/esm/Container";
import BillsTable from "./BillsTable";
import HouseholdMembers from "./HouseholdMembers";
import Row from "react-bootstrap/esm/Row";
import NavBar from "./NavBar";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import db from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/counter/userSlice";
import { addHousehold, addMembers, selectBills, selectKeyCode, selectMembers, selectTotalPrice, addBills, selectAllAssignedTrue } from "./features/counter/householdSlice";
import { addHouseholdId, selectHouseholdId } from "./features/counter/householdIdSlice";
import { v4 as uuidv4 } from "uuid";
import { alignPropType } from "react-bootstrap/esm/types";



const MyHousehold = () => {

    const currentUser = useSelector(selectUser);
    const keycode = useSelector(selectKeyCode);
    const currentHouseholdId = useSelector(selectHouseholdId);
    const bills = useSelector(selectBills);
    const members = useSelector(selectMembers);
    const totalPrice = useSelector(selectTotalPrice);
    const [screen, setScreen] = useState(0);
    const codeRef = useRef(null);
    const enableButton = useSelector(selectAllAssignedTrue);
    const [buttonCreate, setButtonCreate] = useState(enableButton);

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentHouseholdId !== null) {
            setScreen(1);
        }
    }, [currentHouseholdId])



    const joinGroup = () => {
        setScreen(2);

    };

    // console.log(currentUser);

    const createGroup = () => {
        const householdCollectionRef = collection(db, 'households');
        const newHousehold = {
            householdId: null,
            members: [],
            bills: [],
            KeyCode: null
        };

        addDoc(householdCollectionRef, newHousehold)
            .then(docRef => {
                const documentId = docRef.id;
                const householdRef = doc(db, 'households', `${documentId}`);
                newHousehold.members.push(currentUser);
                const updatedHouseholdDoc = {
                    ...newHousehold,
                    householdId: documentId,
                    members: newHousehold.members,
                    keyCode: uuidv4().slice(0, 8)
                };

                console.log(updatedHouseholdDoc);

                dispatch(addHousehold(updatedHouseholdDoc));
                dispatch(addHouseholdId(updatedHouseholdDoc.householdId));

                updateDoc(householdRef, updatedHouseholdDoc);
            })

        setScreen(1);
    };

    const onJoin = async (e) => {
        e.preventDefault();

        const querySnapshot = await getDocs(collection(db, 'households'));
        querySnapshot.forEach(async document => {
            if (document.data().keyCode === codeRef.current.value) {
                dispatch(addHousehold(document.data()));
                dispatch(addHouseholdId(document.data().householdId));
                dispatch(addMembers(currentUser));

                const householdCollectionRef = doc(db, 'households', document.data().householdId);

                await updateDoc(householdCollectionRef, {
                    members: [...document.data().members,
                        currentUser
                    ]
                });


            } else {
                console.error("Invalid Code");
            }
        });
    };

    const createAssignmets = async () => {
        let billsCopy = [
            ...bills
        ];
        const membersCount = members.length;
        const splitPrice = totalPrice / membersCount;
        const countTracking = [];

        members.forEach(member => {
            countTracking.push({
                ...member,
                total: 0,
            });
        })

        let count = 0;

        billsCopy = billsCopy.map(assignment => {
            count += 1;
            return {
                ...assignment,
                id: count

            };
        });

        console.log(countTracking);
        // console.log(assignments)'

        let assingments = [];

        let incrementTracking = (countTracking, billsCopy) => {
            countTracking = countTracking.map(trackMember => {
                if (trackMember.total < splitPrice) {
                    const bill = billsCopy.pop();
                    if (bill.assigned !== null) {
                        return;
                    }

                    assingments.push({
                        name: bill.name,
                        amount: bill.amount,
                        due: bill.due,
                        status: bill.status,
                        assigned: {
                            displayName: trackMember.displayName,
                            email: trackMember.email,
                            uid: trackMember.uid
                        }

                    });
                    return {
                        ...trackMember,
                        total: trackMember.total + bill.amount
                    }
                }
            });
            return countTracking, billsCopy;
        };

        while (billsCopy.length > 0) {
            incrementTracking(countTracking, billsCopy);
        }





        // bills.forEach(bill => {
        //     cont
        //     if (countTotal < splitPrice) {
        //         if (bill.assigned !== null) {

        //         }
        //     }
        // })




        dispatch(addBills(assingments))

        const householdCollectionRef = doc(db, 'households', currentHouseholdId);
        await updateDoc(householdCollectionRef, {
            bills: assingments
        })
        setButtonCreate(true);


    };



    return (
        <>
            <NavBar />
            <Container>

                {screen === 0 ?
                    <Row className="mt-5">
                        <Button variant="primary" className="mb-2" onClick={() => createGroup()}>Would you like to create your household group?</Button>{' '}
                        <Button variant="success" onClick={() => joinGroup()} >Would you like to join a household group?</Button>{' '}
                    </Row>

                    :
                    null

                }
                {screen === 1 ?
                    <>
                        <Row className="mt-5">
                            <h3>Share this code to someone you want to add to your household</h3>
                            <label className="font-weight-bold">{`Code to Join: ${keycode}`}</label>
                        </Row>

                        <HouseholdMembers />
                        <BillsTable />

                    </>
                    :
                    null
                }

                {screen === 2 ?
                    <>
                        <Row className="mt-5">
                            <h3>Enter the code to join</h3>
                            <Form onSubmit={onJoin}>
                                <Form.Label htmlFor="inputCode">
                                    <Form.Control
                                        type="text"
                                        id="inputCode" ref={codeRef} required />

                                    <Button type="submit">Join</Button>
                                </Form.Label>
                            </Form>

                        </Row>

                        <HouseholdMembers />
                        <BillsTable />

                    </>
                    :
                    null
                }

                {/* {screen === 3 ?
                    <>
                        <HouseholdMembers />
                        <BillsTable />
                    </>
                    :
                    null
                } */}

                <Container className="text-center mt-5">
                    <Button onClick={() => createAssignmets()} disabled={buttonCreate}> Create Assignments</Button>
                </Container>


            </Container>
        </>
    )
};


export default MyHousehold;