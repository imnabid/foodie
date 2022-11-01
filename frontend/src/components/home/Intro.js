import { Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import hero from "../../images/hero.jpg"
function Intro() {
  return (
    <Grid container>
      <Grid item md={6}>
        <div className="mt-5 hero__content">
          <h1 className="mb-4 hero__title">
            <span>WANNA EAT?</span> We <br /> provide foods
            <span> to your door</span>
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
            maxime quasi aliquam qui et harum eos sequi dignissimos. Dolorum,
            officiis. Fugit est quia atque cumque! Praesentium et neque rerum
            saepe!
          </p>
          <div className="hero__btns">
            <div className="hero__btns d-flex align-items-center gap-5 mt-4">
              <button className="all__foods-btn">See all foods</button>
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        item
        md={6}
        sx={{
          display: { xs: "none", md: "block" },
          backgroundImage: `url(${hero})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "300px;",
        }}
      />
    </Grid>
  );
}

export default Intro;
