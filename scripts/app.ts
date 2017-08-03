///<reference types="vss-web-extension-sdk" />
import * as ExtensionContracts from "TFS/WorkItemTracking/ExtensionContracts";
import { WorkItemFormService } from "TFS/WorkItemTracking/Services";
import * as WitService from "TFS/WorkItemTracking/Services";
import * as VSSUtilsCore from "VSS/Utils/Core";

VSS.register(VSS.getContribution().id, function () {
            return {
                // Called when the active work item is modified
                onFieldChanged: function(args) {
                    //$("#events").append($("<div/>").text("onFieldChanged - " + JSON.stringify(args)));
                },

                // Called when a new work item is being loaded in the UI
                onLoaded: function (args) {

                    var _fieldName = VSS.getConfiguration().witInputs["FieldName"] ;

                    if (_fieldName != undefined) {
                        WitService.WorkItemFormService.getService().then(
                            (service) => {
                                service.getFieldValues([_fieldName]).then(
                                function (value) {
                                    var textLink = value[_fieldName] ;
                                    $("#content").empty();
                                    $("#content").append($("<div/>").append("" + textLink));
                                });
                            },
                            this._handleError
                        );
                    }
                },

                // Called when the active work item is being unloaded in the UI
                onUnloaded: function (args) {
                    //$("#events").empty();
                    //$("#events").append($("<div/>").text("onUnloaded - " + JSON.stringify(args)));
                },

                // Called after the work item has been saved
                onSaved: function (args) {
                    //$("#events").append($("<div/>").text("onSaved - " + JSON.stringify(args)));
                },

                // Called when the work item is reset to its unmodified state (undo)
                onReset: function (args) {
                    //$("#events").append($("<div/>").text("onReset - " + JSON.stringify(args)));
                },

                // Called when the work item has been refreshed from the server
                onRefreshed: function (args) {
                    //$("#events").append($("<div/>").text("onRefreshed - " + JSON.stringify(args)));
                }
            }
        });      

