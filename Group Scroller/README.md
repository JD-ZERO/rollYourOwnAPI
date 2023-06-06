# Group Scroller
Get a list of the first 500 names in your specified group in Constituent360. Essentially converts results of [a `[[S450:_____:members]]` tag](https://webfiles.blackbaud.com/files/support/helpfiles/luminate-online/help/luminateonline.html#../Subsystems/S-Tags/Content/S-Tags/S450_Group_Information.html?TocPath=S-Tags%257CContacts%2520S-Tags%257C_____4) into JSON or JSONP.

## ryo_groupList
Proof of concept / sample code for using this technique.
- **groups.whitelist** -- is a simple list of Luminate `group_id` numbers. I've separated them by newline, but any character separator could work (e.g. CSV formatting or even just a space between numbers).
- **ryo_groupList** -- Create a PageBuilder page that is a simple HTML element, then paste this into it. This will create your queryable endpoint.
- **ryo_groupList.js** -- Some implementation examples to get you thinking.

_NOTE: In actual implementation where you only want to make a single group, you could eliminate the separate whitelist by editing **ryo_groupList** and replacing `[[S51:groups.whitelist]]` with your group ID_

## Wordpress plugin
The original application was a campaign where people could fill out a form and it'd cause them to appear in a list of people who had signed onto the petition. Names were collected via a scraped Luminate form, which emulated an LO Survey that adds all users to a group. On pageload, the signup page would do an AJAX request to a PageBuilder "Roll Your own API" page, and feed the JSONP results to [jQuery Scrollbox](http://github.com/wmh/jquery-scrollbox) for rendering on-page.

For ease-of-administration, I wrote a plugin to generate [Wordpress shortcodes](https://codex.wordpress.org/Shortcode_API) that render the scraped form (`[CMI_signup]`) and render a sidebar on the page that contains the scrolling names (`[CMI_sidebar]`). There's actually a third shortcode that enqueues the required JS libraries and create a container for the scrolling names, but it's used by the sidebar code instead of the user. I honestly can't remember why I felt the need to do that instead of just making everything in the second shortcode.

To adapt it for your own needs, edit the contents of the scraped form in **countmein-shortcode.php** so that it looks like whatever survey you're using. Then edit the `getJSON` call in **cmiAjax.js** so that it references the your own **ryo_groupList** url and desired group ID. And of course, you'll probably want to change all the CMI/CountMeIn references and naming conventions, make the CSS sympatico with your site, and maybe check to see if the scrolling library has been updated within the last 5 years.

## Important Notes
- Whitelist is important, you don't want every group in your LO instance accessible to anyone on the web.
- Any limitations of S450 will apply here as well.
  - The list will return the S-Tag equivalent of `[[S1:first_name]] [[S1:last_name]]`.
  - Hard cap at 500 results.
  - *Should* filter out inactive records, but definitely doesn't respect things like email bounce or interest opt-outs.

## Caveat emptor
Aside from limiting which C360 groups are possible to query, be careful about the larger privacy implications here. Luminate can give you groups of campaign donors, task results, TeamRaiser participants, offline queries, import/exports, and even the specific answers to specific questions on a survey.

As mentioned earlier, our original use case for this technique was a public petition, where we had explicit permission to display participant names. Even then, I'm not so sure how GDRP would feel about how Luminate groups don't really have a graceful way for people to get themselves removed -- even interest categories have been known to contain the same constituent in both their opt-in and opt-out groups. LO Surveys can't even remove responses if the user account has been deleted from your system. 
