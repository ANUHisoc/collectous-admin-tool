import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';
import * as publicRequestHandlerFunction from './handler/request'

// Expose public functions by attaching to `global`
global.doGet = publicUiFunctions.doGet;
global.getRequestData = publicSheetFunctions.getRequestData;
global.acceptRequests = publicRequestHandlerFunction.acceptRequests;
global.rejectRequests = publicRequestHandlerFunction.rejectRequests;

