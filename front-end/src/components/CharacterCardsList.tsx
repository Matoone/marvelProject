import { Col, Row } from "react-flexbox-grid";
import CharacterCard from "./CharacterCard";
import { getCharacters_characters } from "../queries/__generated__/getCharacters";

export default function CharacterCardsList({
  characters,
  onLoadMore,
}: {
  characters: getCharacters_characters["characters"];
  onLoadMore: () => void;
}) {
  return (
    <Row center="xs">
      <Col xs={10} className="Container">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
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
