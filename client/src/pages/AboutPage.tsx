import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import BodyTextHeader from "../components/BodyTextHeader";
import Divider from "@mui/material/Divider";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About Bcard"
        subtitle="Find businesses and services with the Bcard app"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
          The BCard App allows surfers to track all the registered businesses.
          It is a convenient way to search for businesses and services, as it
          allows users to filter their searches by keywords.
          <br />
          <br />
          Registering as a business allows you to create a business card and
          landing page. Through these tools, businesses can reach potential
          customers and increase their exposure to the service offered and
          attract more customers.
        </Grid>

        <Grid item xs={12} md={8} alignSelf="self-start">
          <Box>
            <Divider>
              <BodyTextHeader subtitle="How does it work?" />
            </Divider>
          </Box>
          <Box marginTop={4}>
            <BodyTextHeader subtitle="For users-" />
          </Box>
          <Box marginTop={1}>
            The main page shows the business cards of every registered business.
            By clicking on a card, you can view additional details about that
            business on its landing page. A registered user can save business
            cards in the favorite cards list by clicking the heart icon , and
            remove a card from the list by clicking it again. you can view that
            list of cards on the favorite cards page. This makes it easy for
            users to find exactly what they're looking for.
            <br />
            Clicking on the phone icon will present the business phone number.
          </Box>
          <Box marginTop={4}>
            <BodyTextHeader subtitle="For businesses-" />
          </Box>
          <Box marginTop={1}>
            A registered business can create a card using the app's template,
            including the main information about the business. The card will be
            presented on the main web page.
            <br />
            To create a new card, click the + icon, and fill out the form.
            <br />
            To edit an existing card, click the pen icon on that card
            <br /> Where do I sign in?
            <br />
            On the right side of the top navigation bar, you can find the
            sign-in/log-in button.
          </Box>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "right",
          }}
        >
          <img
            src="/assets/images/regular-user-card.jpg"
            alt="card"
            width="85%"
          />
        </Grid>

        <Grid item xs={12} md={8} alignSelf="self-start">
          <Box>
            <BodyTextHeader
              subtitle=" All you need to do is fill out the form, create your user/business
          user account, and enjoy our service"
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "right",
          }}
        >
          <img
            src="/assets/images/cxreateCardPage.PNG"
            alt="card"
            width="95%"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
