/*  
	Code Empires
	Author: Elimarie Morales Santiago
*/
(function($) {
    
	/*== TOOLTIP ==*/
    $('.masterTooltip').hover(function() {
        //hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn(
            'slow');
    }, function() {
        //hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 20; //get X coordinates
        var mousey = e.pageY + 10; // get Y coordinates
        $('.tooltip').css({
            top: mousey,
            left: mousex
        })
    });
    
	/*== LOGIN ==*/
    $('#signinButton').click(function() {
        var user = $('#user').val();
        var pass = $('#pass').val();
        console.log("working password");
        $.ajax({
            url: 'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: user,
                password: pass
            },
            success: function(response) {
                console.log("test user");
                if (response.error) {
                    alert(response.error);
                } else {
                    window.location.assign('admin.html')
                };
            }
        });
    });
    
	/*== LOGOUT ==*/
    $('#logOut').click(function(e) {
        e.preventDefault;
        $.get('xhr/logout.php', function() {
            window.location.assign('index.html')
        })
    });
    
	/*== REGISTER ==*/
    $('#submit').on('click', function() {
        var firstname = $('#first').val(),
            lastname = $('#last').val(),
            username = $('#userName').val(),
            email = $('#email').val(),
            password = $('#password').val();
        console.log(firstname)
        console.log(firstname + " " + lastname + " " + username +
            " " + email + " " + password);
        $.ajax({
            url: 'xhr/register.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password
            },
            success: function(response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    window.location.assign('index.html');
                }
            }
        });
    });
    
	/*  PROJECTS */
    $('.projectsbtn').on('click', function(e) {
        e.preventDefault();
        window.location.assign('projects.html')
    });
    $('.addButton').on('click', function(e) {
        e.preventDefault();
        window.location.assign('projects.html')
    });
    $('.dashboard').on('click', function(e) {
        e.preventDefault();
        window.location.assign('admin.html')
    });
    $('#logOuta').on('click', function(e) {
        e.preventDefault();
        window.location.assign('index.html')
    });
    $('#register').on('click', function(e) {
        e.preventDefault();
        window.location.assign('register.html')
    });
    
	/* ADD MODAL*/
    $('.modalClick').on('click', function(event) {
        event.preventDefault();
        $('#overlay').fadeIn().find('#modal').fadeIn();
    });
    $('.close').on('click', function(event) {
        event.preventDefault();
        $('#overlay').fadeOut().find('#modal').fadeOut();
    });
    
	/*  FADING STATUS */
    $('.mystatus').mouseover(function() {
        $(this).fadeTo(100, .3);
    });
    $('.mystatus').mouseout(function() {
        $(this).fadeTo(100, 1);
    });
    
	/*  TEMPLATE USER ID */
    $.getJSON('xhr/check_login.php', function(data) {
        console.log(data);
        $.each(data, function(key, val) {
            console.log(val.first_name);
            $('.userid').html("Hello: " + val.first_name);
        })
    });
    
	/*	TAB ACCORDION */
    $('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();
    $('#tabs-nav li').click(function(e) {
        e.preventDefault();
        $('#tabs p').hide();
        $('#tabs-nav .current').removeClass("current");
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');
        $('#tabs ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');
    
	/* NEW PROJECTS */
    $('#addButton').on('click', function() {
        var projName = $('#projectName').val(),
            projDesc = $('#projectDescription').val(),
            projDue = $('#projectDueDate').val(),
            status = $('input[name = "status"]:checked').prop("id");
        $.ajax({
            url: "xhr/new_project.php",
            type: "post",
            dataType: "json",
            data: {
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status
            },
            success: function(response) {
                console.log('Testing for success');
                if (response.error) {
                    alert(response.error)
                } else {
                    window.location.assign(
                        "projects.html");
                }
            }
        });
    });
    
	/* GET PROJECTS */
    var projects = function() {
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(response) {
                if (response.error) {
                    console.log(response.error);
                } else {
                    for (var i = 0, j = response.projects.length; i <
                        j; i++) {
                        var result = response.projects[i];
                        $(".projects").append(
                            // '<div style="border:1px solid black">' +
                            '<div id="sortable" class="ui-state-default">' +
                            "<input class='projectid' type='hidden' value='" +
                            result.id + "'>" +
                            "Project Name: " + result.projectName +
                            "<br>" +
                            "Project Description: " +
                            result.projectDescription +
                            "<br>" +
                            "Project Due Date: " +
                            result.dueDate + "<br>" +
                            "Project Status: " + result
                            .status + "<br>" +
                            '<button class="deletebtn">Delete</button>' +
                            //'<button class="editbtn">Edit</button>' +
                            '</div> <br>');
                    }
                    $('.deletebtn').on('click', function(e) {
                        var resultID = $(this).parent()
                            .find(".projectid").val();
                        console.log('test delete');
                        $.ajax({
                            url: 'xhr/delete_project.php',
                            data: {
                                projectID: resultID
                            },
                            type: 'POST',
                            dataType: 'json',
                            success: function(
                                response
                            ) {
                                console
                                    .log(
                                        'Testing for success'
                                    );
                                if (
                                    response
                                    .error
                                ) {
                                    alert
                                        (
                                            response
                                            .error
                                        );
                                } else {
                                    //console.log(result.id);
                                    window
                                        .location
                                        .assign(
                                            "projects.html"
                                        );
                                }
                            }
                        });
                    }); // end delete
                }
            }
        })
    }
    projects();
   
    /* DATE PICKER */
    $(".datepicker").datepicker();
   
    /*  SORTABLE  */
    $("#sortable").sortable({
        placeholder: "ui-state-highlight"
    });
    $("#sortable").disableSelection();
	
	/*  DIALOG  */
	$( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
 
    $( "#opener" ).click(function() {
      $( "#dialog" ).dialog( "open" );
    });
	
	
})(jQuery); // end private scope
