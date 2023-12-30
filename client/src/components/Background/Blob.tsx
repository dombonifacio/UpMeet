interface BlobProps {
  defaultWidth: string;
  defaultHeight: string;
  mediumWidth?: string;
  mediumHeight?: string;
  largeHeight?: string;
  largeWidth?: string;
  extraLargeHeight?: string;
  extraLargeWidth?: string;
  largeBrightness?: string;
  brightness: string;
  top?: string;
  colour: string;
  blur?: string;
  left?: string;
  bottom?: string;
  right?: string;
}

export const Blob = ({
  defaultWidth,
  defaultHeight,
  brightness,
  largeBrightness,
  colour,
  left,
  largeHeight,
  largeWidth,
  top,
  bottom,
  right,
}: BlobProps) => {
  return (
    <>
      <div
        className={`absolute ${top} ${bottom} ${left} ${right} w-${defaultWidth} h-${defaultHeight} lg:w-${largeWidth} lg:h-${largeHeight} ${colour} rounded-full filter blur-3xl brightness-${brightness} lg:brightness-${largeBrightness} `}
      ></div>
    </>
  );
};
// `absolute top-20 -left-4 w-96 h-96 lg:w-[45%] lg:h-[60%] bg-black rounded-full filter blur-3xl brightness-[0.5] lg:brightness-[0.4] `}></div>
