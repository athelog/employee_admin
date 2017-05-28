/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    $(function(){
	var tpl = $.pivotUtilities.aggregatorTemplates;
        var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);

        $.getJSON("mps.json", function(mps) {
            $("#output").pivotUI(mps, {
                renderers: renderers,
                cols: ["ModDate"], rows: ["Test"],
                rendererName: "Line Chart",
			aggregators: {
                            "Valor de prueba": function() { return tpl.average()(["Value"])}
                }
            });
        });
     });