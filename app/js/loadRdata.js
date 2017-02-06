/**
 * @desc Function for reading a CSV file and writing it to a div on the work.html
 */
function readCSV() {
    //resetting the content of the div so that there is only 1 table at a time
    document.getElementById("wrap").innerHTML = "";
    $.get('../scriptsR/datasets.csv', function (data) {
        var build = '<table border="1" cellpadding="2" cellspacing="0" style="border-collapse: collapse" width="100%">\n';
        var rows = data.split("\n");
        //building the table
        rows.forEach(function getvalues(thisRow) {
            build += "<tr>\n";
            var columns = thisRow.split(",");
            for (var i = 0; i < columns.length; i++) {
                build += "<td>" + columns[i] + "</td>\n";
            }
            build += "</tr>\n";
        })
        build += "</table>";
        $('#wrap').append(build);
        window.location.href = "#wrap";
    });
}