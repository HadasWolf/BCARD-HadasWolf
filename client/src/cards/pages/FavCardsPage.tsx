import { useCallback } from "react";
import useCards from "../hooks/useCards";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import CardsFeedback from "../components/CardsFeedback";
import React from "react";

const FavCardsPage = () => {
  const { value, ...rest } = useCards();
  const { isLoading, cards, error, filteredCards } = value;
  const { handleGetFavCards, handleDeleteCard } = rest;

  useEffect(() => {
    handleGetFavCards();
  }, []);

  const onDeleteCard = useCallback(
    async (cardId: string) => {
      await handleDeleteCard(cardId);
      await handleGetFavCards();
    },
    [handleDeleteCard]
  );

  const changeLikeStatus = useCallback(async () => {
    await handleGetFavCards();
  }, []);

  return (
    <Container>
      <PageHeader
        title="Favorite Cards Page"
        subtitle="In order to register, fill out the form and click the submit button"
      />

      <CardsFeedback
        cards={filteredCards}
        error={error}
        isLoading={isLoading}
        onLike={changeLikeStatus}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default FavCardsPage;
