"use strict;"

var getProjectbyName = function(name, creator) {
    var url = 'http://localhost:3000' + '/getFeatures';
    

    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: url,
        timeout: 5000,
        success: function (content, textStatus) {
            $('#tableDBContents').empty();
            var project;
            for (var i = 0; i <= content.length; i++) {
                
                if (content[i] != undefined && content[i].data != undefined && content[i].data.Creator == creator && content[i].name == name) {
                    
                    project = content[i];
                    getProject(project);
                    return JSON.stringify(project);
                }
            }
            $('#tableDB').removeClass('hidden');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("no success");
        }
    });
    
    return loadedProject;
};

var loadedProject;
var getProject = function(string){
    console.log(string);
    loadedProject = string;
}



var saveData = function(name,data){
    
    
    var url = 'http://localhost:3000' + '/getFeatures';
    
  // ajax Post
    $.ajax({
	   url: '/updateFeature?name=' + name,
       //async: false,
       type: "POST",
	   data: data,
		
       success: function(xhr, textStatus, data){
                            console.log("success");
            
       },
       error: function(textStatus, errorThrown){
            console.log(errorThrown);
       }
	   });
}

var updateProject = function(name,creator,data){
    // ajax Post
    $.ajax({
        url: '/updateFeature?name=' + name,
        //async: false,
        type: "POST",
        data: data,
        success: function(xhr, textStatus, data){
               console.log("success");
        },
        error: function(textStatus, errorThrown){
        console.log(errorThrown);
        }
    });
}
