const { count } = require('console');
var { google } = require('googleapis');
var service = google.youtube('v3');

service.playlistItems.list(
	{
		playlistId: 'PL920OTfqSyzcyEAPWvePd5leialysnmJb', //재생목록의 id값
		key: 'AIzaSyADYJgNuh0hvCN_07d4ZF4Snb9KficArr8', //googleAPI에서 부여받은 개인 key
		part: 'snippet',
		fields: 'nextPageToken, pageInfo, items(id, snippet(channelId, resourceId(videoId)))',
		//api로 요청할 정보(영상의 고유ID, 채널ID, 영상 ID)
		maxResults: 50,
	},
	function (err, response) {
		if (err) {
			//에러 났을 때
			console.log('The API returned an error:' + err);
			return;
		}
		var video = response.data.items;
		if (video.length == 0) {
			// 가져온거 없을 때
			console.log('검색 결과 없음.');
		} else {
			let countPlaylistVideoList = 0; //가져올 영상번호
			while (countPlaylistVideoList < video.length) {
				console.log('채널 id : ' + video[countPlaylistVideoList].snippet.channelId);
				console.log('영상 id : ' + video[countPlaylistVideoList].snippet.resourceId.videoId);
				countPlaylistVideoList++;
			}
		}
	},
);
