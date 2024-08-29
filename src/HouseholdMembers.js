import Table from 'react-bootstrap/Table';
import OffcanvasTitle from "react-bootstrap/esm/OffcanvasTitle";
import Row from "react-bootstrap/Row";
import { useSelector } from 'react-redux';
import { selectMembers } from './features/counter/householdSlice';
import { selectUser } from './features/counter/userSlice';

const HouseholdMembers = () => {

    const members = useSelector(selectMembers);
    const currentUser = useSelector(selectUser);
    let count = 0;

    console.log(members);

    const tableMembers = members?.map(user => {
        count += 1;

        const isTrue = currentUser.uid === user.uid;

        return (
            <tr id={user.uid}>
                <td>{count}</td>
                <td>{`${user.displayName} ${isTrue ? '(YOU)' : ''}`}</td>
                {/* <td>{user.status}</td> */}
            </tr>
        )
    });

    return (
        <Row className='mt-5'>

            <OffcanvasTitle>Your Household Members</OffcanvasTitle>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        {/* <th>Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {tableMembers}
                </tbody>
            </Table>
        </Row>
    )
};

export default HouseholdMembers;