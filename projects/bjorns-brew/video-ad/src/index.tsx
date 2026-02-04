import { Composition, registerRoot } from "remotion";
import { BjornsBrewAd } from "./BjornsBrewAd";
import { BjornsBrewAdV2 } from "./BjornsBrewAdV2";
import { BjornsBrewAdV3 } from "./BjornsBrewAdV3";
import { BjornsBrewAdV2New } from "./BjornsBrewAdV2New";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* V1 - Original */}
      <Composition
        id="BjornsBrewAd"
        component={BjornsBrewAd}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BjornsBrewAdSquare"
        component={BjornsBrewAd}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
      {/* V2 - Agent-refined */}
      <Composition
        id="BjornsBrewAdV2"
        component={BjornsBrewAdV2}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BjornsBrewAdV2Square"
        component={BjornsBrewAdV2}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
      {/* V2New - Fresh assets + polished animations */}
      <Composition
        id="BjornsBrewV2New"
        component={BjornsBrewAdV2New}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BjornsBrewV2NewSquare"
        component={BjornsBrewAdV2New}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
      {/* V3 - Real photos + audio + fixed layout */}
      <Composition
        id="BjornsBrewAdV3"
        component={BjornsBrewAdV3}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BjornsBrewAdV3Square"
        component={BjornsBrewAdV3}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
