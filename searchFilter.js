var searchPlugin = function($) {
		var defaultSearchText = "Available players";
		var $searchBox = $('input.search-box');

		/**
		 * hide the default search box text
		 * if the search box contains it
		 */
		var hideDefaultSearchText = function() {
				var isDefaultTextActive = $searchBox.val() === defaultSearchText ? true : false
				if (isDefaultTextActive) $searchBox.attr("value", "");
			}

			/**
			 * show the default search box
			 * text if the search box is empty
			 */
		var showDefaultSearchText = function() {
				var isSearchBoxEmpty = $searchBox.val().length === 0 ? true : false
				if (isSearchBoxEmpty) $searchBox.val(defaultSearchText);
			}

		var filterViewThumb = function() {

				var sSearchText = $searchBox.val().toLowerCase();
				var $playersToHide = new Array;
				var $playersToShow = new Array;

				$("body").find("h3.name").each(function(i) {
					var sPlayerName = $(this).html().split(/<br\b[^>]*>/);
					var sFullName = (sPlayerName[0] + " " + sPlayerName[1]).toLowerCase();
					var $playerToToggle = $(this).parents('li');

					var isNameInSearchString = sFullName.search(sSearchText);
					var isSeachBoxEmpty = sSearchText.length === 0 ? true : false;

					// show all if empty text
					if (isSeachBoxEmpty) $playersToShow.push($playerToToggle[0]);
					// hide players if they do not match
					else if (isNameInSearchString == -1) $playersToHide.push($playerToToggle[0]);
					// show players if they are a match
					else if (isNameInSearchString > -1) $playersToShow.push($playerToToggle[0]);
				});

				// hide players
				$($playersToHide).fadeOut('slow');
				// show players
				$($playersToShow).fadeIn('slow');

		}

		var init = function() {
				$searchBox.focusin(hideDefaultSearchText);
				$searchBox.focusout(showDefaultSearchText);
				$searchBox.keyup(filterViewThumb);
			}

		var oPublic = {
			'init': init
		};

		return oPublic;

	}(jQuery);

$(document).ready(function() {
	searchPlugin.init();
});
