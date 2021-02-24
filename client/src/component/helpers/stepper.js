import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function getSteps() {
  return ['Add some Images to your profil', 'Complet a profil form']
}

const StepperComponent = (props) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [callImg, setCallImg] = React.useState(false)
  const [fillProfil, setFillProfil] = React.useState(false)
  const steps = getSteps()
  function getStepContent(step, props) {
    switch (step) {
      case 0:
        return <props.img onlisten={setCallImg} cImg={callImg} id={props.id} />
      case 1:
        return <props.fill onlisten={setFillProfil} vProfil={fillProfil}  id={props.id}/>
      default:
        return 'Unknown step'
    }
  }
  
  const handleNext = () => {
    if (callImg || (activeStep === steps.length - 1 && fillProfil)){
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setCallImg(false)
      setFillProfil(false)

    }
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep, props)}
            <div>
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StepperComponent