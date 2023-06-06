(function ($, root, undefined) {
	$(function () {

		$.getJSON(
			'https://support.zerocancer.org/site/SPageNavigator/ryo_CMI?pgwrap=n&gID=67063&callback=?',
			function(data){
				var cmiArr = data.results.reverse();
				console.log(cmiArr.length - 27 + ' folks and counting. w00t!');
				var cmiLength = Math.round( cmiArr.length / 3 );
				$( cmiArr ).each(function(){ $('#CountUsIn ul').append( '<li>' + this + "</li>" ); });
				$( '<li><strong>YOUR NAME HERE</strong></li>' ).insertAfter('#CountUsIn li:nth-child(7)');
			}
		);
		$('#CountUsIn').scrollbox({
			linear: true,
			step: 1,
			delay: 0,
			speed: 50
		});

	});
})(jQuery, this);