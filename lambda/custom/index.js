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
 * Handles the input for user's option name and ask for the desired course.
 */
const OptionNameIntentHandler = {
  // Handler for the JSON request that is sent by the Alexa server
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'OptionNameIntent';
  },

  // Response 
  handle(handlerInput) {
    let optionName = handlerInput.requestEnvelope.request.intent.slots.option.value;
    const speechText = `Nice! You said ${optionName}`;

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

/**
 * An intent that is in charge of finding an exam date & time.
 */
const ExamDateIntentHandler = {
  // Handler for the JSON request that is sent by the Alexa server
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'ExamDateIntent';
  },

  handle(handlerInput) {
    let courseName = handlerInput.requestEnvelope.request.intent.slots.course.value;
    const speechText = `Yo! You ask for ${courseName}`;

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

const HelloWorldIntentHandler = {
  // Handler for the JSON request that is sent by the Alexa server
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  
  // Response
  handle(handlerInput) {
    const speechText = 'Hello Poor CST students';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
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
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
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
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

// Export intents
exports.handler = skillBuilder.addRequestHandlers(
    LaunchRequestHandler,
    OptionNameIntentHandler,
    ExamDateIntentHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  ).addErrorHandlers(ErrorHandler).lambda();

/* TODO:
    - Ask for option name --> The result(slot) must be out of provided options & if user doesn't answer, skill must ask again
    - OptionNameIntent
    - Skill should ask for the course name
    - Set ID & alias for the courses in slots types
*/