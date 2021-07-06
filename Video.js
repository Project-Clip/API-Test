var { google } = require('googleapis');
var service = google.youtube('v3');

service.videos.list(
	{
		key: 'AIzaSyADYJgNuh0hvCN_07d4ZF4Snb9KficArr8', //googleAPI에서 부여받은 개인 key
		part: 'snippet,statistics', //요청할 정보 종류
		id: 't-0WD34AytM', //영상파일의 ID
		fields: 'items(snippet(title, description, channelId), statistics(viewCount, likeCount))', //id에서 가져올 정보(영상제목, 내용, 채널ID, 조회수, 좋아요 수)
	},
	function (err, response) {
		if (err) {
			//문제 있을 때
			console.log('The API returned an error:' + err);
			return;
		}
		var video = response.data.items;
		if (video.length == 0) {
			console.log('검색 결과 없음.');
		} else {
			console.log(JSON.stringify(response.data.items[0], null, 4)); //가져온 영상 정보 출력
		}
	},
);
