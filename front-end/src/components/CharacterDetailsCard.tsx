import { Col, Row } from "react-flexbox-grid";
import { getCharacterDetails_character as CharacterWithDetails } from "../queries/__generated__/getCharacterDetails";
import { buildImageUrl, ImageResolutions } from "../utils/buildImageUrl";

export default function CharacterDetailsCard(character: CharacterWithDetails) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      data-testid="data"
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        {character.name}
      </h2>

      <Row center="xs">
        <Col xs={8}>
          <div style={{ marginBottom: 10 }}>
            This character appears in {character.comics?.appearances} comics
            globally.
            {character?.comics?.appearances &&
            character.comics.appearances > 0 ? (
              <span> Here are the first three: </span>
            ) : null}
          </div>
          <div style={{ marginBottom: 10 }}>
            <ol>
              {character.comics?.items
                ? character.comics.items
                    .map((comic: any) => <li key={comic.name}>{comic.name}</li>)
                    .filter((_comic: any, index: number) => index <= 2)
                : null}
            </ol>
          </div>
          <div style={{ textAlign: "left", marginBottom: 20 }}>
            {character.description ?? ""}
          </div>
          <Row center="xs">
            <img
              style={{ height: 400 }}
              src={buildImageUrl(character.image, ImageResolutions.xl)}
              alt="the character"
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
