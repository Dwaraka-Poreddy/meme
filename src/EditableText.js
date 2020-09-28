import React, { useState, useRef, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import InputColor from "react-input-color";
// import Pricing from "./sections/PricingTemplate";

// import TextField from "@material-ui/core/TextField";

// const useStylesVerticalDividors = makeStyles((theme) => ({
//   root: {
//     margin: "0 auto",
//     width: "fit-content",
//     color: "inherit",
//     backgroundColor: "inherit",
//     borderColor: "inherit",
//     border: `1px solid ${theme.palette.divider}`,
//     borderRadius: theme.shape.borderRadius,
//     // backgroundColor: theme.palette.background.paper,
//     // color: theme.palette.text.secondary,
//     "& svg": {
//       margin: theme.spacing(0.0)
//     },
//     "& hr": {
//       margin: theme.spacing(0, 0)
//     }
//   }
// }));
const useStylesVerticalDividors = makeStyles((theme) => ({
  paper: {
    margin: "0 auto",
    width: "fit-content",
    color: "inherit",
    // backgroundColor: "inherit",
    // backgroundColor: theme.palette.background.paper,
    // borderColor: "inherit",
    // WebkitTextFillColor:"red",
    display: "flex",

    border: `3px solid `,
    borderRadius: theme.shape.borderRadius,
    "& svg": {
      margin: theme.spacing(0.0)
    },
    "& hr": {
      margin: theme.spacing(0, 0)
    }
  },
  divider: {
    margin: theme.spacing(0),
    background: "currentColor"
  },
  box: {
    height: "200px",
    width: "200px",
    background:
      "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)",
    // "linear-gradient(to bottom, #000066 0%, #ff6666 100%)",
    zIndex: 9999,
    // "linear-gradient(rgba(250,0,0,0.5),transparent)",

    backgroundColor: "red" /*this your primary color*/
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius
    }
  }
}))(ToggleButtonGroup);

const EditableInput = (props) => {
  // We use hooks to declare "initial" states
  const classesVerticalDividors = useStylesVerticalDividors();
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState(props.text);
  const [isMousedOver, setMouseOver] = useState(false);
  const [VD, setVD] = useState(false);
  const [isbold, SetIsBold] = useState(false);
  const [isItalic, SetIsItalic] = useState(false);
  const [isUnderLine, SetIsUnderLine] = useState(false);
  const [formats, setFormats] = useState("");
  const [incfont, SetIncFont] = useState(parseInt(props.fSize, 10));
  const [color, setColor] = React.useState({});
  const [angle, setAngle] = useState("0");

  // const [isEditable, setEditable] = useState(true);

  const transform = `rotate(${-angle}deg)`;

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  function handleClick() {
    // if (isEditable === true) {
    //   setInputVisible(true);
    //   setVD(true);
    // } else {
    setInputVisible(true);
    setVD(true);
    // }
  }

  function handleFormat(event, newFormats) {
    setFormats(newFormats);
  }

  function HandleBold() {
    SetIsBold(!isbold);
  }
  function HandleItalic() {
    SetIsItalic(!isItalic);
  }
  function HandleUnderLine() {
    SetIsUnderLine(!isUnderLine);
  }

  async function handleIncFont() {
    console.log("inc");
    await SetIncFont(incfont + 1);
    console.log(incfont);
  }

  function handleDecFont() {
    console.log("dec");
    SetIncFont(incfont - 1);
    console.log(incfont);
  }

  function onClickOutSide(e) {
    // Check if user is clicking outside of <input>
    if (
      inputRef.current &&
      // toggleLayerProps.isOpen &&
      !inputRef.current.contains(e.target)
    ) {
      setInputVisible(false);
      setMouseOver(false);
      setVD(false);
      // Disable text input
    }
  }

  useEffect(() => {
    // Handle outside clicks on mounted state
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    // This is a necessary step to "dismount" unnecessary events when we destroy the component
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });

  return (
    <React.Fragment>
      <div
        style={{
          fontWeight: isbold ? "bold" : "normal",
          fontStyle: isItalic ? "italic" : "normal",
          textDecoration: isUnderLine ? "underline" : "none",
          fontSize: incfont + "px",
          transform,
          color: color.hex
        }}
      >
        <div ref={inputRef}>
          {VD === true ? (
            <span>
              <Grid
                container
                alignItems="center"
                className={classesVerticalDividors.root}
              >
                <Paper elevation={0} className={classesVerticalDividors.paper}>
                  <StyledToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={(event, newFormats) =>
                      handleFormat(event, newFormats)
                    }
                    aria-label="text formatting"
                  >
                    <ToggleButton
                      value="bold"
                      aria-label="bold"
                      onClick={() => HandleBold()}
                    >
                      <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton
                      value="italic"
                      aria-label="italic"
                      onClick={() => HandleItalic()}
                    >
                      <FormatItalicIcon />
                    </ToggleButton>
                    <ToggleButton
                      value="underlined"
                      aria-label="underlined"
                      onClick={() => HandleUnderLine()}
                    >
                      <FormatUnderlinedIcon />
                    </ToggleButton>
                    <Divider
                      flexItem
                      orientation="vertical"
                      className={classesVerticalDividors.divider}
                    />
                  </StyledToggleButtonGroup>
                  <ToggleButton
                    style={{ border: "none" }}
                    value="incfont"
                    aria-label="underlined"
                    onClick={() => handleIncFont()}
                  >
                    <ZoomInIcon />
                  </ToggleButton>
                  <ToggleButton
                    style={{ border: "none" }}
                    value="incfont"
                    aria-label="underlined"
                    onClick={() => handleDecFont()}
                  >
                    <ZoomOutIcon />
                  </ToggleButton>
                  <Divider
                    flexItem
                    orientation="vertical"
                    className={classesVerticalDividors.divider}
                  />

                  <InputColor
                    className={classesVerticalDividors.box}
                    initialValue="null"
                    onChange={setColor}
                    placement="right"
                    autoAdjust="true"
                    style={{
                      zIndex: 9999,
                      margin: "auto",
                      display: "flex",
                      position: "relative",
                      height: "30px"
                    }}
                  />
                  <Divider
                    flexItem
                    orientation="vertical"
                    className={classesVerticalDividors.divider}
                  />
                  <input
                    class="number-wrapper"
                    style={{ width: "40px", border: "none", color: "inherit" }}
                    type="number"
                    value={angle}
                    onChange={(e) => {
                      if (e.target) {
                        setAngle(Number(e.target.value));
                        console.log(e.target.value);
                        console.log(Number(e.target.value));
                        console.log({ angle });
                      }
                    }}
                    placeholder="angle"
                  />
                </Paper>
              </Grid>
            </span>
          ) : null}

          {inputVisible ? (
            <InputBase
              multiline
              variant="outlined"
              fullWidth
              size="medium"
              style={{
                fontSize: "inherit",
                backgroundColor: "inherit",
                color: "inherit",
                border: "0.001px solid ",
                borderRadius: "5px"
              }}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          ) : (
            <span
              style={{
                border: isMousedOver ? "1.25px dashed " : null
              }}
              onMouseOver={() => handleMouseOver()}
              onMouseOut={() => handleMouseOut()}
              onClick={() => handleClick()}
            >
              {text}
            </span>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditableInput;
