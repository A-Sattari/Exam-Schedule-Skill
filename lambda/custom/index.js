const Alexa = require('ask-sdk-core');
const speechDB = require('./speechDB');

// Skill builder object
const skillBuilder = Alexa.SkillBuilders.custom();

/**
 * Initial Lunch Handler.
 */
const LaunchRequestHandler = {
  // Request Handler for the JSON input that is sent by the Alexa server
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  // Response
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak(speechDB.greetingText + speechDB.askOption)
            .reprompt(speechDB.reAskOption).getResponse();
  },
};

/**
 * Handles user's option choice and the asks for a course name.
 */
const OptionSelectionIntentHandler = {
  // Handler for the JSON request that is sent by the Alexa server
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'OptionSelectionIntent';
  },

  // Response 
  handle(handlerInput) {
    let optionName = handlerInput.requestEnvelope.request.intent.slots.option.resolutions.resolutionsPerAuthority;
    optionName = (((optionName[0].values)[0]).value.name).toLowerCase();

    switch(optionName) {

      case "cloud":
        return handlerInput.responseBuilder.speak(speechDB.thank + speechDB.cloudCourses + speechDB.askCourse).reprompt(speechDB.askCourse).getResponse();

      case "web and mobile":
        return handlerInput.responseBuilder.speak(speechDB.thank + speechDB.webCurses + speechDB.askCourse).reprompt(speechDB.askCourse).getResponse();

      case "ai":
        return handlerInput.responseBuilder.speak(speechDB.thank + speechDB.AICourses + speechDB.askCourse).reprompt(speechDB.askCourse).getResponse();

      case "database":
        return handlerInput.responseBuilder.speak(speechDB.thank + speechDB.databaseCourses + speechDB.askCourse).reprompt(speechDB.askCourse).getResponse();
    }

  },
};

/**
 * Handles user's course choice.
 */
const CourseSelectionIntentHandler = {  
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'CourseSelectionIntent';
  },
  
  handle(handlerInput) {
    let courseName = handlerInput.requestEnvelope.request.intent.slots.course.resolutions.resolutionsPerAuthority;
    courseName = (((courseName[0].values)[0]).value.name).toLowerCase();
    
    const speechText = `Your choice is ${courseName}`;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

/**
 * Handles direct question about an exam date & time.
 */
const ExamDateIntentHandler = {
  // Handler for the JSON request that is sent by the Alexa server
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'ExamDateIntent';
  },

  handle(handlerInput) {
    let valid = handlerInput.requestEnvelope.request.intent.slots.course.value;

    if (!valid) {
      return handlerInput.responseBuilder.speak(speechDB.reAskCourse).reprompt(speechDB.reAskCourse).getResponse();
      
    } else {
      let courseName = handlerInput.requestEnvelope.request.intent.slots.course.resolutions.resolutionsPerAuthority;
      courseName = (((courseName[0].values)[0]).value.name).toLowerCase();
      const speechText = `Yo! You ask for ${courseName}`;

      return handlerInput.responseBuilder.speak(speechText).getResponse();
    }

  },
};

/*******************************************************/
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Haha! Look at this guy, it\'s asking for help. How can I help you buddy?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Oh! Maaan!! Whatever. Bye';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Oops! An error occurred.')
      .reprompt('Oops! An error occurred.')
      .getResponse();
  },
};

// Export intents
exports.handler = skillBuilder.addRequestHandlers(
    LaunchRequestHandler,
    OptionSelectionIntentHandler,
    CourseSelectionIntentHandler,
    ExamDateIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  ).addErrorHandlers(ErrorHandler).lambda();

/* TODO:
    - Implement the data and really output the data
    - Handle direct question about the exam place
    - Bug: after asking for option name, user can answer with a course name
*/