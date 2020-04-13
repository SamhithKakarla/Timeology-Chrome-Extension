$(document).ready(function () {
    // console.log('before');
    chrome.storage.sync.get(['coursesRead', 'enabled'], function (val) {
        var bool = val.coursesRead;
        var enable = val.enabled;
        if (bool == 'true' && enable == 'true') {
            //store num assignments for each course
            $.ajax({
                type: "GET",
                url: '/home/upcoming_ajax',
                data: '',
                success: function (data) {
                    //array of each assignments course
                    var assignments = [];
                    // create a empty div, with content from ajax output
                    var object = $('<div/>').html(data.html).contents();

                    var h4_list = $(object[1]).find('h4');
                    $.each(h4_list, function (index, element) {

                        // create a dummy object
                        var dummy = $('<div/>').html(element.outerHTML).contents();
                        console.log(dummy);
                        var course = dummy.find('.realm-title-course');
                        if (course && course.length > 0 && course[0].outerText) {
                            //console.log(course[0].outerText);
                            var str = course[0].outerText;
                            var cut = -1;
                            var i;
                            for (i = 0; i < str.length; i++) {
                                if (str.charAt(i) == '-') {
                                    cut = i;
                                    break;
                                }
                            }
                            str = str.substring(0, cut - 1);
                            assignments.push(str);
                            //console.log(str.substring(0, cut - 1));
                        }
                    });

                    //prints courses name for each assignment posted
                    // var i;
                    // for (i = 0; i < assignments.length; i++) {
                    //     //console.log(assignments[i]);
                    // }

                    var class_array = [
                        'class1',
                        'class2', 
                        'class3', 
                        'class4', 
                        'class5', 
                        'class6', 
                        'class7'
                    ];
                    
                    chrome.storage.sync.get(class_array, function(val){
                        setAssignmentKey(val.class1, assignments, 'numAssigments1');
                        setAssignmentKey(val.class2, assignments, 'numAssigments2');
                        setAssignmentKey(val.class3, assignments, 'numAssigments3');
                        setAssignmentKey(val.class4, assignments, 'numAssigments4');
                        setAssignmentKey(val.class5, assignments, 'numAssigments5');
                        setAssignmentKey(val.class6, assignments, 'numAssigments6');
                        setAssignmentKey(val.class7, assignments, 'numAssigments7');
                    });

                    var assign_array = [
                        'numAssigments1',
                        'numAssigments2',
                        'numAssigments3',
                        'numAssigments4',
                        'numAssigments5',
                        'numAssigments6',
                        'numAssigments7',
                        'atime1',
                        'atime2',
                        'atime3',
                        'atime4',
                        'atime5',
                        'atime6',
                        'atime7'
                    ];
                    chrome.storage.sync.get(assign_array, function (items) {
                        var at1 = parseInt(items.atime1) * parseInt(items.numAssigments1);
                        var at2 = parseInt(items.atime2) * parseInt(items.numAssigments2);
                        var at3 = parseInt(items.atime3) * parseInt(items.numAssigments3);
                        var at4 = parseInt(items.atime4) * parseInt(items.numAssigments4);
                        var at5 = parseInt(items.atime5) * parseInt(items.numAssigments5);
                        var at6 = parseInt(items.atime6) * parseInt(items.numAssigments6);
                        var at7 = parseInt(items.atime7) * parseInt(items.numAssigments7);
        
                        var totalZ = at1 + at2 + at3 + at4 + at5 + at6 + at7;                
                        var hrs = Math.floor(totalZ / 60);
                        var min = totalZ % 60;
                        // console.log(hrs + "  " + min);
                        var str = "You have about <b>" + hrs + " hrs and " + min + " min</b> of HW today! Good Luck!!   <br>  - TIMEOLOGY";
                        $("#right-column").prepend('<div id="timeology time" style="padding-left: 10px; padding-right: 10px; border: 1px solid #4CAF50; border-radius: 15px"><table> <tr> <th>Amount of HW Today</th> </tr> <tr> <td id = "time display">' + str + '</td> </tr></table></div>');
                    });
                },
                dataType: "json"
            });
        }
    });

});

function setAssignmentKey(value, assignments, keyName) {
    var num = 0;
    var i;
    for (i = 0; i < assignments.length; i++) {
        if (assignments[i] == value.trim()) {
            num++;
        }
    }
    chrome.storage.sync.set({ keyName: num.toString() });
}
