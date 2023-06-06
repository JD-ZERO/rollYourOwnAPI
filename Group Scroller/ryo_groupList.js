///////// example implementations of the Roll-Your-Own API group listing technique ////
// Just for the sake of demo, we'll do something simple.
  function outputFifth(data){
    // replace all of this with something that would actually update the page!
    console.log(data);
    console.log(data.results[4] + ' was the fifth person to register.');
    console.log('So far, ' + data.results.length +' folks have registered. Wow!');
  }

// Update these to your Luminate instance (NOTE: I'm only defining them here for the
// sake of easier understanding; usually I'd just put these directly into the scripts.
  const domain = "support.zerocancer.org";
  const ryoFile = "ryo_CMI";   // if you copied these files directly, you'd use ryo_groupList
  const exampleGroupID = "67063";

//////////// fetch API (simple JSON, but CORS policy needs to be allowed) ////////////
  async function getList(group_ID) {
    let url = `https://${domain}/site/SPageNavigator/${ryoFile}?pgwrap=n&gID=${group_ID}`
    return await fetch(url).then( response => response.json() );
  }
  getList(exampleGroupID).then( data => outputFifth(data) );


//////////// fetch API (JSONP callback for off-CORS needs) ///////////////////////////
  async function getListCallback(group_ID, callback) {
    let script = document.createElement('script');
    script.src = `https://${domain}/site/SPageNavigator/${ryoFile}?pgwrap=n&gID=${group_ID}&callback=${callback}`;
    document.body.appendChild(script);
  }
  getListCallback(exampleGroupID, "outputFifth");


//////////// jQuery //////////////////////////////////////////////////////////////////
  $.getJSON(
    "https://" + domain + "/site/SPageNavigator/" + ryoFile + "?pgwrap=n&gID=" + exampleGroupID + "&callback=?",
    getList(exampleGroupID)
  );