import { Row } from "react-flexbox-grid";
import { Link, Route, useHistory } from "react-router-dom";
import { buildImageUrl, CharacterImageData } from "../utils/buildImageUrl";
import { Card, CardHeader, CardMedia, H6, Subtitle2 } from "ui-neumorphism";

export interface Character {
  id: string;
  name: string;
  imageUrl: CharacterImageData;
}

const CharacterCard = ({ character }: { character: Character }) => {
  const history = useHistory();
  return (
    <div
      className="Hoverable CharCard"
      onClick={() => history.push(`/characters/${character.id}`)}
    >
      <Card className="Card" rounded>
        <CardHeader
          style={{ justifyContent: "center", display: "flex", height: 40 }}
          title={<H6>{character.name}</H6>}
        />
        <CardMedia dark src={buildImageUrl(character.imageUrl)} height={270} />
      </Card>
    </div>
  );
};

export default CharacterCard;
