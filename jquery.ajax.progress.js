/**
 * jQuery Progress Events 
 * 
 * Allows to bind event handlers to XHR2 upload/download progress events
 *
 * @author by Christian Velazquez
 * @version 0.1
 * @link https://github.com/cvelazquez/jquery.ajax.progress
 */
(function($){
	"use strict";
	var o = $.ajax;
	$.ajax = function(url, options){
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}
		options: options || {};
		options.listener = {};
		$(options.listener).on('downloading', function(_, e){
			$(jqXHR).trigger('downloading', [e]);
		});
		$(options.listener).on('uploading', function(_, e){
			$(jqXHR).trigger('uploading', [e]);
		});
		var jqXHR = o(options);
		return jqXHR;
	}

	var xhr = $.ajaxSettings.xhr;
	$.ajaxSetup({
		xhr: function() {
			var req = xhr(), that = this;
			if (req) {
				if (typeof req.addEventListener == "function") {
					req.addEventListener("progress", function(e) {
						$(that.listener).trigger('downloading', [e]);
					}, false);
				}
				if (typeof req.upload == "object") {
					req.upload.addEventListener("progress", function(e) {
						$(that.listener).trigger('uploading', [e]);
					}, false);
				}
			}
			return req;
		}
	});
})(jQuery);
