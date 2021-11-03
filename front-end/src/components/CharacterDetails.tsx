import { useQuery } from "@apollo/client";
import Icon from "@mdi/react";
import { Col, Row } from "react-flexbox-grid";
import { useParams } from "react-router-dom";
import {
  Body2,
  Button,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardMedia,
  H6,
  IconButton,
  Spacer,
  Subtitle2,
} from "ui-neumorphism";
import { getCharacterDetails } from "../queries";
import { buildImageUrl } from "../utils";
import { ImageResolutions } from "../utils/buildImageUrl";
//import "../App.css";

const CharacterDetails = () => {
  const { id }: { id: string } = useParams();
  const options = {
    variables: { id },
  };

  const { loading, error, data } = useQuery(getCharacterDetails, options);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>{`Error! ${error.message}`}</div>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ textAlign: "center" }}>{data.character.name}</h2>

      <Row center="xs">
        <Col xs={6}>
          <ol>
            {data.character.comics.map((comic: any) => (
              <li>{comic.title}</li>
            ))}
          </ol>
          {data.character.description}
          <img
            style={{ height: 800 }}
            src={buildImageUrl(data.character.image, ImageResolutions.xl)}
            alt="the character"
          />
        </Col>
      </Row>
    </div>
    // <Card height={1000} width={400}>
    //   <CardHeader
    //     title={<H6>{data.character.name}</H6>}
    //     subtitle={<Subtitle2 secondary>Lorem ipsum dolor sit amet</Subtitle2>}
    //     action={
    //       <IconButton>
    //         {/* <Icon path={mdiDotsVertical} size={1}></Icon> */}
    //       </IconButton>
    //     }
    //   />
    //   <CardMedia
    //     dark
    //     src={buildImageUrl(data.character.image, ImageResolutions.xl)}
    //   />
    //   <CardContent>
    //     <Body2>{data.character.description}</Body2>
    //     {data.character.comics.map((comic: any) => (
    //       <Body2>{comic.title}</Body2>
    //     ))}
    //   </CardContent>
    //   <CardAction>
    //     <Button text color="var(--primary)">
    //       Read
    //     </Button>
    //     <Button text color="var(--primary)">
    //       Bookmark
    //     </Button>
    //     <Spacer />
    //     <IconButton>{/* <Icon path={mdiHeart} size={1}></Icon> */}</IconButton>
    //     <IconButton>
    //       {/* <Icon path={mdiShareVariant} size={1}></Icon> */}
    //     </IconButton>
    //   </CardAction>
    // </Card>
  );
};

export default CharacterDetails;
