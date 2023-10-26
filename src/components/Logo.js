import { Image } from "react-native";
import { Svg, Path } from "react-native-svg";

export default function Logo() {
  return (
    <Svg
      viewBox="0 0 36 36"
      height="50"
      width="50"
      fill="#FFFFFF"
    >
      <Path
        fill="#0866FF" 
        d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z">
      </Path>
      <Path
        file="#FFFFFF"
        d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z"
      ></Path>
    </Svg>
  );
}