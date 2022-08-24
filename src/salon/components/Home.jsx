import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { containerClasses } from "@mui/system";
import Ouroffers from '../components/UI/slider/Ouroffers.jsx'

export default function Home() {
  return (
    <div className="container">
      <section>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h5 className="mb-3">Easy way to make an order</h5>
              <h1 className="mb-4 hero__title">
                <span>HUNGRY?</span> Just wait <br /> food at{" "}
                <span> your door</span>
              </h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
                maxime quasi aliquam qui et harum eos sequi dignissimos.
                Dolorum, officiis. Fugit est quia atque cumque! Praesentium et
                neque rerum saepe!
              </p>
              <div className="hero__btns">
                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    Order now <ArrowForwardIosIcon className="p-1 mt-1" />
                  </button>
                  <button className="all__foods-btn">See all foods</button>
                </div>
              </div>

              <div className=" hero__service d-flex align-items-center gap-5 mt-5">
                <p className="d-flex align-items-center gap-2">
                  <span className="shipping__icon">
                    {" "}
                    <DirectionsCarIcon />
                  </span>{" "}
                  No shipping charge
                </p>
              </div>

              <div>
                <p className=" hero__service d-flex align-items-center gap-2">
                  <span className="shipping__icon">
                    <GppGoodIcon />
                  </span>{" "}
                  100% secure checkout
                </p>
              </div>
            </div>
          </Col>
          <Col lg="6" md="6">
            <div className="hero__img">
              <img src="hero.png" alt="hero-img" className="w-100" />
            </div>
          </Col>
        </Row>
      </section>
      <div className="offers"><h3> Our <span>Offers</span> </h3>
      <p>Get various special offers when ordering from Foodi.</p>
      <br /><br />
        <Ouroffers/>
        <br /><br /><br /><br /><br /></div>
      
    </div>
  );
}
