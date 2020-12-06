"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideSpinner = hideSpinner;
exports.showSpinner = showSpinner;
exports.useAPIData = useAPIData;
exports["default"] = getAPIData;
exports.sendAPIData = sendAPIData;
exports.sendAPIStatDataChain = sendAPIStatDataChain;
exports.deleteAPIData = deleteAPIData;
exports.updateAPIData = updateAPIData;
exports.updateTeamNameForAll = updateTeamNameForAll;
exports.addSpecialStat = addSpecialStat;
exports.addSpecialStatsToOne = addSpecialStatsToOne;
//API Methods
var playerID = "";
var statsID = "";

function hideSpinner() {
  document.querySelector(".spinner-border").style.display = "none";
}

function showSpinner() {
  document.querySelector(".spinner-border").style.display = "block";
} //General method


function useAPIData(URL, method) {
  var modifier,
      response,
      data,
      _args = arguments;
  return regeneratorRuntime.async(function useAPIData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          modifier = _args.length > 2 && _args[2] !== undefined ? _args[2] : " ";
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(URL + "".concat(modifier), {
            method: method
          }));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
} //Get by ID method


function getAPIData(URL) {
  var modifier,
      response,
      data,
      _args2 = arguments;
  return regeneratorRuntime.async(function getAPIData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          modifier = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : " ";
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch(URL + "".concat(modifier), {
            method: "GET"
          }));

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context2.sent;
          return _context2.abrupt("return", data);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
} //POST method


function sendAPIData(URL, upload) {
  var response, data;
  return regeneratorRuntime.async(function sendAPIData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch(URL, {
            method: "POST",
            headers: {
              //Accept: "application/json",
              "Content-type": "application/json"
            },
            body: JSON.stringify(upload)
          }));

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context3.sent;
          console.log(data);
          return _context3.abrupt("return", data);

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
} //POST chain for new Player/stats


function sendAPIStatDataChain(URL, playerInfo, stats) {
  var extraStats,
      _args4 = arguments;
  return regeneratorRuntime.async(function sendAPIStatDataChain$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          extraStats = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
          fetch(URL, {
            method: "POST",
            headers: {
              //Accept: "application/json",
              "Content-type": "application/json"
            },
            body: JSON.stringify(playerInfo)
          }).then(function (response) {
            return response.json();
          }).then(function (reply) {
            console.log(reply);
            playerID = reply[0]._id;
            stats["player"] = playerID;
            console.log("Stats are:", stats);
            console.log("JSON.stringify stats", JSON.stringify(stats));
            fetch("../stats", {
              method: "POST",
              headers: {
                //Accept: "application/json",
                "Content-type": "application/json"
              },
              body: JSON.stringify(stats)
            }).then(function (response1) {
              return response1.json();
            }).then(function (reply) {
              statsID = reply.stats[0];
              console.log("Stats ID is showing as ".concat(statsID));
              console.log(JSON.stringify(extraStats));
              fetch("../stats/updateUniqueStats/".concat(statsID), {
                method: "PUT",
                headers: {
                  //Accept: "application/json",
                  "Content-type": "application/json"
                },
                body: JSON.stringify(extraStats)
              }).then(function (response) {
                return console.log(response);
              }); // .then((reply2) => {
              //   console.log("Final reply", reply2);
              // });
            });
          })["catch"](function (error) {
            return console.error(error);
          });

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
} //DELETE method


function deleteAPIData(URL, ID) {
  var response, data;
  return regeneratorRuntime.async(function deleteAPIData$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch(URL + "/".concat(ID), {
            method: "DELETE"
          }));

        case 3:
          response = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(response.text());

        case 6:
          data = _context5.sent;
          return _context5.abrupt("return", data);

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
} //PUT method


function updateAPIData(URL, id, key, value) {
  var response, data;
  return regeneratorRuntime.async(function updateAPIData$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetch(URL + "/".concat(id, "/").concat(key, "/").concat(value), {
            method: "PUT"
          }));

        case 3:
          response = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context6.sent;
          return _context6.abrupt("return", data);

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
} //PUT method for editing field of all players


function updateTeamNameForAll(URL, key, oldValue, newValue) {
  var response, data;
  return regeneratorRuntime.async(function updateTeamNameForAll$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(fetch(URL + "/editTeamForAll/".concat(key, "/").concat(oldValue, "/").concat(newValue), {
            method: "PUT"
          }));

        case 3:
          response = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context7.sent;
          return _context7.abrupt("return", data);

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 10]]);
} //PUT Add new stat category to all players


function addSpecialStat(key, value) {
  var response, data;
  return regeneratorRuntime.async(function addSpecialStat$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(fetch("../stats/addUniqueStatToAll" + "/".concat(key, "/").concat(value), {
            method: "PUT",
            headers: {
              //Accept: "application/json",
              "Content-type": "application/json"
            }
          }));

        case 3:
          response = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(response);

        case 6:
          data = _context8.sent;
          if (response) hideSpinner();
          return _context8.abrupt("return", data);

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 11]]);
} //PUT Add new stat category to all players


function addSpecialStatsToOne(statsID, upload) {
  var response, data;
  return regeneratorRuntime.async(function addSpecialStatsToOne$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(fetch("../stats/updateUniqueStats/".concat(statsID), {
            method: "PUT",
            body: JSON.stringify(upload)
          }));

        case 3:
          response = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(response);

        case 6:
          data = _context9.sent;
          if (response) hideSpinner();
          return _context9.abrupt("return", data);

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 11]]);
}