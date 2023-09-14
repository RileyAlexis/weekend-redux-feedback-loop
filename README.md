# Basic Feedback Form

## Description

    This app accepts 3 items of numerical feedback and 1 text comment, all of which can be reviewed by an administrator. I used a stepper navigation aid for the 5 steps to submitting feedback. Submitted feedback is scored 1 through 10 with 0.5 step increments. This is displayed using icon fills with the StyledRating Material UI component providing instant feedback to the user. Each submitted feedback form is stored in a PostGres database and can be reviewed, flagged or deleted via the Admin -> Edit Responses page. Individual feedback may not be modified via the app to maintain data integrity. I used a Material UI DataGrid component to organize the form responses with a dropdown select component to set the 'flagged' value. Columns can be reordered and filtered as needed by the user. 


## Installation

    

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
