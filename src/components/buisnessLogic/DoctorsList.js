import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useUserAuth} from "../../context/UserAuthContext";
import {Container, Navbar, Row, Col} from "react-bootstrap";
// import '../modal/taskManager.css'

import {
    collection,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    where,
    query
} from "firebase/firestore";
import {db} from '../../firebase';
import {Routes, Route, Outlet, NavLink} from 'react-router-dom';
import AddBook from "./AddBook";
import PacientDataService  from '../services/pacient.services' 
import BooksList from './BooksList'
import PacientsList from "./PacientsList";
import AddPacient from "./AddPacient";

const DoctorsList = () => {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [bookId, setBookId] = useState("");

    const getBookIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        setBookId(id);
    };


    const {logOut, user} = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };
 
    return (
      
        <>
            <div className='taskManager__container'>
                <button onClick={
                    () => setOpenAddModal(true)}>
                    Добавить Врача
                </button>
            </div>

        {
            openAddModal && <AddBook 
                id={bookId}
                setBookId={setBookId}
                onClose={
                    () => setOpenAddModal(false)
                }
                open={openAddModal}/>
                
        } 


       
            <Container>
                  

{/* 
                <Row>
                    <Col>
                        <BooksList getBookId={getBookIdHandler} id={bookId}
        />
                    </Col>
                </Row> */}
                </Container>

                <br />
                <br />
                {/* <div className='taskManager__container'>
                <button onClick={
                    () => setOpenAddModal(true)}>
                    Добавить Пациента
                </button>
            </div> */}

        {
            openAddModal && <AddPacient
                id={bookId}
                setBookId={setBookId}
                onClose={
                    () => setOpenAddModal(false)
                }
                open={openAddModal}/>
                
        } 

                <Container>
                  


                  <Row>
                      <Col>
                          <PacientsList getBookId={getBookIdHandler} id={bookId}
          />
                      </Col>
                  </Row>
                  </Container>
                {/* <Container>
                <Row>
                <Col>
                    <AddBook id={bookId} setBookId={setBookId} />
                </Col>
                </Row>
            </Container> */}


            {/* <DoctorsList/> */}


            <div className="d-grid gap-2">
                <Button variant="primary"
                    onClick={handleLogout}>
                    Log out
                </Button>

            </div>
        </>
    );


};

export default DoctorsList;

