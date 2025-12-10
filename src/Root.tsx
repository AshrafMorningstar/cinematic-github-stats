/* Created by AshrafMorningstar - https://github.com/AshrafMorningstar */
import { Composition } from "remotion";
import { StatsScene } from "./Scenes/StatsScene";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="StatsComposition"
        component={StatsScene}
        durationInFrames={300}
        fps={30}
        width={1200}
        height={630}
      />
    </>
  );
};
