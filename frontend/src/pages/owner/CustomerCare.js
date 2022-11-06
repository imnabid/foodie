import avatarpoole from "../utlis/avatarpoole.jpg";
import avatarsteph from "../utlis/avatarsteph.png";
import avatarklay from "../utlis/avatarklay.png";
import { Box, Pagination, Typography } from "@mui/material";
import ReviewCard from '../../components/owner/ReviewCard';

const CustomerCare = () => {
  return (
    <Box sx={{p:2, ml:{md:5}}}>      
      <Typography variant="h4" sx={{fontSize:{xs:25,md:35}}} >
        CUSTOMER <span style={{ color: "#f7c12c" }}>REVIEW WALL</span>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt:1,
          width: {xs:"100%",md:"60%"},
        }}
      >
        <ReviewCard
          title="Stephen Curry"
          value={5}
          content="Food was damn good baby!!"
          alt="Stephen Curry"
          src={avatarsteph}
        />

        <ReviewCard
          title="Klay Thompson"
          value={1}
          content="Food was good but the service was not upto the mark!"
          alt="Klay Thompson"
          src={avatarklay}
        />

        <ReviewCard
          title="Jordan Poole"
          value={3}
          content="The taste of your resturant food ruined my pool party!"
          alt="Jordan Poole"
          src={avatarpoole}
        />
        <Pagination count={10} shape="rounded" />
      </Box>
    </Box>
  );
};

export default CustomerCare;
