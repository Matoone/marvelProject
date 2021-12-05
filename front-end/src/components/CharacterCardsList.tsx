import { Col, Row } from "react-flexbox-grid";
import CharacterCard from "./CharacterCard";
import { getCharacters_characters } from "../queries/__generated__/getCharacters";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

export default function CharacterCardsList({
  characters,

  onLoadMore,
}: {
  characters: getCharacters_characters["characters"];
  onLoadMore: () => void;
}) {
  useEffect(() => {
    const hasVScroll =
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight;
    if (!hasVScroll) {
      onLoadMore();
    }
  });

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const isEnd =
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop <=
        document.documentElement.clientHeight + 100;
      console.log(isEnd);
      if (isEnd) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Row center="xs">
      <Col xs={10} className="Container">
        {characters.map((character, index) => (
          <CharacterCard
            key={`${character.id} ${index}`}
            character={{
              id: character.id,
              name: character.name,
              imageUrl: character.image,
            }}
          />
        ))}
      </Col>
    </Row>
  );
}
