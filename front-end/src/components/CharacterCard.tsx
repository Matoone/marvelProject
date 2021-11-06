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
      className="Hoverable"
      onClick={() => history.push(`/characters/${character.id}`)}
    >
      <Card className="Card">
        <CardHeader
          title={
            <H6 style={{ justifyContent: "center", display: "flex" }}>
              {character.name}
            </H6>
          }
          subtitle={<Subtitle2 secondary>Lorem ipsum dolor sit amet</Subtitle2>}
        />
        <CardMedia dark src={buildImageUrl(character.imageUrl)} height={320} />
      </Card>
    </div>
  );
};

export default CharacterCard;
