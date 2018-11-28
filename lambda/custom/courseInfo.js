const courseSelector = function (courseName) {
    let speechText;

    switch(courseName) {
        case "blaw":
            speechText = law();
            break;

        case "statistics":
            speechText = statistics();
            break;
        
        case "web dev":
            speechText = webDevelopment();
            break;
    
        case "os":
            speechText = operatingSystems();
            break;
    
        case "serverless":
            speechText = serverless();
            break;

        case "dev ops":
            speechText = devOps();
            break;

        case "database systems":
            speechText = databaseSystems();
            break;

        case "ios":
            speechText = ios();
            break;

        case "android":
            speechText = android();
            break;
    }

    return speechText;
}

function law() { return "Business Law exam is on Tuesday, December 11th, from 10:30 AM to 12:30 PM. The exam will be held at SW1, room 1021."; }

function statistics() { return "Statistics exam is on Thursday, December 13th, from 3:30 PM to 5:30 PM. The exam will be held at SE12, room 322."; }

function webDevelopment() { return "COMP4711 exam is on Wednesday, December 12th, from 3:30 PM to 5:30 PM. The exam will be held at the gymnasium."; }

function operatingSystems() { return "Operating Systems exam is on Monday, December 10th, from 3:30 PM to 5:30 PM. The exam will be held at the gymnasium."; }

function serverless() { return "Serverless exam is on Wednesday, December 12th, from 10:30 AM to 12:30 PM. The exam will be held at SE12, room 306."; }

function devOps() { return "Dev Ops exam is on Friday, December 14th, from 10:30 AM to 12:30 PM. The exam will be held at SE12, room 306."; }

function databaseSystems() { return "Database Systems 2 exam is on Wednesday, December 12th, from 10:30 AM to 12:30 PM. The exam will be held at SE12, room 319."; }

function ios() { return "IOS exam is on Wednesday, December 12th, from 10:30 AM to 12:30 PM. The exam will be held at SE12, room 325."; }

function android() { return "Android exam is on Tuesday, December 11th, from 8:30 AM to 10:00 AM. The exam will be held at the gymnasium."; }

module.exports.courseSelector = courseSelector;