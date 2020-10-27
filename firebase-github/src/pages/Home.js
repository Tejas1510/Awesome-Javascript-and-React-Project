import React, { useState, useContext } from "react";
import Axios from "axios";

import {
  Row,
  Container,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

import UserCard from "../components/UserCard";
import Repos from "../components/Repos";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const Home = ()=>{

    const context= useContext(UserContext);
    const [query, setQuery] = useState('')
    const [user, setUser] = useState(null)

    const fetchdetails = async ()=>{
        try{
            const {data} = await Axios.get(`https://api.github.com/users/${query}`)
            setUser(data)
            console.log(data)
        }catch(err){
            toast("Unable to locate the user",{type:"error"})
        }
    }

    if(!context.user.uid){
        return(
            <Redirect to="/signin"></Redirect>
        )
    }
    return (
        <Container>
          <Row className=" mt-3">
            <Col md="5">
              <InputGroup>
                <Input
                  type="text"
                  value={query}
                  onChange={e=>setQuery(e.target.value)}
                  placeholder="Please provide the username"
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={fetchdetails}>Fetch User</Button>
                </InputGroupAddon>
              </InputGroup>
              {user ? (
                  <UserCard user={user}></UserCard>
              ):null}
            </Col>
            <Col md="7">
                {user ? (
                    <Repos repos_url={user.repos_url}></Repos>
                ):null}
            </Col>
          </Row>
        </Container>
      );
}

export default Home