import React, { Component } from "react";
import UserService from "../store/services/UserService";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import theatreImage from "../assets/theatre.avif";
import performanceImage from "../assets/performance.avif";
import ticketImage from "../assets/tickets.avif";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <CardGroup>
        <Card>
          <Link to={"/api/book"}>
            <Card.Img variant="top" src={theatreImage} />
            <Card.Body>
              <Card.Title>Knjige</Card.Title>
            </Card.Body>
          </Link>
        </Card>
        <Card>
          <Link to={"/api/publisher"}>
            <Card.Img variant="top" src={performanceImage} />
            <Card.Body>
              <Card.Title>Izdavaci</Card.Title>
            </Card.Body>
          </Link>
        </Card>
        <Card>
          <Link to={"/api/genre"}>
            <Card.Img variant="top" src={performanceImage} />
            <Card.Body>
              <Card.Title>Zanr</Card.Title>
            </Card.Body>
          </Link>
        </Card>
        <Card>
        <Link to={"/api/order"}>
          <Card.Img variant="top" src={ticketImage} />
          <Card.Body>
            <Card.Title>Narudzbine</Card.Title>
          </Card.Body>
          </Link>
        </Card>
      </CardGroup>
    );
  }
}
