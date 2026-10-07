import { YamahaMonochrome } from "./YamahaExplainer";
import React from "react";
import { Composition } from "remotion";
import { Attention } from "./Attention";
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="YamahaMonochrome"
      component={YamahaMonochrome}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={3846}
    />
    <Composition
      id="AttentionLandscape"
      component={Attention}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={368}
    />
  </>
);
