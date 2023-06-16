# Roll Your Own API
[Content API's getTagInfo method](https://developer.blackbaud.com/lo-api/loapi/content/getTagInfo) is great, but it didn't always exist (and still returns one answer for one request). This technique lets you combine S-tags, conditionals, RPN, etc. and make a custom RESTful endpoint that returns the exact data in the exact format you need.

## The Problem
Consider this scenario: you're on a participant's page, and want to generate a simple statement for when the user is logged in...

> Hey `Joe`, you've raised `$200`! If you have any offline donations, send them to `Mail Address`.

...but for whatever reason, you want to get that statement through a fetch/XHR request. You *can* do it with the Luminate Online REST API, but you'll need to call, parse, and combine results for:
- **Joe's fundraising results:** [getParticipantProgress](https://developer.blackbaud.com/lo-api/loapi/teamraiser/getParticipantProgress)...might want to put a conditional check on there so you don't sound excited if the amount is $0.
- **Event details:** Via [getTeamraisersByInfo](https://developer.blackbaud.com/lo-api/loapi/teamraiser/getTeamraisersByInfo)
- **Joe's name:** [getUser](https://developer.blackbaud.com/lo-api/loapi/constituents/getUser). Good thing only Joe is seeing your message, since this isn't availble for the public. [getParticipants](https://developer.blackbaud.com/lo-api/loapi/teamraiser/getParticipants) Would tell you, but now you have to hope that cons_id isn't past the page limit.

Woof.

## S-Tags Were Easier
Realistically, there's really no reason you'd use an API there. S-Tags would be much simpler...

> Hey [[[S1:first_name]]](https://webfiles.blackbaud.com/files/support/helpfiles/luminate-online/help/luminateonline.html#../Subsystems/S-Tags/Content/S-Tags/S1_User_Data.html#_S1:_USER_DATA), you've raised [[[E48:[[S334:fr_id]]-[[S334:cons_id]]:dollars]]](https://webfiles.blackbaud.com/files/support/helpfiles/luminate-online/help/luminateonline.html#../Subsystems/S-Tags/Content/S-Tags/S48_TeamRaiser_Participant.html?TocPath=S-Tags%257CTeamRaiser%2520S-Tags%257C_____8)! If you have any offline donations, send them to [[[E42:[[S334:fr_id]]:local-officemailing-address]]](https://webfiles.blackbaud.com/files/support/helpfiles/luminate-online/help/luminateonline.html#../Subsystems/S-Tags/Content/S-Tags/S42_TeamRaiser_Campaign_Information.html#_S42:__TEAMRAISER).

...and the tag approach would *also* give you access to event settings (either C-Tags or [[[E47:[[S334:fr_id]]:ctag_file:ctag_type:ctag_name]]](https://webfiles.blackbaud.com/files/support/helpfiles/luminate-online/help/luminateonline.html#../Subsystems/S-Tags/Content/S-Tags/S47_TeamRaiser_Custom_Component.html?TocPath=S-Tags%257CTeamRaiser%2520S-Tags%257C_____7)), team information ([[[E43:[[S334:fr_id]]:item:[[[E48:[[S334:fr_id]]-[[S334:cons_id]]:team-id]]]]]](https://webfiles.blackbaud.com/files/support/helpfiles/luminate-online/help/luminateonline.html#../Subsystems/S-Tags/Content/S-Tags/S43_TeamRaiser_Team_Information.html?TocPath=S-Tags%257CTeamRaiser%2520S-Tags%257C_____5)), and other fun things.

## Roll-Your-Own API for the Best of Both Worlds
What if you could build your own API endpoint, passing it `[[S334:px]]` to idenfity the constituent and `[[S334:fr_id]]` to identify the teamraiser? Depending on what you want to do, it'd consolidate all those earlier LO API calls into a single request, avoid certain permission checks, and let you use S130 to remix the data into the format you'd like!

Heck, you wouldn't be limited to processing CMS/CRM data. Roll-Your-Own API is really just leveraging LO's ability to run conditional statements based on URL parameters, session variables, and system functions. You could use it to build a clock, parse a custom dictionary, or offer canned responses to specific keywords.

## In this Repo
Focusing less on reusable code, and more on examples to get your wheels turning.

- **Group Scroller**: Getting normally-private LO group data, without an authorization workflow.
  - Converts S-Tag content into simple JSON/JSONP output, for use off-site or in your own scripts. Instead of dealing with authorization, you could could just ask for a secret phrase or rely on your IP whitelist in Luminate.
  - Simple wordpress plugin turned implementation into a shortcode instead of asking content editors to figure out AJAX.
- **Scavenger Hunt**: Using LO for arbitrary data.
  - Last year's bbDevDays scavenger hunt for the world's most interesting man -- a simple quiz that just checked a list of keywords.
  - No CRM or event data, just hard-coded text strings, pulled by a Javascript form that updates the page without reloading the site.
- **TeamRaiser Details**: Consolidating multiple REST API calls into one, getting results that usually aren't available and letting LO conditional statements process results instead of Javascript.
  - A call intended to return a simple statement to an off-site script (i.e. a bot in Slack)
  - Building your own "get event details by ID" API method for building an "upcoming events" list, or getting everything needed for a TeamRaiser landing page (without multiple API requests).