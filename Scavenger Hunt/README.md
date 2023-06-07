# Scavenger Hunt
In short, a hard-coded quiz powered by the RYO technique. 

Used by our welcome committee session to kick off bbDevDays with a scavenger hunt across SpatialChat that would encourage users to use the software platform's features. Folks would hunt across the software to find an answer, then return to our form and enter the keyword for the next clue.

## Technique
Like any other RYO API, the idea is to have our PageBuilder page use `[[S334:q]]` to check the URL parameter, then use said param to process its response. In this case, it's a simple conditional check to return a hard-coded response.

You'll see two files, both of which were hosted on our LO instance:
- **scavenger.html:** iFrame embed on the remote platform. Simple HTML form, submit triggers our script. The JavaScript is a `fetch()` request. If the RYO API returns a blank response, it updates `#errMsg` with a random selection from the JS array. If RYO gives a good answer, it clears the error and updates `#guessResult`.

## Other notes
The quiz started with a YouTube video that mentioned a well-known meme user within the RE NXT community.
- Q1: To demonstrate the platform's room features, correct answer was a string from the middle of the room name where a meme user was stationed.
  - Note the conditional format `[[?[[S334:q]]::found::`. That's a _fuzzy_ match (I can't remember the word, but to avoid capitalization and misspelling issues I made a correct answer a string from the _middle_ of a longer word). 
- Q2: To demonstrate P2P interaction, correct answer "dapper" showed as a standing image within the meme user's video chat.
  - Note how this conditional starts with `[[?xdapperx::x[[S334:q]]x::`. That's an _exact_ match check.
- Q3: To encourage room exploration, the clue referenced a colorful combination of numbers. Each room on the platform had a colored box with a number and a letter combo. Finding the correct color/number combos gave users the correct answer of "impact."
- Q4: No repo for this one, but I'd [forked a wordl clone](https://github.com/lynn/hello-wordl), edited its UX to remove unnecessary elements, and edited its dictionary to remove all words except for "donor."
- Q5: The form time-stamped submissions so conference organizers could identify who gets the prize.