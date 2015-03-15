# jquery.ajax.progress
Allows to bind event handlers to XHR2 upload/download **progress events**.
Based on nebirhos script (https://gist.github.com/nebirhos/3892018)

These events are: `downloading` and `uploading`

Example code for `downloading` event:
```javascript
var jqXHR = $.get('www.somedomain.com/largefile.avi', function(response){
	/* do anything on finish */
});

$(jqXHR).on('downloading', function(proxyEvent, event){
	if (event.lengthComputable) {
		// You can do anything here
		console.log("Downloaded " + parseInt( (event.loaded / event.total * 100), 10) + "%");
	}
});
```

Example code for `uploading` event:
```javascript
var jqXHR = $.post('www.somedomain.com', {data:"real long data, o maybe a file upload"}, function(response){
	/* do anything on finish */
});

$(jqXHR).on('uploading', function(proxyEvent, event){
	if (event.lengthComputable) {
		// You can do anything here
		console.log("Uploaded " + parseInt( (event.loaded / event.total * 100), 10) + "%");
	}
});
```
