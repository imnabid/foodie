import Carousel from "../components/home/Carousel";
import Categories from "../components/home/Categories";
import ComboCollection from "../components/home/ComboCollection";
import Intro from "../components/home/Intro";
import Offers from "../components/home/Offers";
import Footer from "../components/home/Footer";
import Testimonial from "../components/owner/Testimonial";
import { useContext } from "react";
import { UserContext } from "../GlobalContext";
import { useRef } from "react";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const { offerRef } = useContext(UserContext);
  const categoryRef = useRef(null)
  return (
    <>
      <Box sx={{ px: 5 }}>
        <Intro categoryRef={categoryRef} />
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Our{" "}
            <Typography variant="span" sx={{ color: "#df2020" }}>
              Services
            </Typography>
          </Typography>

          <Carousel />
        </Box>
        <Box ref={offerRef} sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Our{" "}
            <Typography variant="span" sx={{ color: "#df2020" }}>
              Offers
            </Typography>
          </Typography>

          <Offers />
        </Box>

        <ComboCollection />

        <Box ref={categoryRef} sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Food{" "}
            <Typography variant="span" sx={{ color: "#df2020" }}>
              Categories
            </Typography>
          </Typography>
          <Categories />
        </Box>

        <Testimonial />
      </Box>
      <Footer />
    </>
  );
}
