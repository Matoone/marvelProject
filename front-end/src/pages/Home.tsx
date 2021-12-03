import { useQuery } from "@apollo/client";
import { Col, Row } from "react-flexbox-grid";
import { H2, ProgressCircular } from "ui-neumorphism";
import { getCharacters } from "../queries";
import { getCharacters as getCharactersQuery } from "../queries/__generated__/getCharacters";
import CharacterCardsList from "../components/CharacterCardsList";

// const handleScroll = ({ currentTarget }, onLoadMore) => {
//   if (
//     currentTarget.scrollTop + currentTarget.clientHeight >=
//     currentTarget.scrollHeight
//   ) {
//     onLoadMore();
//   }
// };

export default function Home() {
  // const handleScroll = async (e: React.UIEvent<HTMLElement>) => {
  //   console.log("in handle scroll");
  //   // if div is at the bottom, fetch more posts
  //   if (
  //     e.currentTarget.scrollTop + e.currentTarget.clientHeight ===
  //     e.currentTarget.scrollHeight
  //   ) {
  //     // if there are no more posts to fetch, don't do anything
  //     if (!data?.characters?.hasMore) return;

  //     const moreCharacters = await fetchMore({
  //       variables: {
  //         offset: data!.characters.characters.length,
  //       },
  //     });

  //     console.log("moreCharacters", moreCharacters);

  //     return;
  //   }
  // };

  const { loading, error, data } = useQuery<getCharactersQuery>(getCharacters, {
    variables: {
      offset: 0,
      limit: 20,
    },
  });
  return loading ? (
    <Row center="xs" data-testid="loading">
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
    <div>
      <Row center="xs">
        <H2 style={{ marginBottom: 40 }}>Marvel characters</H2>
      </Row>
      <CharacterCardsList
        characters={data!.characters.characters}
        onLoadMore={() => {}}
      />
    </div>
  );
}
