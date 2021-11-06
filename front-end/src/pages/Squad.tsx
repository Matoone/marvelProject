import "../App.css";
import { Col, Row } from "react-flexbox-grid";
import { H4 } from "ui-neumorphism";
import { useState } from "react";

import GameCharacterCard from "../components/GameCharacterCard";
import { CharacterWithPlace, Place } from "../types/gameTypes";

const baseSquadMembers = [
  {
    id: "1234",
    name: "Joe",
    imageUrl: {
      url: "http://truc.com",
      extension: "jpg",
    },

    place: Place.Home,
  },
  {
    id: "12345",
    name: "Joe",
    imageUrl: {
      url: "http://truc.com",
      extension: "jpg",
    },

    place: Place.Home,
  },
];

export default function Squad() {
  const [squadMembers, _setSquadMembers] =
    useState<CharacterWithPlace[]>(baseSquadMembers);

  return (
    <Row center={"xs"}>
      {
        <Col xs={10}>
          <H4 style={{ textAlign: "center" }}>Characters</H4>
          <Col style={{ minHeight: 200 }} className="PlaceContainer">
            {squadMembers.map((member) => (
              <GameCharacterCard character={member} />
            ))}
          </Col>
        </Col>
      }
    </Row>
  );
}
