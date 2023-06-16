# TeamRaiser Details
If you can do it with an S-Tag or hard code it, you can output whatever format and whatever content you like. Make a JSON that mixes and matches constituent and TR data, without multiple calls to the [Luminate REST API](https://developer.blackbaud.com/lo-api/loapi). Make an XML and include authentication requirements. Return a simple plaintext reply. Really flexible and useful.

## In this Repo
- **ryo_slack**: Proof of concept for getting a simple response from a simple request about the status of a specified event. Intended for a slack bot that is just smart enough to ask a question and return a text string.
- **ryo_getTeamraisersByCustom**: An "everything you want to know about this exact single event" method that is sorely lacking within the LO REST API.
- **Card Display**: Request endpoint includes a "format" parameter, letting you get a detailed JSON or the specific HTML you want to render to page. Was used on our endurance website to dynamically create event detail cards for future/past TeamRaisers.

## Implementation
### ryo_getTeamraisersByCustom
LO REST API's [getTeamraisersByInfo](https://developer.blackbaud.com/lo-api/loapi/teamraiser/getTeamraisersByInfo) method is wide, not deep. Its goal is a list of events with enough basics for you to build a display of what's going on with your particular event series. But odds are you'll end up needing to at least feed each response's zip code to [getTeamraisersByDistance](https://developer.blackbaud.com/lo-api/loapi/teamraiser/getTeamraisersByDistance) for obvious details like amount raised.

`ryo_getTeamraisersByCustom` is pretty much drop-in ready, just save it to PageBuilder. If you're on a TeamRaiser greeting page, `[[S11:201]]/ryo_getTeamraisersByCustom?pgwrap=n&trID=[[S334:fr_id]]` should always return what you're looking for. Or, test it out yourself by filling in the blanks and requesting `https://_______________/site/SPageNavigator/ryo_getTeamraisersByCustom?pgwrap=n&trID=____`.

### Card Display
See the README in that folder.

### ryo_slack ###
Nothing that fancy, just a demo to make a point that we don't always need to ask for a big fancy result. In this example, all we're doing is giving it an event ID and getting back "*city* was on *date* and raised *amount*." I've got a simple check to return an error if the user provided an invalid ID, but that's about it.

The original setup was a proof of concept slack bot that accepted a `/tr_info ____` chat command. The slack app gave that ID to [Zapier](https://zapier.com), which sent a POST to `support.zerocancer.org/site/SPageNavigator/ryo_slack?pgwrap=n&fr_id=____`. LO responded to the Zap, which passed back to slack, and the bot replied to the user with the result.

## Other notes
I haven't coded it out for this repo, but this same basic concept can be really powerful for returning a deeper version of [getParticipants](https://developer.blackbaud.com/lo-api/loapi/teamraiser/getParticipants). [[[E48:[[S334:fr_id]]-[[S334:cons_id]]:cons._______]]](https://webfiles.blackbaud.com/files/support/helpfiles/luminate-online/help/luminateonline.html#../Subsystems/S-Tags/Content/S-Tags/S48_TeamRaiser_Participant.html?TocPath=S-Tags%257CTeamRaiser%2520S-Tags%257C_____8) is basically the same thing as [[S1:_______]]. It probably should go without saying, but be **_VERY CAREFUL_** with that thought.