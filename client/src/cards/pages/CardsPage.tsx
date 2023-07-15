import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import CardsFeedback from "../components/CardsFeedback";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import { Card } from "material-ui";
import CardInterface from "../models/interfaces/CardInterface";

// type CardsPageProps = {};
// const CardsPage: React.FC<CardsPageProps> = () => {}

// type filteredCards = CardInterface[];

const CardsPage = () => {
  const { value, handleGetCards, handleDeleteCard, handleLikeCard } =
    useCards();
  // const { filteredCards } = value;
  const { cards, error, isLoading, filteredCards } = value;

  useEffect(() => {
    handleGetCards();
  }, []);

  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetCards();
  };

  // const s = "";

  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="On this page you can find all business cards form all categories"
      />
      <CardsFeedback
        onLike={() => handleLikeCard}
        cards={filteredCards}
        error={error}
        isLoading={isLoading}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default CardsPage;
