var data = [];

$.getJSON("./familyTree.json", function(json) {
  // var doc = jsyaml.load(json);
  // alert(doc);
  data = [json];
  //console.log(json);
  buildTree();
});

function buildTree(){
  tree = dTree.init(data, {
  callbacks:{
    textRenderer: function(name, extra, textClass) {
    	// THis callback is optinal but can be used to customize
      // how the text is rendered without having to rewrite the entire node
      // from screatch.
    	if (extra && extra.nickname){
        name = name + "<small class='subtitle'> (" + extra.nickname + ")</small>";
      };
      if (extra && extra.years){
        name = name + "<small class='subtitle'> (" + extra.years + ")</small>";
      };
    	return "<p align='center' class='" + textClass + "'>" + name + "</p>";
    },
  }
});
}

