"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowStatus = exports.Key = void 0;
var Key;
(function (Key) {
    Key["params"] = "params";
    Key["body"] = "body";
    Key["query"] = "query";
})(Key || (exports.Key = Key = {}));
var WorkflowStatus;
(function (WorkflowStatus) {
    WorkflowStatus["PENDING"] = "pending";
    WorkflowStatus["APPROVED"] = "approved";
    WorkflowStatus["REJECTED"] = "rejected";
})(WorkflowStatus || (exports.WorkflowStatus = WorkflowStatus = {}));
