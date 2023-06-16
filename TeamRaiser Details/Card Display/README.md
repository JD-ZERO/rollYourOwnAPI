# Card Display
Output a list of events on a landing page for a multi-TeamRaiser event series. Actively used on teamzero.run to show our future/past events.

Aside from having the exact format I planned on rendering to page, this custom endpoint also does some processing to return C1 tags that you can't get from `getTeamraisersByInfo` (e.g. sponsor images), as well as to reformat the output of some standard S42 tags.

## Implementation
Like most of the examples in this repo, I recommend using them as inspiration instead of trying to refactor it directly. To that end, here's what the various files are doing:

- **ryo_frlist**: RYO API Pagebuilder content. At minimum, the request must include an `fr_id` param, but it'll also accept:
  - `&format=` anything other than json in the URL will cause the endpoint to return HTML that formats a card (w/ css class reflecting event type). Details in the card are limited to: event name, an event image (from the *C1:sponsor_1*]]*), and links to the event info and registration pages (if event is open for registration).
  - `&format=json` A more detailed response, including things like *S42:0:customized-url* with the base URL removed.
  - `&callback=_____` Outputs JSONP instead of JSON, for when you need to use off-site and avoid CORS errors.
- **ryo_frDetails.js**: A snippet of the blueprint code, which renders at the end of the document (just *above* the `</BODY>` tag) on the listing page. Uses LuminateExtend.js to get a list of future/past events and renders them to page.

## What are `url-slug` and `event-class` in that JSON response?
In my particular application, we've got a color-coded ribbon on each event card that outputs the public event type. Our JSON response is pulling the public event type from step 1 of the TeamRaiser admin event editing workfow, then using S130 to trim down to an abbreviation for that purpose.

The slug is doing something similar, but this time it's grabbing step 14's custom URL and stripping out the base url so we can insert that keyword into the event greeting page. Since that's not a required field, we need to check whether it's defined or not.

What'd be even better? Knowing that Luminate generates some pretty ugly URLs (e.g. registration landing page is `https://event.yoursite.org/site/TRR/primary_event_type/sec_cat/123456789?fr_id=1234&pg=ptype`). With a captured event type, slug, and a registered domain that just redirects to your LO instance, you could make an event landing page something like `yoursite.alt/triathalon/ironman-kona`. Nice!

## Other Notes
Six years after having written this, I'm not sure why my javascript has two calls for future/past events instead of one. Or why I chose to make baselink() in my Javascript instead of just making each possible variation to the JSON object using s-tag conditionals.