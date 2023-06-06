<?php

/**
 * @author    Jeremy Reynolds <https://zerocancer.org>
 * @copyright 2017 ZERO - THe End of Prostate Cancer
 *
 * @wordpress-plugin
 * Plugin Name:       ZERO Shortcode - #CountMeIN Campaign
 * Plugin URI:        https://zerocancer.org/fight/countmein
 * Description:       Creates a shortcode to spit out a list of people who joined the ZERO #CountMeIn campaign
 * Version:           1.0
 * Author:            Jeremy Reynolds
 * Author URI:        https://zerocancer.org/why-zero/meet-team-zero/jeremy-reynolds/
 */

// Wordpress function to create [CountMeIN] and output everything to the page
add_shortcode( 'CountMeIN', 'cmi_listing' );

// 
	function cmi_listing( $atts ) {
		wp_register_script( 'cmiScroll', plugin_dir_url( __FILE__ ) . 'jquery.scrollbox.js', array('jquery-core'));
		wp_enqueue_script( 'cmiScroll' );
		wp_register_script( 'cmiAJAX', plugin_dir_url( __FILE__ ) . 'cmiAjax.js', array('jquery-core', 'cmiScroll'), '4.6.4.2', true );
		 wp_enqueue_script( 'cmiAJAX' );
		ob_start(); ?>
			<style>
				#CountUsIn {
					border: solid #333 1px;
					display: block;
					height: 400px;
					width: 240px;
					overflow: hidden;
					background: #f9f9f9;
				}
				#CountUsIn ul { list-style: none; padding: 10px; margin: 0; }
			</style>
			<div id="CountUsIn" class="scroll-text"><ul></ul></div>
		<?php $cmiPeople = ob_get_clean();
		return $cmiPeople;
	}

add_shortcode( 'CMI_signup', 'cmi_signup' );
function cmi_signup( $atts ) {
	ob_start(); ?>
		<style>
			#cmi_signup {
				width: 100%;
				background: url('https://417n6askfdo3na0t04com9tv-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/1280x708-COUNTMEIN-website-FINAL-030617-B.jpg');
				background-size: cover;
				text-align: center;
				margin-bottom: 1rem;
			}
			#cmi_signup form {
				display: inline-block;
				/*background: rgba(51,51,51,0.76);*/
				background: rgba(0,164,227,.86);
				text-align: center;
				border: solid #ffffff 1px;
				box-shadow: 0 0 0 4px #000;
				padding: 1rem 0;
				margin: 100px auto;
				max-width: 70%;
			}
			#cmi_signup b {
				text-transform: uppercase;
				color: #fff;
				display: block;
				font-size: 1.5em;
				line-height: 2em;
			}
			#cmi_signup input[type="text"] {
				text-align: center;
				margin: 1.5% 0.5% 1%;
				height: 34px;
				width: 44%;
				display: inline-block;
			}
			#cmi_signup #cons_email { width: 57% }
			#cmi_signup #cons_zip_code { width: 31% }
			#cmi_signup input[type=submit] {
				width: 92%;
				background: #333333;
				margin-top: 1.25%;
			}
		</style>
		<div id="cmi_signup"><form method="POST" action="https://support.zerocancer.org/site/SSurvey">
			<b>Join the campaign</b>
			<input type="hidden" name="s_src"               value="zerocancer.org" />
			<input type="hidden" name="cons_info_component" value="t" />
			<input type="hidden" name="cons_mail_opt_in"    value="t" />
			<input type="hidden" name="cons_email_opt_in"   checked="checked" />
			<input type="hidden" name="cons_email_opt_in_requested"   value="true" />
			<input type="hidden" name="s_rememberMe"                  checked="checked" />
			<input type="hidden" name="remember_me_opt_in_requested"  value="true" />
			<input type="hidden" name="denySubmit" value="" />
			<input type="hidden" name="4183_2360_3_2623" value="1081" alt="general interest">
			<input type="hidden" name="4183_2360_3_2623" value="1083" alt="support interest">
			<input type="hidden" name="4183_2360_3_2623" value="1084" alt="volunteer interest">
			<input type="hidden" name="4183_2360_3_2623" value="1086" alt="advocacy interest">
			<input type="hidden" name="SURVEY_ID" id="SURVEY_ID"  value="2360" />
			<input type="text" required maxlength="255" name="cons_first_name" id="cons_first_name" placeholder="First Name" />
			<input type="text" required maxlength="255" name="cons_last_name"  id="cons_last_name"  placeholder="Last Name" />
			<input type="text" required maxlength="255" name="cons_email"      id="cons_email"      placeholder="Email Address" />
			<input type="text" required maxlength="255" name="cons_zip_code"   id="cons_zip_code"   placeholder="ZIP Code" />
			<input type="submit" name="ACTION_SUBMIT_SURVEY_RESPONSE" value="Count Me In!" class="Button blueBtn" />
		</form></div>
	<?php $cmiForm = ob_get_clean();
	return $cmiForm;
}

add_shortcode( 'CMI_sidebar', 'cmi_sidebar' );
function cmi_sidebar( $atts ) {
	ob_start(); ?>
		<style>
			#CountMeIn {
				float: right;
				margin: 0 0 10px 10px;
				width: 250px;
				text-align: center;
			}
			#CountMeIn b {
				color: #45bdeb;
				text-transform: uppercase;
				font-style: italic;
				margin-bottom: 5px;
				display: block;
				font-size: 1.1em
			}
		</style>
		<div id="CountMeIn">
			<img src="https://sites.google.com/a/zerocancer.org/email/home/cmi_tag1.gif" />
			<b>To end prostate cancer</b>
			<?php echo do_shortcode("[CountMeIN]"); ?>
		</div>

	<?php $cmiSidebar = ob_get_clean();
	return $cmiSidebar;
}

?>