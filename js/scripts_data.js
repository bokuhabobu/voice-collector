/**
 * scripts_data.js - Prompt Scripts Dataset synchronized with stt_app
 * Fully matches stt_app (lib/models/script_data.dart & lib/main.dart)
 */

export const defaultScripts = {
  ja: [
    // 短文テスト (5件)
    {
      id: "SHORT-JA-01",
      category: "short",
      title: "短文テスト",
      text: "これから音声認識テストをはじめます。",
      ruby: "これから<ruby>音声<rt>おんせい</rt></ruby><ruby>認識<rt>にんしき</rt></ruby>テストをはじめます。"
    },
    {
      id: "SHORT-JA-02",
      category: "short",
      title: "短文テスト",
      text: "今日は朝からとてもいい天気です。",
      ruby: "<ruby>今日<rt>きょう</rt></ruby>は<ruby>朝<rt>あさ</rt></ruby>からとてもいい<ruby>天気<rt>てんき</rt></ruby>です。"
    },
    {
      id: "SHORT-JA-03",
      category: "short",
      title: "短文テスト",
      text: "おはようございます。今日もよろしくお願いいたします。",
      ruby: "おはようございます。<ruby>今日<rt>きょう</rt></ruby>もよろしくお<ruby>願<rt>ねが</rt></ruby>いいたします。"
    },
    {
      id: "SHORT-JA-04",
      category: "short",
      title: "短文テスト",
      text: "ちょっと疲れたので少し休憩します。",
      ruby: "ちょっと<ruby>疲<rt>つか</rt></ruby>れたので<ruby>少<rt>すこ</rt></ruby>し<ruby>休憩<rt>きゅうけい</rt></ruby>します。"
    },
    {
      id: "SHORT-JA-05",
      category: "short",
      title: "短文テスト",
      text: "今日のお昼ご飯は何を食べようかな。",
      ruby: "<ruby>今日<rt>きょう</rt></ruby>のお<ruby>昼<rt>ひる</rt></ruby>ご<ruby>飯<rt>はん</rt></ruby>は<ruby>何<rt>なに</rt></ruby>を<ruby>食<rt>た</rt></ruby>べようかな。"
    },

    // 現場交信・指令シミュレーション (5件)
    {
      id: "JA-01",
      category: "command",
      title: "現場交信・指令シミュレーション",
      text: "高知消防から高知救急1、一般加入電話による救急出動。現場は高知市春野町芳原1023番地、急病。どうぞ。",
      ruby: "<ruby>高知<rt>こうち</rt></ruby><ruby>消防<rt>しょうぼう</rt></ruby>から<ruby>高知<rt>こうち</rt></ruby><ruby>救急<rt>きゅうきゅう</rt></ruby>1、<ruby>一般<rt>いっぱん</rt></ruby><ruby>加入<rt>かにゅう</rt></ruby><ruby>電話<rt>でんわ</rt></ruby>による<ruby>救急<rt>きゅうきゅう</rt></ruby><ruby>出動<rt>しゅつどう</rt></ruby>。<ruby>現場<rt>げんば</rt></ruby>は<ruby>高知市<rt>こうちし</rt></ruby><ruby>春野町<rt>はるのちょう</rt></ruby><ruby>芳原<rt>よしはら</rt></ruby>1023<ruby>番地<rt>ばんち</rt></ruby>、<ruby>急病<rt>きゅうびょう</rt></ruby>。どうぞ。"
    },
    {
      id: "JA-02",
      category: "command",
      title: "現場交信・指令シミュレーション",
      text: "高知救急1了解。現着後、直ちに傷病者接触を図る。以上、高知救急1。",
      ruby: "<ruby>高知<rt>こうち</rt></ruby><ruby>救急<rt>きゅうきゅう</rt></ruby>1<ruby>了解<rt>りょうかい</rt></ruby>。<ruby>現着後<rt>げんちゃくご</rt></ruby>、<ruby>直<rt>ただ</rt></ruby>ちに<ruby>傷病者<rt>しょうびょうしゃ</rt></ruby><ruby>接触<rt>せっしょく</rt></ruby>を<ruby>図<rt>はか</rt></ruby>る。<ruby>以上<rt>いじょう</rt></ruby>、<ruby>高知<rt>こうち</rt></ruby><ruby>救急<rt>きゅうきゅう</rt></ruby>1。"
    },
    {
      id: "JA-03",
      category: "command",
      title: "現場交信・指令シミュレーション",
      text: "至急、至急。高知救急1から高知消防。傷病者は60代男性、JCS300、自発呼吸微弱。近森病院ドクターカーの出動を要請されたい。どうぞ。",
      ruby: "<ruby>至急<rt>しきゅう</rt></ruby>、<ruby>至急<rt>しきゅう</rt></ruby>。<ruby>高知<rt>こうち</rt></ruby><ruby>救急<rt>きゅうきゅう</rt></ruby>1から<ruby>高知<rt>こうち</rt></ruby><ruby>消防<rt>しょうぼう</rt></ruby>。<ruby>傷病者<rt>しょうびょうしゃ</rt></ruby>は60<ruby>代<rt>だい</rt></ruby><ruby>男性<rt>だんせい</rt></ruby>、<ruby>JCS300<rt>ジェイシーエスさんびゃく</rt></ruby>、<ruby>自発<rt>じはつ</rt></ruby><ruby>呼吸<rt>こきゅう</rt></ruby><ruby>微弱<rt>びじゃく</rt></ruby>。<ruby>近森<rt>ちかもり</rt></ruby><ruby>病院<rt>びょういん</rt></ruby>ドクターカーの<ruby>出動<rt>しゅつどう</rt></ruby>を<ruby>要請<rt>ようせい</rt></ruby>されたい。どうぞ。"
    },
    {
      id: "JA-04",
      category: "command",
      title: "現場交信・指令シミュレーション",
      text: "至急報、高知消防です。了解、近森病院へドクターカー要請を行う。しばらく待て。",
      ruby: "<ruby>至急報<rt>しきゅうほう</rt></ruby>、<ruby>高知<rt>こうち</rt></ruby><ruby>消防<rt>しょうぼう</rt></ruby>です。<ruby>了解<rt>りょうかい</rt></ruby>、<ruby>近森<rt>ちかもり</rt></ruby><ruby>病院<rt>びょういん</rt></ruby>へドクターカー<ruby>要請<rt>ようせい</rt></ruby>を<ruby>行<rt>おこな</rt></ruby>う。しばらく<ruby>待<rt>ま</rt></ruby>て。"
    },
    {
      id: "JA-05",
      category: "command",
      title: "現場交信・指令シミュレーション",
      text: "高知消防から高知救急1。近森病院ドクターカー出動。ドッキングポイントは春野町西分15号線沿いスーパー駐車場とする。どうぞ。",
      ruby: "<ruby>高知<rt>こうち</rt></ruby><ruby>消防<rt>しょうぼう</rt></ruby>から<ruby>高知<rt>こうち</rt></ruby><ruby>救急<rt>きゅうきゅう</rt></ruby>1。<ruby>近森<rt>ちかもり</rt></ruby><ruby>病院<rt>びょういん</rt></ruby>ドクターカー<ruby>出動<rt>しゅつどう</rt></ruby>。ドッキングポイントは<ruby>春野町<rt>はるのちょう</rt></ruby><ruby>西分<rt>にしぶん</rt></ruby>15<ruby>号線<rt>ごうせん</rt></ruby><ruby>沿<rt>ぞ</rt></ruby>いスーパー<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>とする。どうぞ。"
    },

    // 音声認識精度・音素バランス評価 (5件)
    {
      id: "JA-21",
      category: "phonetic",
      title: "音声認識精度・音素バランス評価",
      text: "あらゆる現実を、すべて自分のほうへねじ曲げたのだ。",
      ruby: "あらゆる<ruby>現実<rt>げんじつ</rt></ruby>を、すべて<ruby>自分<rt>じぶん</rt></ruby>のほうへねじ<ruby>曲<rt>ま</rt></ruby>げたのだ。"
    },
    {
      id: "JA-22",
      category: "phonetic",
      title: "音声認識精度・音素バランス評価",
      text: "通称『バタンガス捕虜収容所』の朝食は午前七時である。",
      ruby: "<ruby>通称<rt>つうしょう</rt></ruby>『バタンガス<ruby>捕虜<rt>ほりょ</rt></ruby><ruby>収容所<rt>しゅうようじょ</rt></ruby>』の<ruby>朝食<rt>ちょうしょく</rt></ruby>は<ruby>午前<rt>ごぜん</rt></ruby><ruby>七時<rt>しちじ</rt></ruby>である。"
    },
    {
      id: "JA-23",
      category: "phonetic",
      title: "音声認識精度・音素バランス評価",
      text: "やがて証拠の書類や物品が押収され、諸君は取調べのため国税局へ連行される。",
      ruby: "やがて<ruby>証拠<rt>しょうこ</rt></ruby>の<ruby>書類<rt>しょるい</rt></ruby>や<ruby>物品<rt>ぶっぴん</rt></ruby>が<ruby>押収<rt>おうしゅう</rt></ruby>され、<ruby>諸君<rt>しょくん</rt></ruby>は<ruby>取調<rt>とりしら</rt></ruby>べのため<ruby>国税局<rt>こくぜいきょく</rt></ruby>へ<ruby>連行<rt>れんこう</rt></ruby>される。"
    },
    {
      id: "JA-24",
      category: "phonetic",
      title: "音声認識精度・音素バランス評価",
      text: "先生の白い額は油を塗ったように光っていて、ときどき青い縦縞が浮く。",
      ruby: "<ruby>先生<rt>せんせい</rt></ruby>の<ruby>白<rt>しろ</rt></ruby>い<ruby>額<rt>ひたい</rt></ruby>は<ruby>油<rt>あぶら</rt></ruby>を<ruby>塗<rt>ぬ</rt></ruby>ったように<ruby>光<rt>ひか</rt></ruby>っていて、ときどき<ruby>青<rt>あお</rt></ruby>い<ruby>縦縞<rt>たてじま</rt></ruby>が<ruby>浮<rt>う</rt></ruby>く。"
    },
    {
      id: "JA-25",
      category: "phonetic",
      title: "音声認識精度・音素バランス評価",
      text: "軍馬と共に船底に押しこまれて運ばれることもあった。",
      ruby: "<ruby>軍馬<rt>ぐんば</rt></ruby>と<ruby>共<rt>とも</rt></ruby>に<ruby>船底<rt>ふなぞこ</rt></ruby>に<ruby>押<rt>お</rt></ruby>しこまれて<ruby>運<rt>はこ</rt></ruby>ばれることもあった。"
    },

    // 高知弁 (5件)
    {
      id: "KOCHI-01",
      category: "kochi",
      title: "高知弁",
      text: "今日飲みに行かんかえ？",
      ruby: "<ruby>今日<rt>きょう</rt></ruby><ruby>飲<rt>の</rt></ruby>みに<ruby>行<rt>い</rt></ruby>かんかえ？"
    },
    {
      id: "KOCHI-02",
      category: "kochi",
      title: "高知弁",
      text: "いろいろ話したいことがあるがよ",
      ruby: "いろいろ<ruby>話<rt>はな</rt></ruby>したいことがあるがよ"
    },
    {
      id: "KOCHI-03",
      category: "kochi",
      title: "高知弁",
      text: "このタタキ、こじゃんと美味しいちや",
      ruby: "このタタキ、こじゃんと<ruby>美味<rt>おい</rt></ruby>しいちや"
    },
    {
      id: "KOCHI-04",
      category: "kochi",
      title: "高知弁",
      text: "ごめんごめん、友達と行く約束しちゅうがやき",
      ruby: "ごめんごめん、<ruby>友達<rt>ともだち</rt></ruby>と<ruby>行<rt>い</rt></ruby>く<ruby>約束<rt>やくそく</rt></ruby>しちゅうがやき"
    },
    {
      id: "KOCHI-05",
      category: "kochi",
      title: "高知弁",
      text: "だいたいどれっぱあっかかります？",
      ruby: "だいたいどれっぱあっかかります？"
    },

    // 数字・単位 (5件)
    {
      id: "NUM-01",
      category: "number",
      title: "数字・単位",
      text: "今日の最高気温は28.5度で、最低気温は19.2度になる予報です",
      ruby: "<ruby>今日<rt>きょう</rt></ruby>の<ruby>最高<rt>さいこう</rt></ruby><ruby>気温<rt>きおん</rt></ruby>は28.5<ruby>度<rt>ど</rt></ruby>で、<ruby>最低<rt>さいてい</rt></ruby><ruby>気温<rt>きおん</rt></ruby>は19.2<ruby>度<rt>ど</rt></ruby>になる<ruby>予報<rt>よほう</rt></ruby>です"
    },
    {
      id: "NUM-02",
      category: "number",
      title: "数字・単位",
      text: "この商品の価格は3980円で、消費税を含めると4378円です。",
      ruby: "この<ruby>商品<rt>しょうひん</rt></ruby>の<ruby>価格<rt>かかく</rt></ruby>は3980<ruby>円<rt>えん</rt></ruby>で、<ruby>消費税<rt>しょうひぜい</rt></ruby>を<ruby>含<rt>ふく</rt></ruby>めると4378<ruby>円<rt>えん</rt></ruby>です。"
    },
    {
      id: "NUM-03",
      category: "number",
      title: "数字・単位",
      text: "東京駅から目的地までは12.7キロメートルあり、車で約35分かかります",
      ruby: "<ruby>東京駅<rt>とうきょうえき</rt></ruby>から<ruby>目的地<rt>もくてきち</rt></ruby>までは12.7キロメートルあり、<ruby>車<rt>くるま</rt></ruby>で<ruby>約<rt>やく</rt></ruby>35<ruby>分<rt>ふん</rt></ruby>かかります"
    },
    {
      id: "NUM-04",
      category: "number",
      title: "数字・単位",
      text: "午前9時45分に出発して、午後１時２０分に到着する予定です。",
      ruby: "<ruby>午前<rt>ごぜん</rt></ruby>9<ruby>時<rt>じ</rt></ruby>45<ruby>分<rt>ふん</rt></ruby>に<ruby>出発<rt>しゅっぱつ</rt></ruby>して、<ruby>午後<rt>ごご</rt></ruby>１<ruby>時<rt>じ</rt></ruby>２０<ruby>分<rt>ぷん</rt></ruby>に<ruby>到着<rt>とうちゃく</rt></ruby>する<ruby>予定<rt>よてい</rt></ruby>です。"
    },
    {
      id: "NUM-05",
      category: "number",
      title: "数字・単位",
      text: "荷物の重さは2.35キログラムで、大きさは縦42センチ、横31センチ、高さ18センチです。",
      ruby: "<ruby>荷物<rt>にもつ</rt></ruby>の<ruby>重<rt>おも</rt></ruby>さは2.35キログラムで、<ruby>大<rt>おお</rt></ruby>きさは<ruby>縦<rt>たて</rt></ruby>42センチ、<ruby>横<rt>よこ</rt></ruby>31センチ、<ruby>高<rt>たか</rt></ruby>さ18センチです。"
    },

    // 長文 (5件)
    {
      id: "LONG-01",
      category: "long",
      title: "長文",
      text: "今朝はいつもより少し早く家を出たのですが、駅に到着してから電車が遅れていることに気づいたので、予定していた時間より少し遅れて到着しました。",
      ruby: "<ruby>今朝<rt>けさ</rt></ruby>はいつもより<ruby>少<rt>すこ</rt></ruby>し<ruby>早<rt>はや</rt></ruby>く<ruby>家<rt>いえ</rt></ruby>を<ruby>出<rt>で</rt></ruby>たのですが、<ruby>駅<rt>えき</rt></ruby>に<ruby>到着<rt>とうちゃく</rt></ruby>してから<ruby>電車<rt>でんしゃ</rt></ruby>が<ruby>遅<rt>おく</rt></ruby>れていることに<ruby>気<rt>き</rt></ruby>づいたので、<ruby>予定<rt>よてい</rt></ruby>していた<ruby>時間<rt>じかん</rt></ruby>より<ruby>少<rt>すこ</rt></ruby>し<ruby>遅<rt>おく</rt></ruby>れて<ruby>到着<rt>とうちゃく</rt></ruby>しました。"
    },
    {
      id: "LONG-02",
      category: "long",
      title: "長文",
      text: "明日の天気が良ければ午前中に買い物へ行き、そのあと友人と昼食を食べてから、夕方までに家へ戻る予定です。",
      ruby: "<ruby>明日<rt>あす</rt></ruby>の<ruby>天気<rt>てんき</rt></ruby>が<ruby>良<rt>よ</rt></ruby>ければ<ruby>午前中<rt>ごぜんちゅう</rt></ruby>に<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>へ<ruby>行<rt>い</rt></ruby>き、そのあと<ruby>友人<rt>ゆうじん</rt></ruby>と<ruby>昼食<rt>ちゅうしょく</rt></ruby>を<ruby>食<rt>た</rt></ruby>べてから、<ruby>夕方<rt>ゆうがた</rt></ruby>までに<ruby>家<rt>いえ</rt></ruby>へ<ruby>戻<rt>もど</rt></ruby>る<ruby>予定<rt>よてい</rt></ruby>です。"
    },
    {
      id: "LONG-03",
      category: "long",
      title: "長文",
      text: "新しいスマートフォンを購入したので、以前使っていた端末から写真や連絡先を移したのですが、一部のアプリだけ設定が引き継がれていませんでした。",
      ruby: "<ruby>新<rt>あたら</rt></ruby>しいスマートフォンを<ruby>購入<rt>こうにゅう</rt></ruby>したので、<ruby>以前<rt>いぜん</rt></ruby><ruby>使<rt>つか</rt></ruby>っていた<ruby>端末<rt>たんまつ</rt></ruby>から<ruby>写真<rt>しゃしん</rt></ruby>や<ruby>連絡先<rt>れんらくさき</rt></ruby>を<ruby>移<rt>うつ</rt></ruby>したのですが、<ruby>一部<rt>いちぶ</rt></ruby>のアプリだけ<ruby>設定<rt>せってい</rt></ruby>が<ruby>引<rt>ひ</rt></ruby>き<ruby>継<rt>つ</rt></ruby>がれていませんでした。"
    },
    {
      id: "LONG-04",
      category: "long",
      title: "長文",
      text: "昨日の会議では今後の予定についていくつか意見が出ましたが、全員の予定をもう一度確認する必要があるため、最終的な日程はまだ決まっていません。",
      ruby: "<ruby>昨日<rt>きのう</rt></ruby>の<ruby>会議<rt>かいぎ</rt></ruby>では<ruby>今後<rt>こんご</rt></ruby>の<ruby>予定<rt>よてい</rt></ruby>についていくつか<ruby>意見<rt>いけん</rt></ruby>が<ruby>出<rt>で</rt></ruby>ましたが、<ruby>全員<rt>ぜんいん</rt></ruby>の<ruby>予定<rt>よてい</rt></ruby>をもう<ruby>一度<rt>いちど</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>する<ruby>必要<rt>ひつよう</rt></ruby>があるため、<ruby>最終<rt>さいしゅう</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>日程<rt>にってい</rt></ruby>はまだ<ruby>決<rt>き</rt></ruby>まっていません。"
    },
    {
      id: "LONG-05",
      category: "long",
      title: "長文",
      text: "駅を出たら最初の交差点を右に曲がり、そのまましばらく直進すると左側にコンビニが見えるので、その建物の手前にある細い道を左に入ってください。",
      ruby: "<ruby>駅<rt>えき</rt></ruby>を<ruby>出<rt>で</rt></ruby>たら<ruby>最初<rt>さいしょ</rt></ruby>の<ruby>交差点<rt>こうさてん</rt></ruby>を<ruby>右<rt>みぎ</rt></ruby>に<ruby>曲<rt>ま</rt></ruby>がり、そのまましばらく<ruby>直進<rt>ちょくしん</rt></ruby>すると<ruby>左側<rt>ひだりがわ</rt></ruby>にコンビニが<ruby>見<rt>み</rt></ruby>えるので、その<ruby>建物<rt>たてもの</rt></ruby>の<ruby>手前<rt>てまえ</rt></ruby>にある<ruby>細<rt>ほそ</rt></ruby>い<ruby>道<rt>みち</rt></ruby>を<ruby>左<rt>ひだり</rt></ruby>に<ruby>入<rt>はい</rt></ruby>ってください。"
    }
  ],

  en: [
    // Short Test (7 items)
    { id: "SHORT-EN-01", category: "short", title: "Short Test", text: "Let's go ahead and start the voice recognition test." },
    { id: "SHORT-EN-02", category: "short", title: "Short Test", text: "It's turned out to be such a gorgeous morning today." },
    { id: "SHORT-EN-03", category: "short", title: "Short Test", text: "Good morning! Looking forward to working with you today." },
    { id: "SHORT-EN-04", category: "short", title: "Short Test", text: "I'm running a bit low on energy, gonna grab a quick coffee break." },
    { id: "SHORT-EN-05", category: "short", title: "Short Test", text: "Any thoughts on what we should grab for lunch today?" },
    { id: "SHORT-EN-06", category: "short", title: "Short Test", text: "Could you shoot me a quick message once you're free?" },
    { id: "SHORT-EN-07", category: "short", title: "Short Test", text: "Sorry about that, you cut out for a second. Could you repeat that?" },

    // Field communication / ICS simulation (6 items)
    { id: "EN-01", category: "command", title: "Field communication / ICS simulation", text: "Dispatch, Battalion 9, we have multiple calls reporting a loud explosion and heavy flames at 1240 Crestmoor Drive." },
    { id: "EN-02", category: "command", title: "Field communication / ICS simulation", text: "Battalion 52 on scene at 845 Elm Street. Multiple structures fully involved. Start a second alarm immediately." },
    { id: "EN-03", category: "command", title: "Field communication / ICS simulation", text: "Battalion 52, we have extreme heat on the Bravo exposure. Several blocks on fire at this time." },
    { id: "EN-04", category: "command", title: "Field communication / ICS simulation", text: "Command 31, can you start a third alarm? This is Battalion 9 on tactical Channel 4." },
    { id: "EN-05", category: "command", title: "Field communication / ICS simulation", text: "Battalion 52 to Dispatch: Setting up command post at 9th and Main. Establishing Crestmoor Incident Command." },
    { id: "EN-06", category: "command", title: "Field communication / ICS simulation", text: "Engine 4 on scene, two-story commercial structure with light smoke showing from side Alpha. Extending a primary attack line." },

    // Speech recognition / phonetic balance evaluation (Harvard Sentences) (6 items)
    { id: "EN-21", category: "phonetic", title: "Speech recognition / phonetic balance evaluation", text: "The birch canoe slid on the smooth planks." },
    { id: "EN-22", category: "phonetic", title: "Speech recognition / phonetic balance evaluation", text: "Glue the sheet to the dark blue background." },
    { id: "EN-23", category: "phonetic", title: "Speech recognition / phonetic balance evaluation", text: "It's easy to tell the depth of a well." },
    { id: "EN-24", category: "phonetic", title: "Speech recognition / phonetic balance evaluation", text: "These days a chicken leg is a rare dish." },
    { id: "EN-25", category: "phonetic", title: "Speech recognition / phonetic balance evaluation", text: "Rice is often served in round bowls." },
    { id: "EN-26", category: "phonetic", title: "Speech recognition / phonetic balance evaluation", text: "The box was thrown beside the parked truck." },

    // Numbers & Units (5 items)
    { id: "NUM-EN-01", category: "number", title: "Numbers / Units", text: "Today's forecast calls for a high of 28.5 degrees and a low of 19.2 degrees." },
    { id: "NUM-EN-02", category: "number", title: "Numbers / Units", text: "The item retails for 39 dollars and 80 cents, coming out to 43.78 with sales tax." },
    { id: "NUM-EN-03", category: "number", title: "Numbers / Units", text: "The distance to the destination is roughly 12.7 kilometers, which should take around 35 minutes by car." },
    { id: "NUM-EN-04", category: "number", title: "Numbers / Units", text: "We're scheduled to depart at 9:45 AM and arrive at 1:20 PM." },
    { id: "NUM-EN-05", category: "number", title: "Numbers / Units", text: "The package weighs 2.35 kilograms and measures 42 centimeters long by 31 centimeters wide and 18 centimeters high." },

    // Long Passage (5 items)
    { id: "LONG-EN-01", category: "long", title: "Long Passage", text: "I left home a bit earlier than usual this morning, but once I got to the station I found out the trains were delayed, so I ended up getting in slightly behind schedule." },
    { id: "LONG-EN-02", category: "long", title: "Long Passage", text: "If the weather stays nice tomorrow, I'm planning to go shopping in the morning, grab lunch with a friend, and head back home before evening." },
    { id: "LONG-EN-03", category: "long", title: "Long Passage", text: "I recently got a brand new smartphone and transferred all my photos and contacts over, but a few of the apps didn't carry over their account settings properly." },
    { id: "LONG-EN-04", category: "long", title: "Long Passage", text: "During yesterday's meeting we kicked around a few ideas for the upcoming schedule, but since we need to sync everyone's availability first, the final dates haven't been locked in yet." },
    { id: "LONG-EN-05", category: "long", title: "Long Passage", text: "Once you exit the station, take a right at the first intersection, walk straight for a couple of minutes until you spot a convenience store on your left, and then take a left down the narrow street just before it." }
  ],

  th: [
    // ประโยคสั้นทั่วไป (Short Sentences) (7 items)
    { id: "TH-SHORT-01", category: "short", title: "ประโยคสั้น", text: "เราจะเริ่มการทดสอบระบบรู้จำเสียงพูด ณ บัดนี้ครับ" },
    { id: "TH-SHORT-02", category: "short", title: "ประโยคสั้น", text: "วันนี้แดดดีและอากาศสดใสมากตั้งแต่ช่วงเช้าเลยครับ" },
    { id: "TH-SHORT-03", category: "short", title: "ประโยคสั้น", text: "สวัสดีตอนเช้าครับ วันนี้ขอฝากเนื้อฝากตัวด้วยนะครับ" },
    { id: "TH-SHORT-04", category: "short", title: "ประโยคสั้น", text: "เริ่มรู้สึกเหนื่อยล้านิดหน่อย ขอแวะพักดื่มกาแฟสักครู่หนึ่งครับ" },
    { id: "TH-SHORT-05", category: "short", title: "ประโยคสั้น", text: "มื้อเที่ยงวันนี้พวกเราจะออกไปหาอะไรทานกันดีครับ" },
    { id: "TH-SHORT-06", category: "short", title: "ประโยคสั้น", text: "ถ้าสะดวกแล้ว รบกวนช่วยส่งอีเมลแจ้งรายละเอียดกลับมาให้ผมหน่อยนะครับ" },
    { id: "TH-SHORT-07", category: "short", title: "ประโยคสั้น", text: "ขอโทษทีครับ เมื่อสักครู่สัญญาณขาดหายไป รบกวนช่วยพูดซ้ำอีกรอบได้ไหมครับ" },

    // การสื่อสารหน้างาน / ฉุกเฉิน (Field & Emergency) (6 items)
    { id: "TH-CMD-01", category: "command", title: "การสั่งการภาคสนาม", text: "ศูนย์วิทยุสื่อสาร แจ้งรถพยาบาล 1 มีเหตุฉุกเฉินได้รับแจ้งทางโทรศัพท์ ที่ถนนสุขุมวิท ซอย 55 ผู้ป่วยมีอาการหมดสติ เปลี่ยน" },
    { id: "TH-CMD-02", category: "command", title: "การสั่งการภาคสนาม", text: "รถพยาบาล 1 รับทราบ ถึงที่เกิดเหตุแล้วจะรีบเข้าช่วยเหลือผู้ป่วยทันที ทราบแล้วเปลี่ยน" },
    { id: "TH-CMD-03", category: "command", title: "การสั่งการภาคสนาม", text: "ด่วนที่สุด จากรถพยาบาล 1 ถึงศูนย์สั่งการ ผู้ป่วยชายอายุประมาณ 60 ปี หายใจแผ่วเบา ขอสนับสนุนทีมแพทย์กู้ชีพด่วน" },
    { id: "TH-CMD-04", category: "command", title: "การสั่งการภาคสนาม", text: "ศูนย์สั่งการรับทราบ กำลังประสานทีมแพทย์ฉุกเฉินเคลื่อนที่เร็วออกจากโรงพยาบาล โปรดรอสักครู่" },
    { id: "TH-CMD-05", category: "command", title: "การสั่งการภาคสนาม", text: "จุดนัดพบอยู่ที่บริเวณลานจอดรถหน้าซูเปอร์มาร์เก็ตริมถนนใหญ่ ยืนยันการเดินทาง" },
    { id: "TH-CMD-06", category: "command", title: "การสั่งการภาคสนาม", text: "หน่วยกู้ภัยพร้อมอุปกรณ์กู้ชีพเดินทางถึงพื้นที่ประสบภัยแล้ว กำลังเร่งตรวจสอบความปลอดภัยรอบอาคาร เปลี่ยน" },

    // สมดุลของเสียง (Phonetic Balance) (6 items)
    { id: "TH-PHON-01", category: "phonetic", title: "สมดุลของเสียง", text: "ใครขายไข่ไก่ ในป่าไผ่ใกล้บ้านผู้ใหญ่ลี" },
    { id: "TH-PHON-02", category: "phonetic", title: "สมดุลของเสียง", text: "เช้าฟาดผัดฟัก เย็นฟาดฟักผัด ติดขัดทุกคราวไป" },
    { id: "TH-PHON-03", category: "phonetic", title: "สมดุลของเสียง", text: "ยานพาหนะทุกคันต้องหยุดให้คนข้ามทางม้าลายอย่างปลอดภัย" },
    { id: "TH-PHON-04", category: "phonetic", title: "สมดุลของเสียง", text: "เอกสารและหลักฐานทั้งหมดถูกตรวจสอบอย่างละเอียดถี่ถ้วน" },
    { id: "TH-PHON-05", category: "phonetic", title: "สมดุลของเสียง", text: "การพัฒนาเทคโนโลยีปัญญาประดิษฐ์ต้องคำนึงถึงความปลอดภัยของข้อมูลเป็นสำคัญ" },
    { id: "TH-PHON-06", category: "phonetic", title: "สมดุลของเสียง", text: "กล้วยตานีปลายหวีเหี่ยว เหลือหวีเดียวหิ้วหวีเหี่ยวไปหิ้วหวีเหี่ยวมา" },

    // ตัวเลขและหน่วย (Numbers & Units) (5 items)
    { id: "TH-NUM-01", category: "number", title: "ตัวเลขและหน่วย", text: "พยากรณ์อากาศวันนี้ อุณหภูมิสูงสุดอยู่ที่ 28.5 องศาเซลเซียส และต่ำสุดอยู่ที่ 19.2 องศาเซลเซียสครับ" },
    { id: "TH-NUM-02", category: "number", title: "ตัวเลขและหน่วย", text: "สินค้ารายการนี้ราคา 3,980 บาท เมื่อรวมภาษีมูลค่าเพิ่มแล้วจะเท่ากับ 4,378 บาทพอดีครับ" },
    { id: "TH-NUM-03", category: "number", title: "ตัวเลขและหน่วย", text: "ระยะทางจากสถานีรถไฟฟ้าถึงจุดหมายปลายทางประมาณ 12.7 กิโลเมตร ใช้เวลาเดินทางโดยรถยนต์ราว 35 นาที" },
    { id: "TH-NUM-04", category: "number", title: "ตัวเลขและหน่วย", text: "กำหนดการคือเริ่มออกเดินทางเวลา 9 นาฬิกา 45 นาที และคาดว่าจะไปถึงจุดหมายในเวลา 13 นาฬิกา 20 นาทีครับ" },
    { id: "TH-NUM-05", category: "number", title: "ตัวเลขและหน่วย", text: "พัสดุกล่องนี้มีน้ำหนัก 2.35 กิโลกรัม ขนาดความยาว 42 เซนติเมตร กว้าง 31 เซนติเมตร และสูง 18 เซนติเมตร" },

    // ประโยคยาว (Long Passage) (5 items)
    { id: "TH-LONG-01", category: "long", title: "ประโยคยาว", text: "เช้าวันนี้ผมออกจากบ้านเร็วกว่าปกติเล็กน้อย แต่เมื่อเดินทางมาถึงสถานีรถไฟฟ้าก็พบว่าขบวนรถเกิดความล่าช้า จึงทำให้เดินทางมาถึงที่หมายช้ากว่าเวลาที่นัดหมายไว้เล็กน้อยครับ" },
    { id: "TH-LONG-02", category: "long", title: "ประโยคยาว", text: "ถ้าวันพรุ่งนี้สภาพอากาศแจ่มใสและไม่มีฝนตก ช่วงเช้าผมตั้งใจจะออกไปซื้อของใช้เข้าบ้าน จากนั้นจะแวะไปทานอาหารกลางวันกับเพื่อนสนิท แล้วจึงเดินทางกลับถึงบ้านก่อนช่วงเย็นครับ" },
    { id: "TH-LONG-03", category: "long", title: "ประโยคยาว", text: "หลังจากเปลี่ยนมาใช้สมาร์ทโฟนเครื่องใหม่ ผมก็ได้ทำการโอนย้ายรูปภาพและข้อมูลผู้ติดต่อจากเครื่องเดิมมาเรียบร้อยแล้ว แต่ปรากฏว่ามีการตั้งค่าของบางแอปพลิเคชันที่ยังไม่ได้รับการซิงค์ข้อมูลตามมาครับ" },
    { id: "TH-LONG-04", category: "long", title: "ประโยคยาว", text: "ในการประชุมเมื่อวานนี้ มีผู้เสนอข้อคิดเห็นที่น่าสนใจหลายประการเกี่ยวกับแผนงานในอนาคต แต่เนื่องจากยังต้องรอประสานงานเพื่อตรวจสอบตารางเวลาของทุกคนอีกครั้ง จึงยังไม่มีการสรุปกำหนดการขั้นสุดท้ายครับ" },
    { id: "TH-LONG-05", category: "long", title: "ประโยคยาว", text: "เมื่อเดินออกจากประตูสถานี ให้เลี้ยวขวาที่สี่แยกแรกแล้วเดินตรงไปตามทางอีกสักพัก จะมองเห็นร้านสะดวกซื้อตั้งอยู่ทางด้านซ้ายมือ จากนั้นให้เลี้ยวซ้ายเข้าซอยเล็กๆ ที่อยู่ตรงหน้าอาคารนั้นได้เลยครับ" }
  ]
};

const CUSTOM_STORAGE_KEY = 'voice_collector_custom_scripts';

export function getScriptsForLang(lang, category = 'all') {
  const base = defaultScripts[lang] || defaultScripts['ja'];
  const custom = getCustomScripts(lang);
  const combined = [...base, ...custom];
  
  if (!category || category === 'all') {
    return combined;
  }
  return combined.filter(s => s.category === category);
}

export function getCustomScripts(lang) {
  try {
    const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return list.filter(item => item.lang === lang);
  } catch (e) {
    console.error("Failed to load custom scripts", e);
    return [];
  }
}

export function addCustomScript(lang, text) {
  if (!text || !text.trim()) return null;
  const list = getAllCustomScripts();
  const id = `CUSTOM-${Date.now()}`;
  const newScript = {
    id,
    lang,
    category: "custom",
    title: "カスタム入力",
    text: text.trim(),
    createdAt: new Date().toISOString()
  };
  list.push(newScript);
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(list));
  return newScript;
}

export function deleteCustomScript(id) {
  let list = getAllCustomScripts();
  list = list.filter(s => s.id !== id);
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(list));
}

function getAllCustomScripts() {
  try {
    const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
