import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';
import * as publicRequestHandlerFunctions from './handler/request'
import * as publicUserFunctions from './user'

// Expose public functions by attaching to `global`
global.doGet = publicUiFunctions.doGet;
global.getRequestData = publicSheetFunctions.getRequestData;
global.acceptRequests = publicRequestHandlerFunctions.acceptRequests;
global.rejectRequests = publicRequestHandlerFunctions.rejectRequests;
global.getUserEmail = publicUserFunctions.getUserEmail;
global.isAdmin = publicUserFunctions.isAdmin; 

