import React from "react";
import Slider from "react-slick";

const Testmonial = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinte: true,
    speed: 1000,
    autoPlaySpeed: 3000,
    swipeToSlide: true,
    sliderToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider">
    <Slider {...settings}>
        
      <div className="d-flex align-items-center gap-3">
        <img src="https://media.istockphoto.com/photos/beef-cheeseburger-on-black-plate-with-flames-in-background-picture-id1371431471?b=1&k=20&m=1371431471&s=170667a&w=0&h=I53raoVmACQjW7AGLHjgvAqKlOeM8OouCa4K2iloxC0=" alt="avatar" className="ava" />
      </div>

      <div className="d-flex align-items-center gap-3">
        <img src="https://media.istockphoto.com/photos/classic-burger-with-fries-horizontal-picture-id1185421185?k=20&m=1185421185&s=170667a&w=0&h=1rM1-x6F3tW54moyz3xoQbwiqJF4EGokEc3J3l3kz_o=" alt="avatar" className=" ava" />
      </div>

      
      
      <div>
        <img src="https://opt.toiimg.com/recuperator/img/toi/m-59756521/59756521.jpg&width=500&resizemode=4" alt="avatar" className=" ava" />
      </div>
      <div >
        <img src="https://thumbs.dreamstime.com/b/woman-hand-takes-slice-pepperoni-pizza-mozzarella-cheese-salami-tomatoes-pepper-spices-fresh-basil-italian-pizz-135064723.jpg" alt="avatar" className=" ava" />
      </div>
      <div >
        <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzc2VydHxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" className=" ava" />
      </div>
      <div >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTyaWxrLGFy6rIWMHcD7eMMopkxzVXJI4IQ&usqp=CAU" alt="" className="ava" />
      </div>
      
    </Slider>
 
    </div>
      
  );
};

export default Testmonial;
