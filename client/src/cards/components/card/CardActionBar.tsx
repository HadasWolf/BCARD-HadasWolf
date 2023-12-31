import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUser } from "../../../users/providers/UserProvider";
import CardDeleteDialog from "./CardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import handleLikeCard from "../../hooks/useCards";
import { string } from "joi";
import useCards from "../../hooks/useCards";

type CardActionBarProps = {
  cardId: string;
  cardUserId: string;
  onDelete: (id: string) => void;
  cardLikes: string[];
  onLike: () => void | boolean;
};

const CardActionBar = ({
  cardId,
  cardUserId,
  onDelete,
  cardLikes,
  onLike,
}: CardActionBarProps) => {
  const [isDialogOpen, setDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { handleLikeCard } = useCards();

  const handleDialog = (term?: string) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleDeleteCard = () => {
    handleDialog();
    onDelete(cardId);
  };

  const [isLiked, setLike] = useState(() => {
    if (user) return !!cardLikes.find((id: string) => id === user._id);
  });

  const handleLike = async () => {
    setLike((prev) => !prev);
    await handleLikeCard(cardId);
    onLike();
  };

  return (
    <>
      <CardActions
        disableSpacing
        sx={{ pt: 0, justifyContent: "space-between" }}
      >
        <Box>
          {user && (user._id === cardUserId || user.isAdmin) && (
            <IconButton
              aria-label="delete card"
              onClick={() => handleDialog("open")}
            >
              <DeleteIcon />
            </IconButton>
          )}

          {user && (
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              <FavoriteIcon color={isLiked ? "error" : "inherit"} />
            </IconButton>
          )}

          {user?._id === cardUserId && (
            <IconButton
              aria-label="edit card"
              onClick={() => navigate(`${ROUTES.EDIT_CARD}/${cardId}`)}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>

        <Box>
          <IconButton aria-label="call business">
            <CallIcon />
          </IconButton>

          {/* {user && (
            <IconButton
              aria-label="add to fav"
              onClick={() => console.log(`you liked card no: ${cardId}`)}
            >
              <FavoriteIcon />
            </IconButton>
          )} */}
        </Box>
      </CardActions>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeleteCard}
      />
    </>
  );
};

export default React.memo(CardActionBar);
