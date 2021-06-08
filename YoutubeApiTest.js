var { google } = require('googleapis');
var fs = require('fs');

var service = google.youtube('v3');
service.videos.list(
	{
		key: 'AIzaSyADYJgNuh0hvCN_07d4ZF4Snb9KficArr8',
		part: 'snippet,statistics',
		id: 't-0WD34AytM',
		fields:
			'items(snippet(title, description, channelId), statistics(viewCount, likeCount, commentCount))',
	},
	function (err, response) {
		if (err) {
			console.log('The ApI returned an error:' + err);
			return;
		}
		var video = response.data.items;
		if (video.length == 0) {
			console.log('검색 결과 없음.');
		} else {
			console.log(JSON.stringify(response.data.items[0], null, 4));
		}
	},
);
