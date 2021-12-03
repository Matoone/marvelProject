import { useEffect, useRef, useState } from "react";
import { frameDuration, rules } from "../config/gameconfig";
import { Collect, LoopState, Status } from "../types/gameTypes";

export function useInterval(callback: () => void, delay: number) {
  const savedCallback: React.MutableRefObject<null | (() => void)> =
    useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useCharacter({
  onComplete,
}: {
  onComplete: (obj: Collect) => void;
}) {
  const [loopState, setLoopState] = useState<LoopState | null>(null);
  useInterval(() => {
    if (loopState) {
      if (loopState.iterations) {
        setLoopState({
          ...loopState,
          iterations: loopState.iterations - 1,
          progress: Math.round(
            ((loopState.totalIterations - loopState.iterations) /
              loopState.totalIterations) *
              100
          ),
        });
      } else {
        const { collect } = rules[loopState.status];

        if (collect) {
          onComplete(collect());
        }

        const totalIterations = rules[loopState.nextLoopStatus].iterations();

        setLoopState({
          status: loopState.nextLoopStatus,
          iterations: totalIterations,
          totalIterations,
          nextLoopStatus: loopState.nextLoopStatus,
          progress: 0,
        });
      }
    }
  }, frameDuration);

  // This function handles changing character activity
  // It cuts the current loop by replacing with the new one
  async function action(newStatus: Status) {
    setLoopState({
      status: Status.move, // It will first set moving status
      iterations: rules.move.iterations(),
      totalIterations: rules.move.iterations(),
      nextLoopStatus: newStatus, // And there will be the next job after the move is complete
      progress: 0,
    });
  }

  return {
    loopState,
    action,
  };
}
