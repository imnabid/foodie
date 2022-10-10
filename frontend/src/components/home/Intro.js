import { Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import hero from "../../images/hero.png"
function Intro() {
  return (
    <Grid container>
      <Grid item md={6}>
        <div className="mt-5 hero__content">
          <h5 className="mb-3">Easy way to make an order</h5>
          <h1 className="mb-4 hero__title">
            <span>HUNGRY?</span> Just wait <br /> food at
            <span> your door</span>
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
            maxime quasi aliquam qui et harum eos sequi dignissimos. Dolorum,
            officiis. Fugit est quia atque cumque! Praesentium et neque rerum
            saepe!
          </p>
          <div className="hero__btns">
            <div className="hero__btns d-flex align-items-center gap-5 mt-4">
              <button className="order__btn d-flex align-items-center justify-content-between">
                Order now <ArrowForwardIosIcon className="p-1 mt-1" />
              </button>
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
          height: "550px;",
        }}
      />
    </Grid>
  );
}

export default Intro;
