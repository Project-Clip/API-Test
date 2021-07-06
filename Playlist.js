var { google } = require('googleapis');
var service = google.youtube('v3');

service.playlistItems.list(
	//재생목록에 포함 된 영상정도 가져오기
	{
		playlistId: 'PLqqQvcAR1H0ksy7T-vGHDlbqGOCpx8OXC', //재생목록의 id값
		key: 'AIzaSyADYJgNuh0hvCN_07d4ZF4Snb9KficArr8', //googleAPI에서 부여받은 개인 key
		part: 'snippet',
		fields:
			'nextPageToken, pageInfo, items(id, snippet(channelId, resourceId(videoId), title, description, thumbnails(default(url))) ,contentDetails(videoId))', //api로 요청할 놈들
		maxResults: 30,
	},
	function (err, response) {
		if (err) {
			//에러 났을 때
			console.log('The API returned an error:' + err);
			return null;
		}
		let playlistVideo = response.data.items; //요청한 영상의 정보
		// console.log( JSON.stringify(playlist[0].snippet.resourceId.videoId));
		if (playlistVideo.length == 0) {
			//재생목록안에 동영상이 없을 때
			console.log('검색 결과 없음.');
			return null;
		} else {
			let countPlaylistVideoList = 0;
			while (countPlaylistVideoList < playlistVideo.length) {
				let videoId = playlistVideo[countPlaylistVideoList].snippet.resourceId.videoId;
				console.log(JSON.stringify(playlistVideo[countPlaylistVideoList], null, 4));

				service.videos.list(
					//하나의 영상 세부정보 가져오기
					{
						key: 'AIzaSyADYJgNuh0hvCN_07d4ZF4Snb9KficArr8', //googleAPI에서 부여받은 개인 key
						part: 'snippet,statistics',
						id: videoId, //동영상 id
						fields:
							'items(snippet(title, publishedAt ,description, channelId), statistics(viewCount, likeCount, commentCount))', //id에서 가져올 array,
					},
					function (err, response) {
						if (err) {
							console.log('The API returned an error:' + err);
							return null;
						}
						let video = response.data.items;
						if (video.length == 0) {
							console.log('검색 결과 없음.');
						} else {
							console.log('비디오 목록 호출 성공');
							console.log(JSON.stringify(video, null, 4));
						}
					},
				);

				countPlaylistVideoList++;
			}
		}
	},
);
