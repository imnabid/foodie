import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
} from "reactstrap";
// import Ouroffers from "../components/UI/slider/Ouroffers.jsx";
import {
  Grid,
  Box,
  Typography,
  Button,
  CardMedia,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Intro from "../components/home/Intro";
import Serve from "../components/home/Serve";
import Carousel from "../components/home/Carousel";
import Categories from "../components/home/Categories";
import ModalWrapper from "../components/ModalWrapper";
import ModalLg from "../components/home/ModalLg";
import ComboModal from "../components/home/ComboModal";
import ComboCollection from "../components/home/ComboCollection";

// import TestmonialSlider from "../components/UI/slider/TestmonialSlider.jsx";
// import Popular_categories from "./Popular_categories";

const displayCategories = [
  { name: "Asian Food", imgUrl: "Category1.png" },
  { name: "Thai Food", imgUrl: "Category2.png" },
  { name: "Chinese Food", imgUrl: "Category3.png" },
  { name: "Nepali Food", imgUrl: "Category4.png" },
];

export default function Home() {
  return (
    <Box sx={{ px: 5 }}>
      {/* <Intro /> */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Our{" "}
          <Typography variant="span" sx={{ color: "#df2020" }}>
            Offers
          </Typography>
        </Typography>

        <Carousel />
      </Box>
      
      <ComboCollection />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Food{" "}
          <Typography variant="span" sx={{ color: "#df2020" }}>
            Categories
          </Typography>
        </Typography>
        <Categories />
      </Box>
      <div>{/* <Popular_categories /> */}</div>
      <section className="mt-5 ">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h5 className="feature__subtitle mb-3">What we serve</h5>
              <h2>Just sit back at home</h2>
              <h2>
                we will <span className="feature__title">take care</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod,
                deleniti.
              </p>
              <p className="feature__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                debitis?
              </p>
            </Col>
            <Col lg-="4" md="4" className="mt-5">
              <div className="feature__item text-center px-5 py-3">
                <img
                  src="service1.png"
                  alt="feature-img"
                  className="w-25 mb-3"
                />
                <h5 className="fw-bold mb-3">Quick Delivery</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quia, impedit?
                </p>
              </div>
            </Col>
            <Col lg-="4" md="4" className="mt-5">
              <div className="feature__item text-center px-5 py-3">
                <img
                  src="service2.png"
                  alt="feature-img"
                  className="w-25 mb-3"
                />
                <h5 className="fw-bold mb-3">Super Dine In</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quia, impedit?
                </p>
              </div>
            </Col>
            <Col lg-="4" md="4" className="mt-5">
              <div className="feature__item text-center px-5 py-3">
                <img
                  src="service3.png"
                  alt="feature-img"
                  className="w-25 mb-3"
                />
                <h5 className="fw-bold mb-3">Easy Pick Up</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quia, impedit?
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <br />
      <br />
      <br />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" className="">
              <img src="location.png" alt="why-foodie" className="w-100" />
            </Col>
            <Col lg="6" md="6">
              <div className="why__foodie">
                <h2 className="foodie-title mb-4">
                  Why <span>Foodie?</span>
                </h2>
                <p className="foodie__desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Doloribus voluptates et iusto suscipit odio facilis minima
                  fugit? Iusto temporibus nisi delectus, autem amet ex tempora,
                  dignissimos ipsa id nam eos!
                </p>
                <ListGroup className="mt-5">
                  <ListGroupItem className="border-0 ps-0 ">
                    <p className=" choose__us-title d-flex align-items-center gap-2">
                      <span>
                        <CheckCircleIcon />
                      </span>
                      Fresh and tasty foods
                    </p>
                    <p className="check_list">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam, eaque.
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 ps-0 ">
                    <p className=" choose__us-title d-flex align-items-center gap-2">
                      <span>
                        <CheckCircleIcon />
                      </span>
                      Quality Support
                    </p>
                    <p className="check_list">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Maxime, nulla?
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 ps-0 ">
                    <p className="  choose__us-title d-flex align-items-center gap-2">
                      <span>
                        <CheckCircleIcon />
                      </span>
                      Order from and location
                    </p>
                    <p className="check_list mb-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Numquam, hic!
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <br /> <br />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial mt-5">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial_desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque aut, velit ipsam accusamus in odit dolore odio
                  expedita sequi impedit, placeat sint nulla distinctio eos
                  repellat maxime nesciunt quod necessitatibus.
                </p>
                {/* <TestmonialSlider /> */}
              </div>
            </Col>

            <Col lg="6" md="6">
              <img
                src="network.png"
                alt="testimonial-img"
                className="  w-100"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Box>
  );
}
