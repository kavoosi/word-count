import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,     
  },
}));

function WordCount(props) {
  const [inputString, setInputString] = useState(null);
  const [highestCount, setHhighestCount] = useState({});
  const [wordCountArray, setWordCountArray] = useState([]);
  const classes = useStyles();
  const [value, setValue] = React.useState("1");
  const [input, setInput] = useState("file");
  const [err, setErr] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (inputString != null) setVariables();
  }, [inputString]);

  const goodString = (str) => {
    let goodStr = str
      .replaceAll(/\s\s+/g, " ")
      .replaceAll(/(\r\n|\r|\n)/g, " ")
      .replaceAll(/[^a-zA-Z ]/g, "")
      .toLowerCase();
    return goodStr;
  };

  // file
  const readFile = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = async (e) => {
      const file = e.target.result;
      const correctedString = goodString(file);
      setInputString(correctedString);
      correctedString.length > 0 ? setErr(0) : setErr(1);
      setInput("file");
    };
    reader.readAsText(e.target.files[0]);
  };

  // string
  const readString = () => {
    let correctedString = goodString(
      document.getElementById("input-string").value
    );

    setInputString(correctedString);
    setInput("string");
    correctedString.length > 0 ? setErr(0) : setErr(2);
  };

  const setVariables = () => {
    let wordArray = inputString.split(" ").filter((n) => n);
    let wordCount = {};

    for (let word of wordArray) {
      wordCount[word] ? wordCount[word]++ : (wordCount[word] = 1);
    }

    setWordCountArray(Object.entries(wordCount));

    if (Object.keys(wordCount).length > 0) {
      var max = Object.keys(wordCount).reduce((a, b) =>
        wordCount[a] > wordCount[b] ? a : b
      );
    }
    setHhighestCount([max, wordCount[max]]);
  };

  const showResult = () => {
    return wordCountArray ? (
      <>
        <div style={{ marginBottom: 25 }} />

        <MuiAlert severity="success">
          <span style={{ color: "#bf1010", fontWeight: "bold" }}>
            Highest Count ➟ {highestCount[0]}: {highestCount[1]}{" "}
          </span>
          {wordCountArray.map((arr) => {
            return (
              <div key={arr[0]}>
                <p style={{ fontSize: 16 }}>
                  {arr[0]}: {arr[1]}
                </p>
              </div>
            );
          })}
        </MuiAlert>
      </>
    ) : null;
  };

  return (
    <>
      <div className="App">
        <div className={classes.root}>
          <TabContext value={value}>
            <AppBar position="static">
              <TabList onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Upload a file" value="1" />
                <Tab label="Input a string" value="2" />
              </TabList>
            </AppBar>
            <TabPanel value="1">
              {/* Item One - File **************** */}
              <input
                accept=".txt"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={(e) => readFile(e)}
              />
              <label htmlFor="raised-button-file">
                <Button
                  component="span"
                  variant="contained"
                  color="secondary"
                  style={{ marginBottom: 20 }}
                >
                  Choose File
                </Button>
                {inputString && input === "file" ? showResult() : null}
              </label>

              {err === 1 ? (
                <Alert severity="error">Error: File is empty!</Alert>
              ) : null}
            </TabPanel>
            <TabPanel value="2">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                {/* Item 2 - String **************** */}
                <TextField
                  id="input-string"
                  label="Enter a string"
                  variant="outlined"
                  sx={{
                    width: { xs: 300, md: 600 },
                  }}
                  data-testid="custom-element"
                />
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{ marginLeft: 20, maxHeight: "40px" }}
                  onClick={(e) => readString(e)}
                >
                  Count Word
                </Button>
              </div>
              {inputString && input === "string" ? showResult() : null}
              {err === 2 ? (
                <Alert severity="error">
                  Invalid input: input can not be empty!
                </Alert>
              ) : null}
            </TabPanel>
          </TabContext>
        </div>

        <div style={{ padding: "0 24px" }}></div>
      </div>
    </>
  );
}

export default WordCount;