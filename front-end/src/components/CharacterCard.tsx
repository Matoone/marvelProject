import { Row } from "react-flexbox-grid";
import { Link, Route, useHistory } from "react-router-dom";
import { buildImageUrl, CharacterImageData } from "../utils/buildImageUrl";
import {
  Body2,
  Button,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardMedia,
  H5,
  H6,
  IconButton,
  Spacer,
  Subtitle2,
} from "ui-neumorphism";

interface Character {
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
