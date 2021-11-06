import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  H6,
  ProgressLinear,
  Radio,
  RadioGroup,
} from "ui-neumorphism";
import { placesStatus, rules } from "../config/gameconfig";
import { useCharacter } from "../hooks";
import {
  CharacterWithPlace,
  Collect,
  Place,
  Stats,
  Status,
} from "../types/gameTypes";
import { buildImageUrl } from "../utils";

export default function GameCharacterCard({
  character,
}: {
  character: CharacterWithPlace;
}) {
  // All character logic and render loop is in this custom hook
  const { loopState, action } = useCharacter({
    onComplete: handleCharacterCollect,
  });
  const [stats, setStats] = useState<Stats>({ xp: 0, tire: 0, hp: 200 });

  function handleCharacterCollect({ xp = 0, tire = 0, hp = 0 }: Collect) {
    const newStats = {
      xp: stats.xp + xp,
      tire: stats.tire + tire,
      hp: stats.hp + hp,
    };

    setStats(newStats);
  }

  function handleChangeStatus(newStatus: Status) {
    if (!loopState || loopState.status !== newStatus) {
      action(newStatus);
    }
  }

  const characterStatusLabel = loopState
    ? rules[loopState.status].label
    : "idle";
  return (
    <div className="Hoverable">
      <Card className="SquadCard" width={160}>
        <CardHeader
          title={<H6 style={{ justifyContent: "center" }}>{character.name}</H6>}
          subtitle={<H6>{characterStatusLabel}</H6>}
        />
        <CardContent>
          <div>
            <span>xp: {stats.xp} </span>
            <span>tire: {stats.tire} </span>
            <span>hp: {stats.hp} </span>
            <ProgressLinear
              fillHeight
              height={8}
              value={loopState ? loopState.progress : 0}
            />
          </div>
          <RadioGroup
            vertical
            value={character.place}
            color="var(--primary)"
            onChange={(e: any) => {
              const val: Place = e.value;
              handleChangeStatus(placesStatus[val]);
            }}
          >
            {Object.values(Place).map((v) => (
              <Radio value={v} label={v} />
            ))}
          </RadioGroup>
          ;
        </CardContent>
        <CardMedia dark src={buildImageUrl(character.imageUrl)} height={160} />
      </Card>
    </div>
  );
}
