// import React, { useEffect } from "react";
// import Container from "@mui/material/Container";
// import PageHeader from "./../../components/PageHeader";
// import { useParams } from "react-router-dom";
// import Card from "../components/card/Card";
// import useCards from "../hooks/useCards";
// import Spinner from "../../components/Spinner";
// import Error from "../../components/Error";
// import { changeLikeStatus } from "../services/cardApiService";
// import Grid from "@mui/material/Grid";
// import { Divider } from "material-ui";
// import Typography from "@mui/material/Typography";

// const CardDetailsPage = () => {
//   const { cardId } = useParams();
//   const { value, handleGetCard, handleLikeCard } = useCards();
//   const { card, error, isLoading } = value;

//   useEffect(() => {
//     if (cardId) handleGetCard(cardId);
//   }, []);

//   if (isLoading) return <Spinner />;
//   if (error) return <Error errorMessage={error} />;
//   if (!isLoading && !card) return <p>No card to display...</p>;

//   if (!isLoading && card)
//     return (
//       <Container>
//         <PageHeader
//           title="Business Details"
//           subtitle="Here you can see details of the business"
//         />

//         <div>
//           <Card
//             onLike={() => {}}
//             card={card}
//             onDelete={(id) => console.log("you deleted card: " + id)}
//           />
//         </div>
//       </Container>
//     );
//   return null;
// };

// export default CardDetailsPage;

import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/card/Card";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { changeLikeStatus } from "../services/cardApiService";
import Grid from "@mui/material/Grid";
import Divider from "material-ui/Divider";
import Typography from "@mui/material/Typography";
import { Fab } from "@mui/material";
import ROUTES from "../../routes/routesModel";
import BizLocationMap from "../components/BizLocationMap";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const { value, handleGetCard, handleLikeCard } = useCards();
  const { card, error, isLoading } = value;

  useEffect(() => {
    if (cardId) handleGetCard(cardId);
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (!isLoading && !card) return <p>No card to display...</p>;

  if (!isLoading && card)
    return (
      <Container>
        <PageHeader
          title="Business Details"
          subtitle="Here you can see details of the business"
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={8} alignSelf="self-start">
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <img alt={card.image.alt} src={card.image.url} />
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">
                  BUSINESS NAME: {""}
                  <Typography gutterBottom variant="h6" component="span">
                    {""}
                    {`${card.title}`}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {`${card.subtitle}`}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  DESCRIPTION: {""}
                  <Typography gutterBottom variant="subtitle1" component="span">
                    {""}
                    {`${card.description}`}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  PHONE NUMBER: {""}
                  <Typography gutterBottom variant="subtitle1" component="span">
                    {""}
                    {`${card.phone}`}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  ADDRESS: {""}
                  <Typography gutterBottom variant="subtitle1" component="span">
                    {""}
                    {`${card.address.street} ${card.address.houseNumber} ${card.address.city}  ${card.address.zip}`}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  EMAIL: {""}
                  <Typography gutterBottom variant="subtitle1" component="span">
                    {""}
                    {`${card.email}`}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  WEB: {""}
                  <Typography gutterBottom variant="subtitle1" component="span">
                    {""}
                    {`${card.web}`}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  CARD NUMBER: {""}
                  <Typography gutterBottom variant="subtitle1" component="span">
                    {""}
                    {`${card.bizNumber}`}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  likes: {""}
                  <Typography gutterBottom variant="subtitle1" component="span">
                    {""}
                    {`${card.likes.length}`}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            md={4}
            sx={{
              display: { md: "flex", xs: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <BizLocationMap address={card.address} />
          </Grid>
        </Grid>
      </Container>
    );
  return null;
};

export default CardDetailsPage;
