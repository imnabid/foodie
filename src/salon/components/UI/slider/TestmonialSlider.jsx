import React from 'react'
import Slider from "react-slick";

const Testmonial = () => {
    const settings ={
        dots:true,
        autoplay:true,
        infinte:true,
        speed:1000,
      autoPlaySpeed:3000,
        swipeToSlide:true,
        sliderToShow:1,
        slidesToScroll:1
    }
  return (
    <Slider {...settings}>
    <div ><p className='review.text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, maxime?</p>
    <div className='d-flex align-items-center gap-3'><img src="ava1.jpg" alt="avatar" className='rounded' />
    <h6>Salon Gautam</h6>
    </div>
    </div>
    <div><p className='review.text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, maxime?</p>
    <div  className='d-flex align-items-center gap-3'><img src="ava2.jpg" alt="avatar" className=' rounded'  />
    <h6>Nabin Dhakal</h6>
    </div>
    </div>
    <div><p className='review.text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, maxime?</p>
    <div  className='d-flex align-items-center gap-3'><img src="ava3.jpg" alt="avatar" className=' rounded'  />
    <h6> Nischal Karki</h6>
    </div>
    </div>
 </Slider>
    
  )
}

export default Testmonial