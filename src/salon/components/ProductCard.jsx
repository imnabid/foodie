import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CContainer } from "@coreui/react";
import TestmonialSlider from '../components/UI/slider/TestmonialSlider.jsx'


const ProductCard = () => {
  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col lg="12" md="3" sm="4" className="text-center">
              <h2>Popular Foods</h2>
            </Col>
            <Col lg="12" md="4" sm="6" xs="6" className="mb-4">
              <div className="food__category d-flex align-item-center justify-content-center gap-5 ">
                <button className="all__btn foodBtnActive ">All</button>
                <button className="d-flex align-item-center gap-2">
                  <img src="hamburger.png" alt="" />
                  Burger
                </button>
                <button className="d-flex align-item-center gap-2">
                  <img src="pizza.png" alt="" />
                  Pizza
                </button>
                <button className="d-flex align-item-center gap-2">
                  <img src="bread(1).png" alt="" />
                  Bread
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Container>
        <Row>
          <Col lg="3" md="4" className=" product__item mt-5">
            {" "}
            <div className="product__img">
              <img src="product1.1.jpg" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>Burger</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>

          <Col lg="3" md="4" className=" product__item mt-5">
            <div className="product__img">
              <img src="product2.1.jpg" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>Vegeterian Pizza</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="4" className=" product__item  mt-5">
            <div className="product__img">
              <img src="product3.1.jpg" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>Double Cheese Margherita</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="2" className=" product__item mt-5">
            <div className="product__img">
              <img src="momo.png" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>Momo</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="2" className=" product__item mt-5">
            <div className="product__img">
              <img src="khajaset.png" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>Khajaset</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="2" className=" product__item mt-5">
            <div className="product__img">
              <img src="product01.jpg" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>Chicken Burger</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="2" className="product__item mt-5">
            <div className="product__img">
              <img src="product2.1.jpg" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>Chicken chilli</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="2" className="product__item mt-5">
            <div className="product__img">
              <img src="hamburger2.png" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5> Ham Burger</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="2" className="product__item mt-5">
            <div className="product__img">
              <img src="product2.1.jpg" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>C Momo</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="2" className="product__item mt-5">
            <div className="product2.1.jpg">
              <img src="product2.1.jpg" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>Sekwa</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="2" className="product__item mt-5">
            <div className="product__img">
              <img src="product2.1.jpg" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5> Veg Biryani</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col lg="3" md="4" className="product__item mt-5">
            <div className="product__img">
              <img src="product2.1.jpg" alt="product-img" className="w-75" />
            </div>
            <div className="product__content"></div>
            <h5>Chicken Biryani</h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">Rs250</span>
              <button className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
        </Row>
      </Container>
      <br /> <br /><br /> <br /><br /><br /> <br />
      <section>
        <CContainer>
          <Row>
          <Col lg="6" md="6" className="mt-9">
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
                      </span>{" "}
                      Fresh and tasty foods{" "}
                    </p>
                    <p className="check_list">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam, eaque.
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 ps-0 ">
                    <p className=" choose__us-title d-flex align-items-center gap-2">
                      {" "}
                      <span>
                        <CheckCircleIcon />
                      </span>{" "}
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
        </CContainer>
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
              <p className="testimonial_desc" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque aut, velit ipsam accusamus in odit dolore odio expedita sequi impedit, placeat sint nulla distinctio eos repellat maxime nesciunt quod necessitatibus.</p>
   <TestmonialSlider/>
            </div>
          </Col>
         
            <Col lg="6" md="6">
              <img src="network.png" alt="testimonial-img" className="  w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ProductCard;
