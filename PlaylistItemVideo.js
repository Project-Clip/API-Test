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
		//api로 요청할 정보(영상의 고유ID, 채널ID, 재생목록 제목, 내용, , 재생목록 업로드 날짜, 채널 이름, 카테고리, 썸네일 : default는 썸네일의 기본해상도입니다. 고해상도의 이미지를 원하면 default를 high로 바꾸시면 됩니다.)
		maxResults: 2,
	},
	function (err, response) {
		if (err) {
			//에러 났을 때
			console.log('The API returned an error : ' + err);
			return;
		}
		var playlist = response.data.items; //요청한 정보
		if (playlist.length == 0) {
			// 가져온거 없을 때
			console.log('검색 결과 없음.');
		} else {
			let countPlaylist = 0;
			console.log('검색 결과 값 : ' + playlist.length); //검색된 재생목록의 수
			while (countPlaylist < playlist.length) {
				console.log('재생목록 id : ' + playlist[countPlaylist].id);
				console.log('생성 날짜 : ' + playlist[countPlaylist].snippet.publishedAt);
				console.log('채널 id : ' + playlist[countPlaylist].snippet.channelId);
				console.log('제목 : ' + playlist[countPlaylist].snippet.title);
				console.log('설명 : ' + playlist[countPlaylist].snippet.description);
				console.log('썸네일 : ' + playlist[countPlaylist].snippet.thumbnails.high.url);
				console.log('채널 이름 : ' + playlist[countPlaylist].snippet.channelTitle);
				// console.log(playlist[countPlaylistVideoList].snippet.tags);
				let playlistId = playlist[countPlaylist].id;
				service.playlistItems.list(
					{
						playlistId: playlistId, //재생목록의 id값
						key: 'AIzaSyADYJgNuh0hvCN_07d4ZF4Snb9KficArr8', //googleAPI에서 부여받은 개인 key
						part: 'snippet',
						fields: 'nextPageToken, pageInfo, items(id, snippet(channelId, resourceId(videoId)))',
						//api로 요청할 정보(영상의 고유ID, 채널ID, 영상 ID)
						maxResults: 5,
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
							let countPlaylistVideo = 0; //가져올 영상번호
							while (countPlaylistVideo < video.length) {
								console.log('채널 id : ' + video[countPlaylistVideo].snippet.channelId);
								console.log('영상 id : ' + video[countPlaylistVideo].snippet.resourceId.videoId);
								countPlaylistVideo++;
							}
						}
					},
				);
				countPlaylist++;
			}
		}
	},
);
