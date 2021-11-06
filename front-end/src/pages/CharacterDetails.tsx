import { useQuery } from "@apollo/client";
import { Col, Row } from "react-flexbox-grid";
import { useParams } from "react-router-dom";
import { ProgressCircular } from "ui-neumorphism";
import { getCharacterDetails } from "../queries";
import { getCharacterDetails as getCharacterDetailsQuery } from "../queries/__generated__/getCharacterDetails";
import { buildImageUrl } from "../utils";
import { ImageResolutions } from "../utils/buildImageUrl";

const CharacterDetails = () => {
  const { id }: { id: string } = useParams();
  const options = {
    variables: { id },
  };

  const { loading, error, data } = useQuery<getCharacterDetailsQuery>(
    getCharacterDetails,
    options
  );

  if (loading)
    return (
      <Row center="xs">
        <ProgressCircular
          indeterminate
          size={64}
          width={8}
          color="var(--primary)"
        />
      </Row>
    );
  if (error) {
    console.log(error);
    return <Row center="xs">{`Error! ${error.message}`}</Row>;
  }
  return (
    (data && (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {data!.character.name}
        </h2>

        <Row center="xs">
          <Col xs={6}>
            <Col style={{ marginBottom: 10 }}>
              <span>
                This character appears in {data.character.comics?.appearances}{" "}
                comics globally.
              </span>
              {data.character?.comics?.appearances &&
              data.character.comics.appearances > 0 ? (
                <span> Here are the first three: </span>
              ) : null}
            </Col>
            <Col style={{ marginBottom: 10 }}>
              <ol>
                {data.character.comics?.items
                  ? data.character.comics.items
                      .map((comic: any) => (
                        <li key={comic.name}>{comic.name}</li>
                      ))
                      .filter((_comic: any, index: number) => index <= 2)
                  : null}
              </ol>
            </Col>
            {data.character.description ?? ""}
            <img
              style={{ height: 400 }}
              src={buildImageUrl(data!.character.image, ImageResolutions.xl)}
              alt="the character"
            />
          </Col>
        </Row>
      </div>
    )) || <Row>{`Error!`}</Row>
  );
};

export default CharacterDetails;
