(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials['mg-body'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["mg-item"],depth0,{"name":"mg-item","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mg-body\">\n"
    + ((stack1 = container.invokePartial(partials["mg-navigation"],depth0,{"name":"mg-navigation","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<ul class=\"mg-inner\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>\n";
},"usePartial":true,"useData":true});
Handlebars.partials['mg-item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<li class=\"mg-item\">\n    <div class=\"mg-item-teaser\">\n        <h3 class=\"mg-item-header\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.teaser : depth0)) != null ? stack1.header : stack1), depth0))
    + "</h3>\n        <div class=\"mg-item-text\">\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.teaser : depth0)) != null ? stack1.text : stack1), depth0))
    + "\n        </div>\n    </div>\n    <div class=\"mg-item-image\">\n        <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.image : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.image : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\" />\n    </div>\n</li>\n";
},"useData":true});
Handlebars.partials['mg-navigation'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span data-navigation=\"right\" class=\"mg-navigate-right\"></span>\n<span data-navigation=\"left\" class=\"mg-navigate-left\"></span>\n";
},"useData":true});
})();