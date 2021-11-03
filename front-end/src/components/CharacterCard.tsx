import { Row } from "react-flexbox-grid";
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
//import Icon from "@mdi/react";

const CharacterCard = ({ name }: { name: string }) => (
  <Card className="Card">
    <CardHeader
      title={
        <H6 style={{ justifyContent: "center", display: "flex" }}>{name}</H6>
      }
      subtitle={<Subtitle2 secondary>Lorem ipsum dolor sit amet</Subtitle2>}
      action={
        <IconButton>
          {/* <Icon path={mdiDotsVertical} size={1}></Icon> */}
        </IconButton>
      }
    />
    <CardMedia dark src="images/beaches-2.jpg" />
    <Row center="xs">
      <CardAction>
        <Button text color="var(--primary)">
          Read
        </Button>
        <Button text color="var(--primary)">
          Bookmark
        </Button>
        {/* <Spacer /> */}
        <IconButton>{/* <Icon path={mdiHeart} size={1}></Icon> */}</IconButton>
        <IconButton>
          {/* <Icon path={mdiShareVariant} size={1}></Icon> */}
        </IconButton>
      </CardAction>
    </Row>
  </Card>
);

export default CharacterCard;
