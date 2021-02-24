import React from "react";
import Axios from "axios";
import {
  InputLabel,Select, MenuItem, FormHelperText,
  Chip,
  Paper,
  Collapse,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Size from "../helpers/size";

const useStyles = makeStyles((theme) => ({
  copy: {
    marginBottom: theme.spacing(8),
    textAlign: "center",
  },
  typo: {
    margin: theme.spacing(7),
  },
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "green",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const FillProfil = (props) => {
  const initialValue = [{ validBio: undefined }]
  const [value, setValue] = React.useState('male')
  const [type, setType] = React.useState('women')
  const [biography, setBio] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [errTag, setErrTag] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(true);
  const [chipData, setChipData] = React.useState([]);
  const [dsbl, setDsbl] = React.useState(true);
  const [errMsg, setErrMsg] = React.useState(initialValue)
  const [age, setAge] = React.useState([])
  const [age1, setAge1] = React.useState('')
  const [active, setActive] = React.useState(false)

  
  const classes = useStyles(props);

  React.useEffect(() => {
    setAge(range(18, 60))
    props.checkSkip()
    active ? props.checkTotalImg() : props.checkFill()
  }, [props, active]);

  const fill = async (e, id, yes, no) => {
    e.preventDefault()
    await Axios.post(`base/tag/${id}`).then((res) => {
      for (var i = chipData.length - 1; i >= 0; i--) {
        for (var j = 0; j < res.data.length; j++) {
          if (chipData[i] && chipData[i].name === res.data[j].name)
            chipData.splice(i, 1);
        }
      }
    });
    
    await Axios.post(`base/profil/${id}`, {
      age: age1,
      gender: value,
      type: type,
      bio: biography,
      tag: chipData,
    })
      .then((res) => {
        // console.log(res)
        if (res.data.input)
          setErrMsg(res.data.input)
        else
          setErrMsg({ validBio: undefined, validTag: undefined })
        if (res.data.status) {
          setActive(true)
          yes()
        }else{
          setActive(false)
          no()
        }
      })
      .catch((error) => {})
  };

  const range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx)
  }

  const handelTag = (e) => {
    setTag(e.target.value);
    if (tag.match(/^#([A-Za-z0-9_]){3,25}$/) === null) {
      setErrTag("Enter a valid tag");
      setDsbl(true);
    } else {
      setErrTag("");
      setDsbl(false);
    }
  };

  const addToOption = (tag) => {
    if (errTag === "") {
      var id;
      Object.keys(chipData).length === 0
        ? (id = 1)
        : (id = chipData.slice(-1)[0].key + 1);
      chipData.push({ key: id, name: tag });
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  
  const handleChange = (event) => {
    setAge1(event.target.value)
  }

  return (
    <Size>
      <Container className={classes.copy} component='main' maxWidth='xs'>
        <Typography className={classes.typo} component='h1' variant='h5'>
          Fill profil
        </Typography>
        <div className={classes.paper}>
          <form
            method='POST'
            onSubmit={(event) =>
              fill(event, props.id, props.checkTotalImg, props.checkFill)
            }
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Biography'
                  multiline
                  rows={3}
                  variant='outlined'
                  value={biography}
                  onChange={(e) => setBio(e.target.value)}
                  helperText={errMsg.validBio}
                  error={errMsg.validBio !== undefined}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Collapse in={open}>
                  <TextField
                    label='Add New Tag'
                    multiline
                    variant='outlined'
                    value={tag}
                    onChange={(e) => handelTag(e)}
                    helperText={errTag}
                    error={errTag !== ''}
                  />
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                      setOpen(false)
                      setOpen1(true)
                      addToOption(tag)
                    }}
                    disabled={dsbl}
                  >
                    Add
                  </Button>
                </Collapse>
                <Collapse in={open1}>
                  <Button
                    disabled={open}
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                      setOpen(true)
                      setOpen1(false)
                    }}
                  >
                    New Tag
                  </Button>
                </Collapse>
                <Paper component='ul' className={classes.root}>
                  {chipData &&
                    chipData.map((data) => {
                      return (
                        <li key={data.key}>
                          <Chip
                            label={data.name}
                            onDelete={handleDelete(data)}
                            className={classes.chip}
                          />
                        </li>
                      )
                    })}
                  <Typography color='secondary'>
                    {chipData && errMsg.validTag}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  className={classes.formControl}
                  error={errMsg.validAge !== undefined}
                >
                  <InputLabel id='demo-simple-select-required-label'>
                    Age
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-required-label'
                    id='demo-simple-select-required'
                    value={age1}
                    onChange={handleChange}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {age.map((el, key) => {
                      return (
                        <MenuItem key={key} value={el}>
                          {el}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  <FormHelperText>{errMsg.validAge}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label='gender'
                    name='gender1'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    <FormControlLabel
                      value='women'
                      control={<Radio />}
                      label='Women'
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Male'
                    />
                    <FormControlLabel
                      value='other'
                      control={<Radio />}
                      label='Other'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>Sexual preferences</FormLabel>
                  <RadioGroup
                    row
                    aria-label='type'
                    name='type1'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <FormControlLabel
                      value='women'
                      control={<Radio />}
                      label='Women'
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Male'
                    />
                    <FormControlLabel
                      value='other'
                      control={<Radio />}
                      label='Other'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button type='submit' variant='outlined' className={classes.submit}>
              DONE
            </Button>
          </form>
        </div>
      </Container>
    </Size>
  )
};

export default FillProfil;
