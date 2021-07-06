const { count } = require('console');
var { google } = require('googleapis');
var service = google.youtube('v3');

service.playlistItems.list(
	{
		playlistId: 'PLqqQvcAR1H0ksy7T-vGHDlbqGOCpx8OXC', //재생목록의 id값
		key: 'AIzaSyADYJgNuh0hvCN_07d4ZF4Snb9KficArr8', //googleAPI에서 부여받은 개인 key
		part: 'snippet',
		fields:
			'nextPageToken, pageInfo, items(id, snippet(title, channelId, resourceId(videoId), thumbnails(default(url))))',
		//api로 요청할 정보(영상의 고유ID, 채널ID, 영상파일의 ID,영상제목, 내용, 썸네일)
		maxResults: 30,
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
			let countVideo = 0;
			while (countVideo < 30) {
				console.log(JSON.stringify(response.data.items[countVideo], null, 4));
				countVideo++;
			}
		}
	},
);
