/*  
	Code Empires
	Author: Elimarie Morales Santiago
*/

(function($){
	/*== TOOLTIP ==*/
	$('.masterTooltip') .hover(function(){
		//hover over code
		var title = $(this).attr('title');
		$(this).data('tipText', title).removeAttr('title');
		$('<p class="tooltip"></p>')
		.text(title)
		.appendTo('body')
		.fadeIn('slow');

}, function() {
	 	//hover out code
		$(this).attr('title', $(this).data('tipText'));
		$('.tooltip').remove();

}) .mousemove(function(e) {
		var mousex = e.pageX + 20; //get X coordinates
		var mousey = e.pageY + 10;  // get Y coordinates
		$('.tooltip')
		.css({top: mousey, left: mousex })
});
	
	/*== LOGIN ==*/
	
	$('#signinButton').click(function(){
		
		var user = $('#user').val();
		var pass = $('#pass').val();
		console.log("working password");
		
		$.ajax({
			url:'xhr/login.php',
			type: 'post',
			dataType: 'json',
			data: {
				username: user,
				password: pass
				},
				success:function(response){
					console.log("Test User");
					if (response.error){
						alert(response.error);
					}else{
						window.location.assign('admin.html')
					};
				}
		});
	});
	
		/*== REGISTER ==*/
		
		$('#register').on('click', function(){
			var firstname= $('#first').val(),
				lastname= $('#last').val(),
				username= $('#userName').val(),
				email= $('#email').val(),
				password= $('#password').val();
				console.log(firstname)
				console.log(firstname+" "+lastname+" "+username+" "+email+" "+password);
			
			$.ajax({				
				url:'xhr/register.php',
				type:'post',
				dataType: 'json',
				data: {
					firstname: firstname,
					lastname: lastname,
					username: username,
					email: email,
					password: password
				},
				
				success: function(response){
					if (response.error){
						alert(response.error);
					}else{
						window.location.assign('admin.html');
					}
				}
			});
		});
		
		/*  PROJECTS */
		
		$('.projectsbtn').on('click', function(e){
			e.preventDefault();
			window.location.assign('projects.html')
		});
		
		/* ADD MODAL*/
		
	$('.modalClick').on('click', function(event){
		event.preventDefault();
		$('#overlay')
		.fadeIn()
		.find('#modal')
		.fadeIn();
		
	});
	
	$('.close').on('click', function(event){
		event.preventDefault();
		$('#overlay')
		.fadeOut()
		.find('#modal')
		.fadeOut();
	});
	
	/*  FADING STATUS */
			$('.mystatus').mouseover(function(){
				$(this).fadeTo(100, .3);
			});
			
			$('.mystatus').mouseout(function(){
				$(this).fadeTo(100, 1);
			});


	/*  TEMPLATE USER ID */

/*== 	TAB ACCORDION ==*/

$('#tabs p').hide().eq(0).show();
$('#tabs p:not(:first)').hide();

$('#tabs-nav li').click(function(e){
	e.preventDefault();
	$('#tabs p').hide();
	
$('#tabs-nav .current').removeClass("current");
	$(this).addClass('current');
	var clicked = $(this).find('a:first').attr('href');
	
	$('#tabs ' + clicked).fadeIn('fast');
}).eq(0).addClass('current');
	

	
})(jQuery); // end private scope




