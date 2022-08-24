import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function Category() {
  return (
    <div className="container pt-0">
      <Row>
        <Col lg="3" md="4">
          <div className="category__item d-flex align-items-center mt-4">
            <div className="category__img">
              <img src="category1.png" alt="category__item" />
            </div>
            <h6 className="mx-3"> Fastfood</h6>
          </div>
        </Col>
        <Col lg="3" md="4">
          <div className="category__item d-flex align-items-center mt-4">
            <div className="category__img">
              <img src="category2.png" alt="category__item" />
            </div>
            <h6 className="mx-3"> Pizza</h6>
          </div>
        </Col>
        <Col lg="3" md="4">
          <div className="category__item d-flex align-items-center mt-4">
            <div className="category__img">
              <img src="category3.png" alt="category__item" />
            </div>
            <h6 className="mx-3"> Asian food</h6>
          </div>
        </Col>
        <Col lg="3" md="4">
          <div className="category__item d-flex align-items-center mt-4 ">
            <div className="category__img">
              <img src="category4.png" alt="category__item" />
            </div>
            <h6 className="mx-3"> Raw Meat</h6>
          </div>
        </Col>
      </Row>
      <section className="mt-5 ">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
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
                <img src="service1.png" alt="feature-img" className="w-25 mb-3" />
                <h5 className="fw-bold mb-3">Quick Delivery</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quia, impedit?
                </p>
              </div>
            </Col>
            <Col lg-="4" md="4" className="mt-5">
              <div className="feature__item text-center px-5 py-3">
                <img src="service2.png" alt="feature-img" className="w-25 mb-3" />
                <h5 className="fw-bold mb-3">Super Dine In</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quia, impedit?
                </p>
              </div>
            </Col>
            <Col lg-="4" md="4" className="mt-5">
              <div className="feature__item text-center px-5 py-3">
                <img src="service3.png" alt="feature-img" className="w-25 mb-3" />
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
    </div>
  );
}
