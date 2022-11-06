import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { axiosInstanceGeneral } from '../../axios/axios'
import ModalWrapper from '../../components/ModalWrapper'
import AddOfferCard from '../../components/owner/AddOfferCard'
import { UserContext } from '../../GlobalContext'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddOfferModal = ({items,setItems, setShowModal})=>{
  const { setShowSnackBar } = useContext(UserContext);
  const [food, setFood] = useState({});
  const [foods, setFoods] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    axiosInstanceGeneral
      .get("api/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("custom err", err));
  }, []);

  useEffect(() => {
    setFood({}); //so that when category is changed item selection is reset
    if (category?.id) {
      axiosInstanceGeneral
        .get(`api/category-foods/${category.id}/`)
        .then((res) => {
          setFoods(res.data);
        })
        .catch((err) => console.log("custom err", err));
    }
  }, [category]);

  const handleCategoryChange = (event) => {
    const id = event.target.value;
    const category = categories.find((item) => item.id === id);
    setCategory(category);
  };

  const handleFoodChange = (event) => {
    const id = event.target.value;
    const food = foods.find((item) => item.id === id);
    setFood(food);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemAlreadyPresent = items?.find(i=>i.food.id===food.id)
    if(itemAlreadyPresent){
      setShowSnackBar({
        show: true,
          msg: "item has an existing offer",
          type: "error",
      })
      return;
    }
    
    axiosInstanceGeneral
      .post(
        "api/post-offers/",
        {
          food:food.id,
          discount_percent:e.target.discount.value
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setItems(prev=> [...prev, res.data]);

        setShowSnackBar({
          show: true,
          msg: "item added successfully",
          type: "success",
        });
        setShowModal(false)
      })
      .catch((err) => {
        console.log(err);
        setShowSnackBar({
          show: true,
          msg: "error occurred",
          type: "error",
        });
      })
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormControl
        sx={{ mt: 1 }}
        size="small"
      >
        <InputLabel id="demo-select-small">choose a category</InputLabel>
        <Select
          required
          fullWidth
          labelId="demo-select-small"
          id="demo-select-small"
          value={category?.id ? category?.id : ""}
          label="choose category"
          onChange={handleCategoryChange}
          MenuProps={MenuProps}
        >
          {categories?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>{item.category_name}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ mt: 1 }} size="small">
        <InputLabel id="demo-select-small">choose a food</InputLabel>
        <Select
          required
          fullWidth
          name='food'
          labelId="demo-select-small"
          id="demo-select-small"
          value={food?.id ? food?.id : ""}
          label="choose food"
          onChange={handleFoodChange}
          MenuProps={MenuProps}
        >
          {foods?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>{item.name}</Typography>
                <Typography>{item.price}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField required size="small" name="discount" fullWidth label="Discount Percent" />
      <Button type="submit" variant="contained" color="success" size="small">
        Save
      </Button>
    </Box>
  );
}


function AddOffers() {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(()=>{
    axiosInstanceGeneral.get('api/offers/')
    .then(res=>setItems(res.data))
    .catch(err=>console.log(err))
  },[])

  return (
    <Box sx={{ px: 2 }}>
      <Box sx={{ display: "flex",justifyContent:{xs:'center',md:'flex-start'}, gap: 2 }}>
        <Typography color="error" variant="h6">
          Edit offers
        </Typography>
        <Button
          variant="outlined"
          color="success"
          onClick={() => setShowModal(true)}
        >
          Add New
        </Button>
        <ModalWrapper
          show={showModal}
          setShow={setShowModal}
          setShowCombo={() => false} //dummy function
        >
          <AddOfferModal {...{setShowModal, items, setItems}}/>
        </ModalWrapper>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" },
          gap: 1.5,
        }}
      >
        {items.length?items.map((item) => (
          <AddOfferCard key={item.id} item={item} setItems={setItems}/>
        )):null}
      </Box>
    </Box>
  )
}

export default AddOffers