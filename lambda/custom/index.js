const Alexa = require('ask-sdk-core');

// Skill builder object
const skillBuilder = Alexa.SkillBuilders.custom();

/**
 * Initial skill lunch handler.
 */
const LaunchRequestHandler = {
  // Request Handler for the JSON input that is sent by the Alexa server
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },

  // Response
  handle(handlerInput) {
    const greetingText = 'Hi there! Welcome to CST Final Exam Schedule Skill';

    return handlerInput.responseBuilder.speak(greetingText)
      .reprompt(greetingText)
      .withSimpleCard(greetingText)
      .getResponse();
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
    ExamDateIntentHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  ).addErrorHandlers(ErrorHandler).lambda();
