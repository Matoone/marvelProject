import { useQuery } from "@apollo/client";
import { Col, Row } from "react-flexbox-grid";
import { H2, ProgressCircular } from "ui-neumorphism";
import CharacterCard from "../components/CharacterCard";
import { getCharacters } from "../queries";
import { getCharacters as getCharactersQuery } from "../queries/__generated__/getCharacters";

export default function Home() {
  const { loading, error, data } = useQuery<getCharactersQuery>(getCharacters);
  return loading ? (
    <Row center="xs">
      <ProgressCircular
        indeterminate
        size={64}
        width={8}
        color="var(--primary)"
      />
    </Row>
  ) : error ? (
    <Row center="xs">
      <div>{`Error! ${error.message}`}</div>
    </Row>
  ) : (
    <Row center="xs">
      <H2>Marvel characters</H2>
      <Col xs={10} className="Container">
        {data!.characters.map((character) => (
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
