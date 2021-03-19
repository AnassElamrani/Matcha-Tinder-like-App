import React from 'react'
import Axios from 'axios'
import Size from '../helpers/size'
import { Grid, Card, CardMedia } from '@material-ui/core'
import { Button, Dialog, DialogActions, DialogTitle, Collapse } from '@material-ui/core';
import {Alert} from '@material-ui/lab'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from '@material-ui/core/styles'
import { IoMdAddCircle } from 'react-icons/io'
import { useEffect } from 'react'
// import AlertDialoge from './alertDialog'
import IdContext from "../../start/IdContext"

const intialItems = [
  {
    id: '0',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
  {
    id: '1',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
  {
    id: '2',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
  {
    id: '3',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
  {
    id: '4',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
]
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 600,
    width: 400,
  },
  big: {
    position: 'relative',
    backgroundColor: '#E0E4E9',
    width: '200px',
    height: '300px',
    borderRadius: '10px',
    border: '2px solid white',
  },
  addCircle: {
    position: 'absolute',
    right: '4px',
    top: '4px',
    color: 'pink',
    width: '40px',
    height: '40px',
  },
  media1: {
    width: '200px',
    height: '300px',
  },
}))

const MyAddImages = (props) => {
  const classes = useStyles()
  const [Items, UpdateItems] = React.useState(intialItems)
  const imageRefs = React.useRef([])
  const [ProfileImg, SetProfileImg] = React.useState(null)
  const ProfImgRef = React.useRef(null)
  const [effect, triggerEffect] = React.useState(false)
  const [printImages, setprintImages] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [keyIndex, setKeyIndex] = React.useState()
  const [didMount, setDidMount] = React.useState(false)
  const [errors, setErrors] = React.useState("");
  const [msg, setNewMsg] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const [statusTrue, setStatusTrue] = React.useState(false);
  const globalId = React.useContext(IdContext)

  const handleClickOpen = (index) => {
    setKeyIndex(index)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  }

  imageRefs.current = []

  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el)
    }
  }

  // display images inside dragar

  React.useEffect(() => {
    Axios.post(`/base/displayIndrager/${globalId}`).then((res) => {
      if (!printImages.length && res.data.images[0] !== null){
        setprintImages(res.data.images[0].split(','))
      }
    })
  }, [globalId, printImages])
  
  React.useEffect(() => {
    if (printImages !== ""){
        var tmp = Items
        printImages.map((el, iKey) => {
          let srcImg = `http://localhost:3001/${el}`
          if (iKey === 0) {
            SetProfileImg(srcImg)
          }
          if (srcImg != null) {
            tmp[iKey].value = srcImg
            UpdateItems(tmp)
            const gridId = imageRefs.current[iKey].id + 'img'
            const grid = document.getElementById(gridId)
            grid.style.background = 'url(' + srcImg + ')'
            grid.style.backgroundSize = '200px 300px'
          }
          return '';
      })
    }
  }, [Items, printImages])

  // display of images

  const displayProfileImg = React.useCallback(() => {
    if (ProfileImg != null) {
      var ProfileImgDiv = ProfImgRef.current
      ProfileImgDiv.style.background = 'url(' + ProfileImg + ')'
      ProfileImgDiv.style.backgroundSize = '400px 600px'
    }
  }, [ProfileImg])

  useEffect(() => {
    displayProfileImg()
    // haya erreur dial zab 
    Axios.post(`base/img/dnd1/${globalId}`) // index stuff
  }, [displayProfileImg, globalId])

  //////////////////////////

  // count of images

  const fetchImgs = React.useCallback(async () => {
    let s = await Axios.post(`/base/img/fetch/${globalId}`, {
      userId: globalId,
    }).then((res) => {
      if (res.data.s === 1) return true
      else return false
    })
    return s
  }, [globalId])

  useEffect(() => {
    // fetchImgs().then((res) => {
    //   if (res && !props.stop) {console.log("1");props.checkTotalImg()}
    // })
    if (ProfileImg && !props.stop) {props.checkTotalImg()}
    setDidMount(true)
    return () => setDidMount(false)
  }, [fetchImgs, props, ProfileImg])

  ////////////////////////////

  const handleInsUpd = () => {
    triggerInput(keyIndex)
    setOpen(false)
  }

  const triggerInput = (index) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index].click()
    }
  }

  const handleChange = async (event, id, index) => {
    const allowedExtensions = ["jpg", "png", "jpeg", "gif"],
      sizeLimit = 5000000; // 1 megabyte
    if (event.target.files[0]) {
      const fileExtension = event.target.files[0].name.split(".").pop();
      const fileSize = event.target.files[0].fileSize
      console.log(fileExtension);
      if (allowedExtensions.includes(fileExtension) || fileSize < sizeLimit) {
        var value = URL.createObjectURL(event.target.files[0]);
        if (index === 0) {
          SetProfileImg(value);
        }
        triggerEffect(!effect);
        if (value != null) {
          var tmp = Items;
          tmp[index].value = value;
          UpdateItems(tmp);
          const gridId = imageRefs.current[index].id + "img";
          const grid = document.getElementById(gridId);
          grid.style.background = "url(" + value + ")";
          grid.style.backgroundSize = "200px 300px";
        }
      }
    }

    event.preventDefault();
    var formData = new FormData();
    formData.set("index", index);
    formData.set("userId", globalId);
    formData.set("file", event.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await Axios.post(`base/img/${globalId}`, formData, config).then((res) => {
      console.log(res.data.data);
      if (res.data.data.s) {
        setStatusTrue(true);
        setNewMsg(res.data.data.msg);
      } else {
        setOpen1(true);
        setNewMsg(res.data.data.msg);
        setErrors(res.data.data.errors);
      }
    });
  };

  //////////////////////////////////////// Drager ////////////////////////////////////////

  async function handleOnDragEnd(result) {
    await Axios.post(`base/img/dnd1/${props.id}`) // index stuff
    if (!result.destination) return
    const items = Array.from(Items)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    UpdateItems(items)
    items.map((el, index) => {
      if (index === 0 && el.value !== '') {
        SetProfileImg(el.value)
      }
      return null
    })
    await Axios.post(`base/img/dnd/${globalId}`, {
      index: result.source.index,
      id: result.destination.index,
    })
  }

  const handleDeleteDialog = () => {
    handelRemoveImg(keyIndex)
    setOpen(false)
  }
  /////////////////////////////////////////////////////////////////////////////////////////

  const handelRemoveImg = async (key) => {
    if (printImages[key] === undefined){
      await Axios.post(`/base/displayIndrager/${globalId}`).then((res) => {
        if (res.data.images[0] !== null){
          res.data.images[0].split(',').map((el, Keyi) => {
            if (key === Keyi){
              var tmp = Items
              tmp[key].value = ''
              UpdateItems(tmp)
              const gridId = imageRefs.current[key].id + 'img'
              const grid = document.getElementById(gridId)
              grid.style.background = 'url() #E0E4E9'
              grid.style.backgroundSize = '200px 300px'
              Axios.post(`base/dltImgUser/${globalId}`, {image: el})
            }
            return '';
          })
        }
      })
    }else{
      if (Items[key].value !== ''){
        if (key === 0) {
          SetProfileImg(
            'https://raw.githubusercontent.com/hassanreus/img/master/profilImageManWomen.jpg'
          )
        }
        triggerEffect(!effect)
        var tmp = Items
        tmp[key].value = ''
        UpdateItems(tmp)
        const gridId = imageRefs.current[key].id + 'img'
        const grid = document.getElementById(gridId)
        grid.style.background = 'url() #E0E4E9'
        grid.style.backgroundSize = '200px 300px'
        await Axios.post(`base/dltImgUser/${globalId}`, {
          image: printImages[key],
        })
        printImages[key] = ""
        setprintImages(printImages)
      }
    }
  }

 React.useEffect(() => {
   const interval = setInterval(() => {
     setErrors("");
     setNewMsg("");
     if (open1) {
       setOpen1(false);
     }
     if (statusTrue) {
       setStatusTrue(false);
     }
   }, 1500);
   return () => clearInterval(interval)
 });

  if (!didMount) return null
  return (
    <Size>
      <Collapse in={open1}>
        <Alert severity="error">{errors}</Alert>
      </Collapse>
      <Collapse in={statusTrue}>
        <Alert severity="success">{msg}</Alert>
      </Collapse>
      <Grid container>
        <div style={{ overflowY: "scroll", height: "600px" }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {Items.map(({ id }, index) => {
                    return (
                      <Draggable
                        isDragDisabled={true}
                        key={id}
                        draggableId={id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            id={id + "img"}
                            className={classes.big}
                            onClick={() => {
                              handleClickOpen(index);
                            }}
                          >
                            <input
                              name="file"
                              // accept=".gif,.jpg,.jpeg,.png"
                              ref={addToRefs}
                              onChange={(e) => {
                                handleChange(e, id, index);
                              }}
                              hidden
                              id={id}
                              type="file"
                            />
                            {provided.placeholder}
                            <IoMdAddCircle className={classes.addCircle} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Choose your action:"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleInsUpd} color="primary">
              Insert/Update
            </Button>
            <Button onClick={handleDeleteDialog} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {/* <div
          ref={ProfImgRef}
          style={{ width: "400px", height: "600px", border: "1px black solid" }}
          >
        </div> */}
        <Card className={classes.root}>
          <CardMedia
            image="https://raw.githubusercontent.com/hassanreus/img/master/profilImageManWomen.jpg"
            title="Contemplative Reptile"
            // style={{ width: "400px", height: "600px" }}
            ref={ProfImgRef}
            className={classes.media}
          />
        </Card>
      </Grid>
    </Size>
  );
}

export default MyAddImages
