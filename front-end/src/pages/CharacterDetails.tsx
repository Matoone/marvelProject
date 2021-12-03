import { useQuery } from "@apollo/client";
import { Row } from "react-flexbox-grid";
import { useParams } from "react-router-dom";
import { ProgressCircular } from "ui-neumorphism";
import CharacterDetailsCard from "../components/CharacterDetailsCard";
import { getCharacterDetails } from "../queries";
import { getCharacterDetails as getCharacterDetailsQuery } from "../queries/__generated__/getCharacterDetails";

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
      <Row center="xs" data-testid="loading">
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
  if (!data) {
    return <Row center="xs">{`Error!`}</Row>;
  }
  return CharacterDetailsCard(data.character);
};

export default CharacterDetails;
