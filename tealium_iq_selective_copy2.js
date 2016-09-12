(function() {

    var _functions = {
        'datasources': "DataSource",
        'loadrules': "LoadRule",
        'tags': "Tag",
        'extensions': "Extension",
        'labels': "Label",
        //'mappings': "MappingById"
    };

    var _get_functions = {
        'datasources': "Variable",
        'loadrules': "LoadruleById",
        'tags': "TagById",
        'extensions': "ExtensionById",
        'labels': "LabelById"
    };

    /* There may be some volativity here with CSS changes */
    var _targetContainer = {
        'datasources': "defineObjectsList",
        'loadrules': "loadrules_content",
        'tags': "manage_content",
        'extensions': "customize_content"
    };

    /* There may be some volativity here with CSS changes */
    var _inputPrefix = {
        'datasources': "label_select_checkbox_",
        'loadrules': "loadrules_bulk_select_",
        'tags': "manage_bulk_select_",
        'extensions': "customize_bulk_select_"
    };

    var _tabs = {
        'dashboard': "tabs_dashboard",
        'datasources': "tabs_define",
        'loadrules': "tabs_loadrules",
        'tags': "tabs_manage",
        'extensions': "tabs_customizations"
    };
		
    _doCopy = function() {
        var _arr;

        //First thing first clear the clipboard.
        utui.automator.emptyClipboard();

        // Iterate through Tabs
        $.each(["datasources", "loadrules", "tags", "extensions"], function(i, el) {

            var _target = el;

            _arr = $("div#" + _targetContainer[_target] + " input[id^='" + _inputPrefix[_target] + "']:checked");

            // Iterate through each item
            $.each(_arr, function(el, i) {

                var _id = $(this).val(),
                    _itemObj;

                if (isFinite(_id) && _id != "") { //Check for valid id
                    //Check for Labels
                    console.debug("Calling -->  utui.automator['get" + _get_functions[_target] + "'](" + _id + ")");
                    _itemObj = utui.automator["get" + _get_functions[_target]](Number(_id));
                    if (_itemObj.labels && _itemObj.labels !== "") {
                        $.each(_itemObj.labels.split(","), function(indx, _label) {
                            console.debug("Calling -->  utui.automator['copyLabel'](Number(" + _label + "))");
                            utui.automator["copyLabel"](Number(_label));
                        });
                    }
                    console.debug("Calling -->  utui.automator['copy" + _functions[_target] + "'](" + _id + ")");
                    //Call automator to copy selected target. Second arguemnet only relevent for copying tags
                    //This triggers a recursive copy.
                    utui.automator["copy" + _functions[_target]](_id, true);
                    console.debug("Clipboard -->  ", utui.automator.clipboard);
                }
            });
        });

    };

    _doPaste = function() {
        console.debug("Calling -->  utui.automator[processClipboard]");
        utui.automator.processClipboard();
    }
		
		_updateList = function() {
			jQuery("[id*=manage_bulk_select_]:checked").each(function(){
				var title = jQuery(this).parentsUntil("h3").find(".container_title");
				jQuery("#selected").append('<li class="list-group-item">'+ title +'</li>');
			});
		}

    window._tt_copy = _doCopy.bind(this);
    window._tt_paste = _doPaste.bind(this);
    window._tt_update_list = _updateList.bind(this);
}());

tealiumTools.send({}); 