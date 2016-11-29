var url = "http://128.176.148.9";
var content = "hello world!";

function postSCIDB(url) {
  console.log("start POST");
  $.ajax({
    type: "POST",
    url: url,
    data: content,
    success: function(msg) {
      alert(msg);
    }
  });
  console.log("end POST");
};


function getSCIDB(url) {
  console.log("start GET");
  $.ajax({
    type: "GET",
    url: url,
    data: content,
    success: function(msg) {
      alert(msg);
    }
  });
  console.log("end GET");
};
