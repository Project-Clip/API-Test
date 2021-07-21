const { count } = require('console');
var { google } = require('googleapis');
var service = google.youtube('v3');

service.playlists.list(
	{
		key: 'AIzaSyADYJgNuh0hvCN_07d4ZF4Snb9KficArr8', //googleAPI에서 부여받은 개인 keyz
		channelId: 'UCid83oPnsL-4ZEo8CyQr6Rg', //플레이리스트 오리지널의 id값
		part: 'snippet',
		fields:
			'nextPageToken, items(id, snippet(title, description, publishedAt, channelId, channelTitle, tags(), thumbnails(high(url))))',
		//api로 요청할 정보(영상의 고유ID, 채널ID, 영상파일의 ID,영상제목, 내용, 썸네일 : default는 썸네일의 기본해상도입니다. 고해상도의 이미지를 원하면 default를 high로 바꾸시면 됩니다.)
		maxResults: 50,
	},
	function (err, response) {
		if (err) {
			//에러 났을 때
			console.log('The API returned an error : ' + err);
			return;
		}
		var playlist = response.data.items;
		if (playlist.length == 0) {
			// 가져온거 없을 때
			console.log('검색 결과 없음.');
		} else {
			let countPlaylistVideoList = 0;
			console.log('검색 결과 값 : ' + playlist.length);
			while (countPlaylistVideoList < playlist.length) {
				console.log('재생목록 id : ' + playlist[countPlaylistVideoList].id);
				console.log('생성 날짜 : ' + playlist[countPlaylistVideoList].snippet.publishedAt);
				console.log('채널 id : ' + playlist[countPlaylistVideoList].snippet.channelId);
				console.log('제목 : ' + playlist[countPlaylistVideoList].snippet.title);
				console.log('설명 : ' + playlist[countPlaylistVideoList].snippet.description);
				console.log('썸네일 : ' + playlist[countPlaylistVideoList].snippet.thumbnails.high.url);
				console.log('채널 이름 : ' + playlist[countPlaylistVideoList].snippet.channelTitle);
				// console.log(playlist[countPlaylistVideoList].snippet.tags);
				countPlaylistVideoList++;
			}
		}
	},
);
