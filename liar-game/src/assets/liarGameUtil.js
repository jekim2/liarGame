// (function($, undefined)


// class liarGameUtil extends Component {

    // callPlugin(data){
    //     var bridge = window.YBridge;

    //     bridge.callPlugin(JSON.stringify(data));
    // }

    // 키워드 맞추기 plugin
    export function showKeywordPlugin(settingInfos){

		var data = {
            id : "SHOW_KEYWORD",
            param : {
                callback : "SettingGames.keywordCallback",
				category : settingInfos.category,
				keyword : settingInfos.keyword,
				total : settingInfos.people,
				spy : settingInfos.spy
            }
        };
        window.YBridge.callPlugin(JSON.stringify(data));
        // this.callPlugin(data);
    }

    // export function testCallback(res){
    //     console.log('callback res >>> ' , JSON.stringify(res));
    // }



    // 그림그리기 plugin
    export function openPaintPlugin (settingInfos){
        var data = {
			id : "OPEN_PAINT",
			param : {
                callback : "callback",
                total : settingInfos.people,
			}
		}
        window.YBridge.callPlugin(JSON.stringify(data));
    }

// }


    // liarGameUtil.callPlugin = function(data){
    //     var bridge = window.YBridge;

    //     bridge.callPlugin(JSON.stringify(data));
    // }

    // // 게임하기 plugin
    // liarGameUtil.showKeywordPlugin(settingInfos) = function() {
	// 	var data = {
	// 		id : "SHOW_KEYWORD",
	// 		param : {
	// 			callback : "callback",
	// 			category : keyword.category,
	// 			keyword : settingInfos.keyword,
	// 			total : settingInfos.people,
	// 			spy : settingInfos.spy
	// 		}
	// 	}
    //     liarGameUtil.callPlugin(data);
    // }

    // // 그림그리기 plugin
    // liarGameUtil.showSettingViewPlugin = function() {
    //     var data = {
	// 		id : "SHOW_SETTING_VIEW",
	// 		param : {
	// 			callback : "callback"
	// 		}
	// 	}
    //     liarGameUtil.callPlugin(data);
    // }

// })(jQuery, undefined);