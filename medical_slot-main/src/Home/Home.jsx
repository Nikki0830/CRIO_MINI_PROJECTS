import { Container, Box, Stack } from "@mui/material";
// import HeroSlider from "../components/HeroSlider/HeroSlider";
import HeroSlider from "../Component/HeroSlider/HeroSlider";
// import SearchHospital from "../Component/SearchHospital/SearchHospital";
import SearchHospital from "../Component/SearchHospital/SearchHospital";
// import FAQs from "../components/Sections/FAQs/FAQs";
import FAQs from "../Component/Sections/FAQs/FAQs";
// import OurFamilies from "../components/Sections/OurFamilies/OurFamilies";
import OurFamilies from "../Component/Sections/OurFamilies/OurFamilies";
// import Blogs from "../components/Sections/Blogs/Blogs";
import Blogs from "../Component/Sections/Blogs/Blogs";
import PatientCaring from "../Component/Sections/PatientCaring/PatientCaring";
import Specialists from "../Component/Sections/Specialists/Specialists";
import Specialization from "../Component/Sections/Specialization/Specialization";
import Offers from "../Component/Sections/Offers/Offers";
import NavBar from "../Component/NavBar/NavBar";
import HeroServices from "../Component/IconLayout/HeroService";

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          background:
            "linear-gradient(#E7F0FF , rgba(232, 241, 255, 0.47) 90%, #fff 10%)",
        }}
        mb={4}
      >
        <NavBar />
        <Container maxWidth="xl">
          <HeroSlider />
          <Stack
            p={{ xs: 2.5, md: 8 }}
            mt={{ xs: -2, md: 0, lg: -6, xl: -10 }}
            position="relative"
            zIndex={99}
            bgcolor="#fff"
            borderRadius="15px"
            spacing={10}
            boxShadow="0 0 12px rgba(0,0,0,0.1)"
          >
            <SearchHospital />
            <HeroServices />
          </Stack>
        </Container>
      </Box>

      <Offers />

      <Specialization />

      <Specialists />

      <PatientCaring />

      <Blogs />

      <OurFamilies />

      <FAQs />
    </Box>
  );
}
