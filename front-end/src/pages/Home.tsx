import { useQuery } from "@apollo/client";
import { Row } from "react-flexbox-grid";
import { H2, ProgressCircular, H5 } from "ui-neumorphism";
import { getCharacters } from "../queries";
import {
  getCharacters as getCharactersQuery,
  getCharacters_characters_characters,
} from "../queries/__generated__/getCharacters";
import CharacterCardsList from "../components/CharacterCardsList";
import SearchCharacterInput from "../components/SearchCharacterInput";
import { useCallback, useEffect, useState, useContext } from "react";
import { UserContext } from "../userContext";

export default function Home() {
  const [filteredCharacters, setFilteredCharacters] = useState<
    getCharacters_characters_characters[]
  >([]);
  const [nameText, setNameText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const { marvelMessage, setMarvelMessage } = useContext(UserContext);

  const { loading, error, data, fetchMore } = useQuery<getCharactersQuery>(
    getCharacters,
    {
      variables: {
        offset: 0,
        limit: 20,
        name: submittedText ?? undefined,
      },
    }
  );
  useEffect(() => {
    const filtered = data?.characters.characters.filter((character) =>
      character.name.includes(submittedText)
    );

    filtered && setFilteredCharacters(filtered);
  }, [nameText, submittedText, data?.characters.characters]);

  useEffect(() => {
    if (!marvelMessage && data?.characters?.marvelMessage && setMarvelMessage) {
      setMarvelMessage(data.characters.marvelMessage ?? "");
    }
  }, [marvelMessage, data, setMarvelMessage]);

  const onLoadMore = useCallback(
    () =>
      data &&
      fetchMore({
        variables: {
          offset: submittedText.length
            ? filteredCharacters.length
            : data.characters.characters.length,
          name: submittedText ?? undefined,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev ?? [];
          return Object.assign({}, prev, {
            characters: {
              characters: [
                ...(prev.characters?.characters ?? []),
                ...fetchMoreResult.characters.characters.filter(
                  (character) =>
                    !prev.characters.characters.some(
                      (el) => el.id === character.id
                    )
                ),
              ],
              hasMore: fetchMoreResult.characters.hasMore,
              marvelMessage: prev.characters?.marvelMessage,
            },
          });
        },
      }),

    [submittedText, fetchMore, data, filteredCharacters.length]
  );

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
    (data && (
      <>
        {marvelMessage && (
          <Row center="xs">
            <H5>{marvelMessage}</H5>
          </Row>
        )}
        <Row center="xs">
          <H2 style={{ marginBottom: 40 }}>Marvel characters</H2>
        </Row>
        <Row center="xs">
          <SearchCharacterInput
            nameText={nameText}
            setNameText={setNameText}
            onSubmit={() => setSubmittedText(nameText)}
          />
        </Row>
        <CharacterCardsList
          characters={
            submittedText.length && filteredCharacters.length
              ? filteredCharacters
              : data!.characters.characters
          }
          onLoadMore={onLoadMore}
        />
      </>
    )) ?? (
      <Row center="xs">
        <div>{`Error!`}</div>
      </Row>
    )
  );
}
