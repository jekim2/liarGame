
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
    }



    // 그림그리기 plugin
    export function openPaintPlugin (settingInfos){
        var data = {
			id : "OPEN_PAINT",
			param : {
                callback : "SettingGames.paintCallback",
                category : settingInfos.category,
				keyword : settingInfos.keyword,
				total : settingInfos.people,
				spy : settingInfos.spy
			}
		}
        window.YBridge.callPlugin(JSON.stringify(data));
    }

    export function mobileCheck() {
        let check = false;
        const filter = 'win16 | win32 | win64 | mac | macintel';
        if ( navigator.platform ) {
          if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
            check = true;
          } else {
            check = false;
          }
      }
      return check;
    }
