import { Box, Grid, Typography, Chip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import hero from "../../images/hero.png";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useState } from "react";
import { useEffect } from "react";

function Intro({categoryRef}) {
  const [servicehrs, setServicehrs] = useState();

  const scrollToCategories = ()=>{
    categoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center'});
  }

  useEffect(()=>{
    axiosInstanceGeneral.get('api/business-info/')
    .then(res=>setServicehrs(res.data.service_hrs))
    .catch(err=>console.log(err));
  },[])

  return (
    <Grid container sx={{mt:2}}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography
              component="span"
              variant="h5"
              color="error"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: 30, md: 40 },
              }}
            >
              GETTING HUNGRY?{" "}
            </Typography>
            <Typography
              component="span"
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: 30, md: 40 },
              }}
            >
              FOODIE
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <Typography
              component="span"
              variant="h5"
              color="error"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: 30, md: 40 },
              }}
            >
              delivers at{" "}
            </Typography>
            <Typography
              component="span"
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: 30, md: 40 },
              }}
            >
              your door
            </Typography>
          </Box>
        </Box>
        <Typography
          component="h6"
          variant="body2"
          sx={{
            width: { md: "70%" },
            textAlign: "center",
            color: "#36454F",
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry'book. It has survived not
          only five centuries, but also the leap
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Chip
            label={`OPENS ${servicehrs}`}
            sx={{
              borderRadius: "15px",
              fontSize: { md: 15 },
              fontWeight: "bold",
            }}
          />
          <Chip
            label="SEE ALL FOODS"
            onClick={scrollToCategories}
            color="error"
            icon={<KeyboardArrowDownIcon />}
            sx={{
              borderRadius: "15px",
              fontSize: { md: 15 },
              fontWeight: "bold",
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={0}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={hero}
          sx={{
            display:{xs:'none', md:'block'},
            width: 500,
            height:400,
            objectFit:'cover'
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Intro;
