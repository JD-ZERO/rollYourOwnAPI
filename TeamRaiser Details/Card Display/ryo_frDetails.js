// reformat the base url so it contains the URL slug (for SEO purposes)
  function baseLink(json, page = 'entry', system = 'TR'){
    if( json["url-slug"] != '' && typeof json["url-slug"] != 'undefined' ){ var slug = '/' + json["url-slug"] }
    return '//support.zerocancer.org/site/' + system + '/endurance' + slug + '?fr_id=' + json["fr-id"] + '&pg=' + page;
  }
// check for an event icon in [[C1:sponsor_1]], and replace it with text title if undefined
  function eventHeader(json){
    if( json["GP-sponsor_1"] != '' ){
      return '<img src="' + json["GP-sponsor_1"] + '" alt="' + json["GP-event_title"] + '">'
    } else {
      return '<div style="padding:3rem 0 2rem">' + json["GP-event_title"] + '</div>'
    }
  }
// call the normal REST API, filtered to only return events that have open registration
  luminateExtend.api({
    api: 'teamraiser',
    data: 'method=getTeamraisersByInfo'
      + '&name=%25%25%25'
      + '&list_category_id=1141'      // TeamZERO security category to remove Run/Walk et al events
      + '&list_page_size=100'
      + '&list_filter_column=status'
      + '&list_filter_text=2'         // accepting registration and gifts
      + '&list_sort_column=event_date'
      + '&list_ascending=true'
      + '',
    callback: function(data){
      var reply = luminateExtend.utils.ensureArray(data.getTeamraisersResponse.teamraiser);
      $('<h2 id="future">Upcoming Events</h2>').appendTo('#events');
      $.each(reply, function(i, value){
        // if event still has open registration, but is in the past, don't put it in the "Upcoming Events" box
        var targetElem = ( new Date(this.event_date) >= new Date ) ? 'future' : 'past';
        $.get( 'https://support.zerocancer.org/site/SPageNavigator/ryo_tz_events?pgwrap=n&format=json&fr_id=' + this.id + '&callback=?',
          function(data){ $( '<div class="card ' + data["event-class"] + '">'
              + '<h3><a href="' + baseLink(data) + '">' + eventHeader(data) + '</a></h3>'
              + '<time>' + data["GP-event_date"] + '</time>'
              + '<nav>'
                + '<a class="button info" href="' + baseLink(data) + '">Details</a>'
                + '<a class="button action" href="' + baseLink(data, 'tfind', 'TRR') + '&fr_tm_opt=none">Register</a>'
              + '</nav>'
          ).insertAfter('h2#' + targetElem)}, 'json');
      });
    }
  });
// Same as above, but filtered to "accepting gifts only"
  luminateExtend.api({
    api: 'teamraiser',
    data: 'method=getTeamraisersByInfo'
      + '&name=%25%25%25'
      + '&list_category_id=1141'
      + '&list_page_size=100'
      + '&list_filter_column=status'
      + '&list_filter_text=3'
      + '&list_sort_column=event_date'
      + '&list_ascending=true'
      + '',
    callback: function(data){
      var reply = luminateExtend.utils.ensureArray(data.getTeamraisersResponse.teamraiser);
      $('<h2 id="past">Past Events</h2>').appendTo('#events');
      $.each(reply, function(i, value){
        var targetElem = ( new Date(this.event_date) >= new Date ) ? 'future' : 'past';
        $.get( 'https://support.zerocancer.org/site/SPageNavigator/ryo_tz_events?pgwrap=n&format=json&fr_id=' + this.id + '&callback=?',
          function(data){ $( '<div class="card ' + data["event-class"] + '">'
              + '<h3><a href="' + baseLink(data) + '">' + eventHeader(data) + '</a></h3>'
              + '<time>' + data["GP-event_date"] + '</time>'
              + '<nav>'
                + '<a class="button info" href="' + baseLink(data) + '">Details</a>'
                + '<a class="button action" href="' + baseLink(data, 'pfind')
                    + '&fr_search_type=participant&fr_find_search=Search'
                    + '&searchFirstName=&searchLastName=&submit=true">Runner List</a>'
              + '</nav>'
          ).insertAfter('h2#' + targetElem)}, 'json');
      });
    }
  });