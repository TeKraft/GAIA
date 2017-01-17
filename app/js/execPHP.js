

function execPHPget() {

  console.log("GET: execPHPget");
  var url = 'http://localhost:3000' + '/exPHPget';

  var script = '<?php print "Hello from PHP!";';
  var content = script;

  $.ajax({
      type: 'GET',
      url: url,
      timeout: 5000,
      data: content,    //without data its working
      success: function (content, textStatus) {
        console.log("success: execPHP()");
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success: execPHP()");
      }
  });
};

function execPHPpost() {
  console.log("POST: execPHPpost");
  var url = 'http://localhost:3000' + '/exPHPpost';
  var script = '<?php print "Hello from PHP!";';
  var content = script;
  // perform post ajax
  $.ajax({
      type: 'POST',
      data: content,
      url: url,
      timeout: 5000,
      success: function (data, textStatus) {
          console.log(data);
          console.log("success: execPHP()");
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success: execPHP()");
      }
  });
};


var myNameToday = 'test_script';
var myScriptToday = "<?php print 'Hello from PHP!';";

function testGetScript() {
  console.log("testGetScript()");
  getScript();
};

function testPostScript() {
  var myArray = new Array();
  myArray[0] = myNameToday;
  myArray[1] = myScriptToday;
  console.log("myArray");
  console.log(myArray);

  postScript(myArray);
};

function getScript() {
  console.log("getScript()");

  var url = 'http://localhost:3000' + '/getScripts';
  $.ajax({
      type: 'GET',
      url: url,
      timeout: 5000,
      // data: content,    //without data its working
      success: function (content, textStatus) {
        console.log("success: getScript()");
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success: getScript()");
      }
  });
};

function postScript(array) {
  console.log("postScript()");

  var name = array[0];
  var script = array[1];

  var identifier = name;
  var content = script;

  var url = 'http://localhost:3000' + '/addScript?name=' + identifier;
  $.ajax({
      type: 'POST',
      data: content,
      url: url,
      timeout: 5000,
      success: function (data, textStatus) {
          console.log("success: postScript()");
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success: postScript()");
      }
  });
};

function execScript() {
  var title = myNameToday;
  console.log("title= " + title);
  executeScript(title);
};

function executeScript(name) {
  console.log("executeScript()");

  var identifier = name;
  var content = name;

  var url = 'http://localhost:3000' + '/execScript?name=' + identifier;
  $.ajax({
      type: 'POST',
      data: content,
      url: url,
      timeout: 5000,
      success: function (data, textStatus) {
          console.log("success: executeScript()");
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log("no success: executeScript()");
      }
  });
};








//
// function execPHP() {
//   console.log("execPHP()");
//   $.ajax({
//     url: './exec_script.php',
//     success: function(data) {
//       console.log("success");
//       console.log(data);
//       // $('.result').html(data);
//     }
//   });
//
// };

// function doSomething() {
//   console.log("doSomething()");
//   $.get("./exec_script.php");
//   return false;
// }
//
// function thisfunction(){
//   console.log("thisfunction()");
//     var x = new XMLHttpRequest();
//     x.open("GET","./exec_script.php",true);
//     x.send();
//     return false;
// }
//
// function confirm_delete() {
//   console.log("confirm_delete");
//     var delete_confirmed=confirm("Are you sure you want to delete this file?");
//
//     if (delete_confirmed==true) {
//        // the php code :) can't expose mine ^_^
//     } else {
//        // this one returns the user if he/she clicks no :)
//        document.location.href = './exec_script.php';
//     }
// }
//
// // function execPHP() {
// //
// //   $.ajax({
// //     type: "POST",
// //     url: 'your_functions_address.php',
// //     dataType: 'json',
// //     data: {functionname: 'add', arguments: [1, 2]},
// //       success: function (obj, textstatus) {
// //         if( !('error' in obj) ) {
// //           yourVariable = obj.result;
// //         }
// //         else {
// //           console.log(obj.error);
// //         }
// //       }
// //   });
// // };
//
// // handles the click event for link 1, sends the query
// function getOutput() {
//   console.log("getOutput");
//
//   getRequest(
//       './exec_script.php', // URL for the PHP file
//        drawOutput,  // handle successful request
//        drawError    // handle error
//   );
//   return false;
// };
// // handles drawing an error message
// function drawError() {
//     var container = document.getElementById('output');
//     container.innerHTML = 'Bummer: there was an error!';
// };
// // handles the response, adds the html
// function drawOutput(responseText) {
//     var container = document.getElementById('output');
//     container.innerHTML = responseText;
// };
// // helper function for cross-browser request object
// function getRequest(url, success, error) {
//     var req = false;
//     try{
//         // most browsers
//         req = new XMLHttpRequest();
//     } catch (e){
//         // IE
//         try{
//             req = new ActiveXObject("Msxml2.XMLHTTP");
//         } catch(e) {
//             // try an older version
//             try{
//                 req = new ActiveXObject("Microsoft.XMLHTTP");
//             } catch(e) {
//                 return false;
//             }
//         }
//     }
//     if (!req) return false;
//     if (typeof success != 'function') success = function () {};
//     if (typeof error!= 'function') error = function () {};
//     req.onreadystatechange = function(){
//         if(req.readyState == 4) {
//             return req.status === 200 ?
//                 success(req.responseText) : error(req.status);
//         }
//     }
//     req.open("GET", url, true);
//     req.send(null);
//     return req;
// };
